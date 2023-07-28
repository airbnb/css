# Mate API Style Guide <!-- omit in toc -->

[go/mate-api-style-guide](http://go/mate-api-style-guide)

- [1\. Data fetching](#1-data-fetching)
    - [1.1. Use repository instead of explicit ORM methods to fetch data from DB](#11-use-repository-instead-of-explicit-orm-methods-to-fetch-data-from-db)
    - [1.2. Always use plain objects instead of ORM instances. Avoid using ORM specific methods outside of the repository](#12-always-use-plain-objects-instead-of-orm-instances-avoid-using-orm-specific-methods-outside-of-the-repository)
    - [1.3. Use `find` and `get` prefixes to specify whether method returns `null` or throws an Error](#13-use-find-and-get-prefixes-to-specify-whether-method-returns-null-or-throws-an-error)
    - [1.4. Use data-loaders instead of ORM methods in `find` and `get` methods](#14-use-data-loaders-instead-of-orm-methods-in-find-and-get-methods)
    - [1.5. Store common entity related errors in constants](#15-store-common-entity-related-errors-in-constants)
- [2\. GraphQL](#2-graphql)
    - [2.1. Always include modified objects in mutation responses](#21-always-include-modified-objects-in-mutation-responses)
    - [2.2. Do not add foreign keys to the GraphQL schema until it's really needed](#22-do-not-add-foreign-keys-to-the-graphql-schema-until-its-really-needed)
    - [2.3. Use @Query, @Mutation, @Child decorators while creating resolvers](#23-use-query-mutation-child-decorators-while-creating-resolvers)
    - [2.4. Write resolver class name in Uppercase](#24-write-resolver-class-name-in-uppercase)
    - [2.5. Resolver name should end with Resolver, not Query/Mutation/Child](#25-resolver-name-should-end-with-resolver-not-querymutationchild)
- [3\. Models](#3-models)
    - [3.1. Extend `ModelBase` while writing new Model](#31-extend-modelbase-while-writing-new-model)
    - [3.2. Nullable fields should be marked explicitly](#32-nullable-fields-should-be-marked-explicitly)
    - [3.3. Related model should **always** be marked as nullable even if foreign key has `not_null` constraint](#33-related-model-should-always-be-marked-as-nullable-even-if-foreign-key-has-not_null-constraint)
    - [4.1. Use seeders for modifying data and migrations for modifying DB structure](#41-use-seeders-for-modifying-data-and-migrations-for-modifying-db-structure)
    - [4.2. Follow naming template for seeders and migrations](#42-follow-naming-template-for-seeders-and-migrations)
    - [4.3. Use Enum data type for enumerable values instead of String + Check Constraint](#43-use-enum-data-type-for-enumerable-values-instead-of-string--check-constraint)
1\. Data fetching
-----------------

#### 1.1. Use repository instead of explicit ORM methods to fetch data from DB



>❓Why? To be ORM agnostic and have control over the data flow. E.g. if one day we decide to change the fetching method for the user, we can do it in one place - UserRepository.



```javascript
// ❌ bad
class FindUserUseCase {
  run(options) {
    return UserModel.findOne({ where: options });
  }
}

// ✅ good
class FindUserUseCase {
  run(options) {
    return this.userRepository.find({ where: options });
  }
}
```



#### 1.2. Always use plain objects instead of ORM instances. Avoid using ORM specific methods outside of the repository



>❓Why? To be ORM agnostic, again. We shouldn't rely on specific ORM methods where they are not needed



```javascript
// ❌ bad
class UserRepository() {
  async find(options) {
    return this.models.User.find({
      where: options,
    });
  }
}

class UpdateUser {
  async run(options) {
    const user = await this.userRepository.find({
      id: options.id
    });

    await user.update(options.values); // .update is an ORM method
  }
}


// ✅ good
class UserRepository() {
  async find(options) {
    return this.models.User.find({
      where: options,
      raw: true // or whatever the ORM uses to return the 'raw' value
    });
  }

  async update(id, values) {
    const [count, updatedValues] = await this.models.User.update(
      values,
      {
        where: { id },
        returning: true,
      },
    );

    if (count === 0) {
      this.throwNotFoundError(UserErrors.UserNotFound, {
        id,
        values,
      });
    }

    return updatedValues[0].get(); // or whatever the ORM uses to return the 'raw' value
  }
}

class UpdateUser {
  async run(options) {
    const user = await this.userRepository.update({
      id: options.id,
      values: options.values
    });
  }
}
```



#### 1.3. Use `find` and `get` prefixes to specify whether method returns `null` or throws an Error



\- **get** \- throws an error
\- **find** \- returns null or empty array



>❓Why? For better consistency. If you write \`get\` you guarantee that value is returned and extra \`null\` checks are redundant



```javascript
// ❌ bad
class UserRepository {
  async findOne(options) {
    const result = await this.models.User.findOne({ where: options});

    if (!result) {
      throw new Error(UserErrors.NotFound);
    }

    return result;
  }

  async findAll(options) {
    const result = await this.models.User.findAll({ where: options});

    if (result.length === 0) {
      throw new Error(UserErrors.NotFound);
    }

    return result;
  }
}

// ❌ bad
class UserRepository {
  async getOne(options) {
    const result = await this.models.User.findOne({ where: options});

    return result; // 'result' may be null
  }
}

// ✅ good
class UserRepository {
  async getOne(options) {
    const result = await this.models.User.findOne({ where: options});

    if (!result) {
      throw new Error(UserErrors.NotFound);
    }

    return result;
  }
}

// best
class UserRepository {
  async findAll(options) {
    const result = await this.models.User.findAll({ where: options});

    return result;
  }

  async getAll(options) {
    const result = await this.findAll(options);

    if (result.length === 0) {
      throw new Error(UserErrors.NotFound);
    }

    return result;
  }

  async findOne(options) {
    const result = await this.models.User.findOne({ where: options });

    return result;
  }

  async getOne(options) {
    const result = await this.findOne(options);

    if (!result) {
      throw new Error(UserErrors.NotFound);
    }

    return result;
  }
}
```



#### 1.4. Use data-loaders instead of ORM methods in `find` and `get` methods



>❓Why? If the record is already fetched, it's better to use it instead of fetching it again. [data-loaders](https://www.npmjs.com/package/dataloader) are used to cache the fetched data and return it if it's already fetched. Also, lots of separate DB calls are merged into one batch call in data-loader case. See examples of data-loaders in *.loaders folders in api modules.



```javascript
// ❌ bad
// Several SQL queries may be executed during one API call
class UserRepository {
  async findOne(options) {
    return this.models.User.findOne({ where: options});
  }

  async findAll(options) {
    return this.models.User.findAll({ where: options});
  }
}

// ✅ good
// All related SQL queries are merged into one batch DB call
class UserRepository {
  async findOne(options) {
    return this.loaders.userByOptions.load(options);
  }

  async findAll(options) {
    return this.loaders.userByOptions.loadMany(options);
  }
}
```



#### 1.5. Store common entity related errors in constants



>❓Why? Easier to re-use and test the behavior



```javascript
// ❌ bad
class UserRepository {
  async getOne(options) {
    const result = await this.models.User.findOne({ where: options});

    if (!result) {
      throw new Error('User not found');
    }

    return result;
  }
}

// ....test.js
await expect(UserRepository.getOne())
  .rejects.toEqual(
    expect.objectContaining({
      message: expect.stringContaining(
        'User not found',
      ),
    })
  );

// ✅ good
class UserRepository {
  async getOne(options) {
    const result = await this.models.User.findOne({ where: options});

    if (!result) {
      throw new Error(UserErrors.NotFound);
    }

    return result;
  }
}

// ....test.js
await expect(UserRepository.getOne())
  .rejects.toEqual(
    expect.objectContaining({
      message: expect.stringContaining(
        UserErrors.NotFound,
      ),
    })
  );
```



2\. GraphQL
-----------

#### 2.1. Always include modified objects in mutation responses



>❓Why? GraphQL clients like [Apollo](https://www.apollographql.com/docs/react/) support auto update cache. If a cached object _already_ exists with this key, Apollo Client overwrites any existing fields that are also included in the mutation response (other existing fields are preserved).
[Read more here](https://www.apollographql.com/docs/react/data/mutations/#include-modified-objects-in-mutation-responses)



```bash
// ❌ bad
extend type Mutation {
  updateProfile(values: UpdateProfileValues): Boolean!
}

// ✅ good
extend type Mutation {
  updateProfile(values: UpdateProfileValues): User!
}
```

#### 2.2. Do not add foreign keys to the GraphQL schema until it's really needed

>❓Why? GraphQL schema supposes fetching nested resources using child resolvers instead of subsequent queries

Add comment if the field is definitely needed in graphql schema

```bash
// ❌ bad
type CourseUser {
  id: Int!
  courseId: Int!
  userId: Int!
}

// ✅ good
type CourseUser {
  id: Int!
  course: Course # child resolver is needed
  user: User # child resolver is needed
}

// ✅ good
type CourseUser {
  id: Int!
  course: Course
  user: User
  courseId: Int! # needed for API tests
}
```

#### 2.3. Use @Query, @Mutation, @Child decorators while creating resolvers
>❓ It's a part of moving to Dependency Injection pattern in API, and decorators are more self explainable. Now `makeResolver` and `makeAuthResolver` functions are deprecated

```typescript
// ❌ bad
export const chatLessonResolver = makeAuthResolver<
  // ... types go here
>(
  GetChatLessonUseCase,
  (_, chat) => ({ chatId: chat.id }),
);


// ✅ good
@Child<
  // ... types go here
  >({
    Handler: GetChatLessonUseCase,
    auth: true,
    mapOptions: (args, parent) => ({
      chatId: chat.id,
    }),
  })

export class GetCareerTestQuestionsResolver {}
```

#### 2.4. Write resolver class name in Uppercase
```typescript
// ❌ bad
// ... resolver definition

export class careerTestQuestionTitleResolver {}

// ✅ good
// ... resolver definition

export class CareerTestQuestionTitleResolver {}
```

#### 2.5. Resolver name should end with Resolver, not Query/Mutation/Child
>❓Why? Every communication to API happens via resolvers. To keep the consistency it's obligatory to use the same name pattern

```typescript
// ❌ bad
// ... resolver definition

export class CareerTestQuestionTitleChild {}

// ✅ good
// ... resolver definition

export class CareerTestQuestionTitleResolver {}

// ❌ bad
// ... resolver definition

export class getCareerTestQuestionsQuery {}

// ✅ good
// ... resolver definition

export class GetCareerTestQuestionsResolver {}

// ❌ bad
// ... resolver definition

export class createCareerTestMutation {}

// ✅ good
// ... resolver definition

export class CreateCareerTestResolver {}
```
3\. Models
----------

#### 3.1. Extend `ModelBase` while writing new Model
>❓Why? `ModelBase` provides type definition for meta fields as `id`, `createdAt`, `updatedAt`. Less templated code

**models/User.ts**
```typescript
// ❌ bad
export class User extends Model<User> {
  @AllowNull(true)
  @Column({
    field: 'first_name',
    type: DataType.STRING,
  })
  firstName: string | null;

  @AllowNull(false)
  @CreatedAt
  @Default(DataType.NOW)
  @Column({
    field: 'created_at',
  })
  createdAt: Date;

  @AllowNull(false)
  @UpdatedAt
  @Default(DataType.NOW)
  @Column({
    field: 'updated_at',
  })
  updatedAt: Date;
}

// ✅ good
export class User extends ModelBase<User> {
  @AllowNull(true)
  @Column({
    field: 'first_name',
    type: DataType.STRING,
  })
  firstName: string | null;
}
```
#### 3.2. Nullable fields should be marked explicitly
>❓Why? When field is nullable in database, it should be marked as `| null` in the model definition to enforce `null-check` when it's used further.

**migrations/add-first-name-to-users.js**
```javascript
queryInterface.addColumn(
  'users',
  `first_name`,
  {
    type: Sequelize.STRING,
    allowNull: true,
  },
)
```

**models/User.ts**
```typescript
// ❌ bad
export class User extends ModelBase<User> {
  @Column({
    field: 'first_name',
  })
  firstName: string;
}

// ❌ bad
export class User extends ModelBase<User> {
  @AllowNull(true)
  @Column({
    field: 'first_name',
  })
  firstName: string;
}

// ✅ good
export class User extends ModelBase<User> {
  @AllowNull(true)
  @Column({
    field: 'first_name',
    type: DataType.STRING,
  })
  firstName: string | null;
}
```

#### 3.3. Related model should **always** be marked as nullable even if foreign key has `not_null` constraint

>❓Why? Related model is a virtual field and has value `undefined` until the related model is explicitly included while fetching data from DB. Moreover, it's `null` if related value is not found

**models/User.ts**
```typescript
// ❌ bad
export class User extends ModelBase<User> {
  @BelongsTo(() => Domain)
  domain: Domain;

  @HasMany(() => TypingSpeedTest)
  typingSpeedTests: TypingSpeedTest[];
}

// ----

console.log(User.domain) // 'undefined' or 'null'
if (User.typingSpeedTests.length > 0) {
  // Error, typingSpeedTests is 'undefined' or 'null'
}

// ✅ good
export class User extends ModelBase<User> {
  @BelongsTo(() => Domain)
  domain: Domain | null;

  @HasMany(() => TypingSpeedTest)
  typingSpeedTests: TypingSpeedTest[] | null;
}

// ----

if (User.typingSpeedTests?.length > 0) {
  // ...
}

```

4\. Database

#### 4.1. Use seeders for modifying data and migrations for modifying DB structure

It is mandatory to understand the major difference between seeders and migrations:
- **seeders** are used to modify the database content (adding or removing entries)
- **migrations** are used to modify the database structure (adding new table/column, managing constraints, etc)

Besides seeders are not executed in CI/Tests while migrations are

#### 4.2. Follow naming template for seeders and migrations

The template is: `{action}-{object}-{subject}` in an imperative form

- **action** explains what should migration/seeder do
- **object** means primary action target
- **(optional) subject** gives context about the place where the action happens


```
// ❌ bad
seeders/adding-translates.js

// ✅ good
seeders/add-translates-for-chat-page.js

// ❌ bad
migration/add-first-name.js

// ✅ good
migration/add-first-name-column-to-users.js

// ❌ bad
migration/rename-table.js

// ✅ good
migration/rename-users-table.js

// ❌ bad
migration/add-columns-to-users.js

// ✅ good
migration/add-chat-related-columns-to-users-table.js

// ❌ bad
migration/update-courses-slug-unique-constraint.js

// ✅ good
migration/update-slug-constraint-in-courses-table
```

#### 4.3. Use Enum data type for enumerable values instead of String + Check Constraint

>❓Why? It's more clear and obvious. There are a lot of examples with check constraint in the existing codebase but we're moving out of them.

```javascript
// ❌ bad
await queryInterface
  .addColumn('users', 'student_status', {
    type: Sequelize.STRING,
    defaultValue: 'PRE_COURSE',
  })
  .then(() => (
    queryInterface.addConstraint('users', ['student_status'], {
      type: 'check',
      name: 'student_statuses',
      where: {
        student_status: [
          'PRE_COURSE',
          'STUDYING',
          'EMPLOYMENT',
          ]
      }
    })))

// ✅ good
await queryInterface.addColumn(
  'users',
  'student_status',
  {
    type: Sequelize.ENUM(
      'PRE_COURSE',
      'STUDYING',
      'EMPLOYMENT'
    ),
    defaultValue: 'PRE_COURSE',
  },
);
```
