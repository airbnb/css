
import fs from 'fs';
import stylelint from 'stylelint';
import test from 'ava';
import config from '../';

const validCss = fs.readFileSync('./test/test-base-valid.css', 'utf-8');
const invalidCss = fs.readFileSync('./test/test-base-invalid.css', 'utf-8');

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

test('a warning with invalid css', t => {
  const isValid = stylelint.lint({
    code: invalidCss,
    config,
  })
  .then(data => {
    const { errored, results } = data;
    const { warnings } = results[0];
    t.truthy(errored, 'errored');
    t.is(warnings.length, 13, 'flags one warning');

    t.is(warnings[0].text,
      'Expected single space before "{" (block-opening-brace-space-before)',
      'correct warning text'
    );

    t.is(warnings[1].text,
      'Expected single space after ":" (declaration-colon-space-after)',
      'correct warning text'
    );

    t.is(warnings[2].text,
      'Expected single space after ":" (declaration-colon-space-after)',
      'correct warning text'
    );

    t.is(warnings[3].text,
      'Expected indentation of 2 spaces (indentation)',
      'correct warning text'
    );

    t.is(warnings[4].text,
      'Expected indentation of 2 spaces (indentation)',
      'correct warning text'
    );

    t.is(warnings[5].text,
      'Expected empty line before non-nested rule (rule-non-nested-empty-line-before)',
      'correct warning text'
    );

    t.is(warnings[6].text,
      'Expected empty line before non-nested rule (rule-non-nested-empty-line-before)',
      'correct warning text'
    );

    t.is(warnings[7].text,
      'Expected newline after "," (selector-list-comma-newline-after)',
      'correct warning text'
    );

    t.is(warnings[8].text,
      'Expected newline after "," (selector-list-comma-newline-after)',
      'correct warning text'
    );

    t.is(warnings[9].text,
      'Unexpected id selector (selector-no-id)',
      'correct warning text'
    );

    t.is(warnings[10].text,
      'Unexpected value "none" for property "border" (declaration-property-value-blacklist)',
      'correct warning text'
    );

    t.is(warnings[11].text,
      'Unexpected value "none" for property "border" (declaration-property-value-blacklist)',
      'correct warning text'
    );

    t.is(warnings[12].text,
      'Unexpected value "none" for property "border" (declaration-property-value-blacklist)',
      'correct warning text'
    );
  });

  return isValid;
});
