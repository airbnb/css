## SQL Style Guide

### Field Naming and Reference Conventions

- Field names should all be lowercased.

- An `id`, `name`, or generally ambiguous value such as `type` should always be prefixed by what it is identifying or naming

    ```sql
    -- Good
    SELECT
      id    AS account_id,
      name  AS account_name,
      type  AS account_type,
      ...

    -- Bad
    SELECT
      id,
      name,
      type,
      ...

    ```

- When joining to any data from a different source, a field should be prefixed with the data source, e.g. `sfdc_account_id`, to avoid ambiguity

    ```sql
    -- Good
    SELECT
      sfdc_account.account_id   AS sfdc_account_id,
      zuora_account.account_id  AS zuora_account_id
    FROM sfdc_account
    LEFT JOIN zuora_account ON ...

    -- Bad
    SELECT
      sfdc_account.account_id,
      zuora_account.account_id  AS zuora_id
    FROM sfdc_account
    LEFT JOIN zuora_account ON ...
    ```

- When joining tables and referencing columns from both, strongly prefer to reference the full table name instead of an alias. When the table name is long (~20), try to rename the CTE if possible, and lastly consider aliasing to something descriptive.

    ```sql
    -- Good
    SELECT
      budget_forecast_cogs_opex.account_id,
      -- 15 more columns
      date_details.fiscal_year,
      date_details.fiscal_quarter,
      date_details.fiscal_quarter_name,
      cost_category.cost_category_level_1,
      cost_category.cost_category_level_2
    FROM budget_forecast_cogs_opex
    LEFT JOIN date_details
     ON date_details.first_day_of_month = budget_forecast_cogs_opex.accounting_period
    LEFT JOIN cost_category
     ON budget_forecast_cogs_opex.unique_account_name = cost_category.unique_account_name

    -- Ok, but not preferred. Consider renaming the CTE in lieu of aliasing
    SELECT
      bfcopex.account_id,
      -- 15 more columns
      date_details.fiscal_year,
      date_details.fiscal_quarter,
      date_details.fiscal_quarter_name,
      cost_category.cost_category_level_1,
      cost_category.cost_category_level_2
    FROM budget_forecast_cogs_opex bfcopex
    LEFT JOIN date_details
     ON date_details.first_day_of_month = bfcopex.accounting_period
    LEFT JOIN cost_category
     ON bfcopex.unique_account_name = cost_category.unique_account_name

    -- Bad
    SELECT
      a.*,
      -- 15 more columns
      b.fiscal_year,
      b.fiscal_quarter,
      b.fiscal_quarter_name,
      c.cost_category_level_1,
      c.cost_category_level_2
    FROM budget_forecast_cogs_opex a
    LEFT JOIN date_details b
     ON b.first_day_of_month = a.accounting_period
    LEFT JOIN cost_category c
     ON b.unique_account_name = c.unique_account_name
    ```

