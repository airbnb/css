
import fs from 'fs';
import stylelint from 'stylelint';
import test from 'ava';
import config from '../';

const validCss = fs.readFileSync('./test/test-base-valid.scss', 'utf-8');
const invalidCss = fs.readFileSync('./test/test-base-invalid.scss', 'utf-8');

test('no warnings with valid css', t => {
  const isValid = stylelint.lint({
    code: validCss,
    config,
  })
  .then(data => {
    const { errored, results } = data;
    const { warnings } = results[0];
    t.falsy(errored, 'no errored');
    t.is(warnings.length, 0, 'flags no warnings');
  });

  return isValid;
});

test('warnings with invalid css', t => {
  const isValid = stylelint.lint({
    code: invalidCss,
    config,
  })
  .then(data => {
    const { errored, results } = data;
    const { warnings } = results[0];
    t.truthy(errored, 'errored');
    t.is(warnings.length, 21, 'flags 21 warnings');

    t.is(warnings[0].text,
      'Expected indentation of 2 spaces (indentation)',
      'flags wrong indentation'
    );

    t.is(warnings[1].text,
      'Expected indentation of 2 spaces (indentation)',
      'flags wrong indentation'
    );

    t.is(warnings[2].text,
      'Expected nesting depth to be no more than 2 (max-nesting-depth)',
      'flags nesting depth when more than 2'
    );

    t.is(warnings[3].text,
      'Unexpected id selector (selector-no-id)',
      'flags id selector'
    );

    t.is(warnings[4].text,
      'Expected newline after "," (selector-list-comma-newline-after)',
      'flags missing newline after ","'
    );

    t.is(warnings[5].text,
      'Expected newline after "," (selector-list-comma-newline-after)',
      'flags missing newline after ","'
    );

    t.is(warnings[6].text,
      'Expected empty line before non-nested rule (rule-non-nested-empty-line-before)',
      'flags missing empty line before non-nested rule'
    );

    t.is(warnings[7].text,
      'Expected empty line before non-nested rule (rule-non-nested-empty-line-before)',
      'flags missing empty line before non-nested rule'
    );

    t.is(warnings[8].text,
      'Expected empty line before non-nested rule (rule-non-nested-empty-line-before)',
      'flags missing empty line before non-nested rule'
    );

    t.is(warnings[9].text,
      'Unexpected double-slash CSS comment (no-invalid-double-slash-comments)',
      'flags double-slash comments'
    );

    t.is(warnings[10].text,
      'Expected empty line before comment (comment-empty-line-before)',
      'flags missing empty line before comment'
    );

    t.is(warnings[11].text,
      'Unexpected empty line before at-rule (at-rule-empty-line-before)',
      'flags missing empty line before non-nested rule'
    );

    t.is(warnings[12].text,
      'Expected single space before "{" (block-opening-brace-space-before)',
      'flags missing single space before "{"'
    );

    t.is(warnings[13].text,
      'Expected single space after ":" (declaration-colon-space-after)',
      'flags missing single space after ":"'
    );

    t.is(warnings[14].text,
      'Expected single space after ":" (declaration-colon-space-after)',
      'flags missing single space after ":"'
    );

    t.is(warnings[15].text,
      'Unexpected whitespace before ":" (declaration-colon-space-before)',
      'flags whitepace before ":"'
    );

    t.is(warnings[16].text,
      'Expected $ variable name to match specified pattern (scss/dollar-variable-pattern)',
      'flags variables of wrong convention'
    );

    t.is(warnings[17].text,
      'Expected a placeholder selector (e.g. %placeholder) to be used in ' +
      '@extend (scss/at-extend-no-missing-placeholder)',
      'flags wrong @extend statements'
    );

    t.is(warnings[18].text,
      'Unexpected value "none" for property "border" (declaration-property-value-blacklist)',
      'flags "border: none" statements'
    );

    t.is(warnings[19].text,
      'Unexpected value "none" for property "border" (declaration-property-value-blacklist)',
      'flags "border: none" statements'
    );

    t.is(warnings[20].text,
      'Unexpected value "none" for property "border" (declaration-property-value-blacklist)',
      'flags "border: none" statements'
    );
  });

  return isValid;
});