- All field names should be [snake-cased](https://en.wikipedia.org/wiki/Snake_case)

    ```sql
    -- Good
    SELECT
      dvcecreatedtstamp AS device_created_timestamp
    FROM table

    -- Bad
    SELECT
      dvcecreatedtstamp AS DeviceCreatedTimestamp
    FROM table
    ```

- Boolean field names should start with `has_`, `is_`, or `does_`

    ```sql
    -- Good
    SELECT
      deleted AS is_deleted,
      sla     AS has_sla
    FROM table

    -- Bad
    SELECT
      deleted,
      sla
    FROM table
    ```

- When transforming source data, use double quotes to identify case sensitive columns or columns that contain special characters different than "$" or "_". Double quotes aren't needed for capitalized field names, as this is how [Snowflake identifiers](https://docs.snowflake.com/en/sql-reference/identifiers-syntax.html) are handled internally.

    ```sql
         -- Good
         SELECT "First_Name_&_" AS first_name,

         -- Bad
         SELECT "FIRST_NAME" AS first_name,

    ```

**Dates**

- Timestamps should end with `_at`, e.g. `deal_closed_at`, and should always be in UTC
- Dates should end with `_date`, e.g. `deal_closed_date`
- Months should be indicated as such and should always be truncated to a date format, e.g. `deal_closed_month`
- Always avoid key words like `date` or `month` as a column name
- Prefer the explicit date function over `date_part`, but prefer `date_part` over `extract`, e.g. `DAYOFWEEK(created_at)` > `DATE_PART(dayofweek, 'created_at')` > `EXTRACT(dow FROM created_at)`
    - Note that selecting a date's part is different from truncating the date. `date_trunc('month', created_at)` will produce the calendar month ('2019-01-01' for '2019-01-25') while `SELECT date_part('month', '2019-01-25'::date)` will produce the number 1
- Be careful using [DATEDIFF](https://docs.snowflake.net/manuals/sql-reference/functions/datediff.html), as the results are often non-intuitive.
    - For example, `SELECT DATEDIFF('days', '2001-12-01 23:59:59.999', '2001-12-02 00:00:00.000')` returns `1` even though the timestamps are different by one millisecond.
    - Similarly, `SELECT DATEDIFF('days', '2001-12-01 00:00:00.001', '2001-12-01 23:59:59.999')` return `0` even though the timestamps are nearly an entire day apart.
    - Using the appropriate interval with the `DATEDIFF` function will ensure you are getting the right results. For example, `DATEDIFF('days', '2001-12-01 23:59:59.999', '2001-12-02 00:00:00.000')` will provide a `1 day interval` and `DATEDIFF('ms', '2001-12-01 23:59:59.999', '2001-12-02 00:00:00.000')` will provide a `1 millisecond interval`.

### Use CTEs (Common Table Expressions), not subqueries

- [CTEs make SQL more readable and are more performant](https://www.alisa-in.tech/post/2019-10-02-ctes/)
- Use CTEs to reference other tables. Think of these as import statements
- CTEs should be placed at the top of the query
- Where performance permits, CTEs should perform a single, logical unit of work
- CTE names should be as concise as possible while still being clear
    - Avoid long names like `replace_sfdc_account_id_with_master_record_id` and prefer a shorter name with a comment in the CTE. This will help avoid table aliasing in joins
- CTEs with confusing or noteable logic should be commented in file and documented in dbt docs
- CTEs that are duplicated across models should be pulled out into their own models
- Leave an empty row above and below the query statement
- CTEs should be formatted as follows:

    ```sql
    WITH events AS ( -- think of these select statements as your import statements.

      ...

    ), filtered_events AS ( -- CTE comments go here

      ...

    )

    SELECT * -- you should always aim to "select * from final" for your last model
    FROM filtered_events
    ```

### General

- Within a CTE, the entire SQL statement should be indented 4 spaces

    ```sql
    -- Good
    WITH my_data AS (

        SELECT *
        FROM prod.my_data
        WHERE filter = 'my_filter'

    )

    -- Bad
    WITH my_data AS (

      SELECT *
      FROM prod.my_data
      WHERE filter = 'my_filter'

    )
    ```

- Indentation within a query (e.g. columns, `JOIN` clauses, multi-line `GROUP BY`, etc.) should be indented 2 spaces

    ```
    -- Good
    SELECT
      column_name1,
      column_name2,
      column_name3
    FROM table_1
    JOIN table_2
      ON table_1.id = table_2.id
    WHERE clouds = true
      AND gem = true
    GROUP BY 1,2,3
    HAVING column_name1 > 0
      AND column_name2 > 0

    -- Bad
    SELECT
        column_name1,
        column_name2,
        column_name3
    FROM table_1
    JOIN table_2
        ON table_1.id = table_2.id
    WHERE clouds = true
        AND gem = true
    GROUP BY 1,2,3
    HAVING column_name1 > 0
        AND column_name2 > 0
    ```

- No tabs should be used - only spaces. Your editor should be setup to convert tabs to spaces - see our [onboarding template](https://gitlab.com/gitlab-data/analytics/-/blob/master/.gitlab/issue_templates/Data%20Onboarding.md#data-grip-configuration) for more details

- Lines of SQL should be no longer than 80 characters

- Commas should be at the end-of-line (EOL) as a right comma, with the exception of temporary filters in the `WHERE` clause for specific values.

    ```sql
    -- Good
    SELECT
      deleted       AS is_deleted, -- EOL right comma
      accountId     AS account_id
    FROM table
    WHERE is_deleted = false
      AND account_id NOT IN (
                             '232'
                             , '234' -- left comma
                             , '425'
                            )

    -- Bad
    SELECT
      deleted       AS is_deleted, -- EOL right comma
      accountId     AS account_id
    FROM table
    WHERE is_deleted = false
      AND account_id NOT IN ('232', '234', '425')

    ```

- When `SELECT`ing, always give each column its own row, with the exception of `SELECT *` which can be on a single row

- `DISTINCT` should be included on the same row as `SELECT`

- The `AS` keyword should be used when projecting a field or table name

- When aliasing use `AS`, strive to align the original column names on a single vertical line and the `AS` keyword on a separate vertical line

- Fields should be stated before aggregates / window functions

- Ordering and grouping by a number (eg. GROUP BY 1, 2) is preferred
    - When grouping by 3 or more columns in a dbt model, use the dbt-utils [`group_by` macro](/handbook/business-ops/data-team/platform/dbt-guide/#macros)

- Prefer `WHERE` to `HAVING` when either would suffice

- Prefer accessing JSON using the bracket syntax, e.g. `data_by_row['id']::bigint as id_value`

- **Never** use `USING` in joins because it produces inaccurate results in Snowflake. Create an account to view the [forum discussion on this topic.](https://community.snowflake.com/s/question/0D50Z00008WRZBBSA5/bug-with-join-using-)

- Prefer `UNION ALL` to `UNION`. This is because a `UNION` could indicate upstream data integrity issue that are better solved elsewhere.

- Prefer `!=` to `<>`. This is because `!=` is more common in other programming languages and reads like "not equal" which is how we're more likely to speak

- Consider performance. Understand the difference between `LIKE` vs `ILIKE`, `IS` vs `=`, and `NOT` vs `!` vs `<>`. Use appropriately

- Prefer `LOWER(column) LIKE '%match%'` to `column ILIKE '%Match%'`. This lowers the chance of stray capital letters leading to an unexpected result

- Familiarize yourself with [the DRY Principal](https://docs.getdbt.com/docs/design-patterns). Leverage CTEs, jinja and macros in dbt, and snippets in Sisense. If you type the same line twice, it needs to be maintained in two places

- **DO NOT OPTIMIZE FOR A SMALLER NUMBER OF LINES OF CODE. NEWLINES ARE CHEAP. [BRAIN TIME IS EXPENSIVE.](https://blog.getdbt.com/write-better-sql-a-defense-of-group-by-1/)**

### Data Types

- Use default data types and not aliases. Review the [Snowflake summary of data types](https://docs.snowflake.com/en/sql-reference/intro-summary-data-types.html) for more details. The defaults are:
    - `NUMBER` instead of `DECIMAL`, `NUMERIC`, `INTEGER`, `BIGINT`, etc.
    - `FLOAT` instead of `DOUBLE`, `REAL`, etc.
    - `VARCHAR` instead of `STRING`, `TEXT`, etc.
    - `TIMESTAMP` instead of `DATETIME`

The exception to this is for timestamps. Prefer `TIMESTAMP` to `TIME`. Note that the default for `TIMESTAMP` is `TIMESTAMP_NTZ` which does not include a time zone.

### Functions

- Function names and keywords should all be capitalized
- Prefer `IFNULL` TO `NVL`
- Prefer `IFF` to a single line `CASE` statement
- Prefer `IFF` to selecting a boolean statement `(amount < 10) AS is_less_than_ten`
- Consider simplifying a repetitive `CASE` statement where possible:

    ```sql
    -- OK
    CASE
      WHEN field_id = 1 THEN 'date'
      WHEN field_id = 2 THEN 'integer'
      WHEN field_id = 3 THEN 'currency'
      WHEN field_id = 4 THEN 'boolean'
      WHEN field_id = 5 THEN 'variant'
      WHEN field_id = 6 THEN 'text'
    END AS field_type

    -- Better
    CASE field_id
      WHEN 1 THEN 'date'
      WHEN 2 THEN 'integer'
      WHEN 3 THEN 'currency'
      WHEN 4 THEN 'boolean'
      WHEN 5 THEN 'variant'
      WHEN 6 THEN 'text'
    END AS field_type
    ```

### JOINs

- Be explicit when joining, e.g. use `LEFT JOIN` instead of `JOIN`. (Default joins are `INNER`)
- Prefix the table name to a column when joining, otherwise omit
- Specify the order of a join with the FROM table first and JOIN table second:

    ```sql
    -- Good
    FROM source
    LEFT JOIN other_source
      ON source.id = other_source.id
    WHERE ...

    -- Bad
    FROM source
    LEFT JOIN other_source
      ON other_source.id = source.id
    WHERE ...
    ```

### Example Code

- Putting it all together:

    ```sql
    WITH my_data AS (

        SELECT *
        FROM prod.my_data
        WHERE filter = 'my_filter'

    ), some_cte AS (

        SELECT DISTINCT
          id,
          other_field_1,
          other_field_2
        FROM prod.my_other_data

    ), final AS (

        SELECT
          data_by_row['id']::NUMBER  AS id_field,
          field_1                    AS detailed_field_1,
          field_2                    AS detailed_field_2,
          detailed_field_3,
          CASE
            WHEN cancellation_date IS NULL AND expiration_date IS NOT NULL
              THEN expiration_date
            WHEN cancellation_date IS NULL
              THEN start_date + 7
            ELSE cancellation_date
          END                        AS cancellation_date,
          LAG(detailed_field_3) OVER (
            PARTITION BY
              id_field,
              detailed_field_1
            ORDER BY cancellation_date
          )                          AS previous_detailed_field_3,
          SUM(field_4)               AS field_4_sum,
          MAX(field_5)               AS field_5_max
        FROM my_data
        LEFT JOIN some_cte
          ON my_data.id = some_cte.id
        WHERE field_1 = 'abc'
          AND (field_2 = 'def' OR field_2 = 'ghi')
        GROUP BY 1, 2, 3, 4, 5
        HAVING COUNT(*) > 1
        ORDER BY 4 DESC
    )

    SELECT *
    FROM final
    ```

### Commenting

- When making single line comments in a model use the `--` syntax
- When making multi-line comments in a model use the `/*  */` syntax
- Respect the character line limit when making comments. Move to a new line or to the model documentation if the comment is too long
- dbt model comments should live in the model documentation
- Calculations made in SQL should have a brief description of what's going on and a link to the handbook defining the metric (and how it's calculated)
- Instead of leaving `TODO` comments, create new issues for improvement

### Other SQL Style Guides

- [Brooklyn Data Co](https://github.com/brooklyn-data/co/blob/master/sql_style_guide.md)
- [Fishtown Analytics](https://github.com/fishtown-analytics/corp/blob/master/dbt_coding_conventions.md#sql-style-guide)
- [Matt Mazur](https://github.com/mattm/sql-style-guide)
- [Kickstarter](https://gist.github.com/fredbenenson/7bb92718e19138c20591)
