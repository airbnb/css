
import fs from 'fs';
import stylelint from 'stylelint';
import test from 'ava';
import config from '../';

const good = fs.readFileSync('./test/good-formatting.css', 'utf-8');
const bad = fs.readFileSync('./test/bad-formatting.css', 'utf-8');

test('Nothing wrong with good-formatting.css', t => {
  const isValid = stylelint.lint({
    code: good,
    config,
  })
  .then(data => {
    const { errored, results } = data;
    const { warnings } = results[0];

    t.falsy(errored, 'no errored');

    t.is(warnings.length, 0);
  });

  return isValid;
});

test('Warnings in bad-formatting.css', t => {
  const isValid = stylelint.lint({
    code: bad,
    config,
  })
  .then(data => {
    const { errored, results } = data;
    const { warnings } = results[0];

    t.truthy(errored, 'errored');

    t.is(warnings.length, 11);

    t.is(warnings[0].text, 'Expected indentation of 2 spaces (indentation)');
    t.is(warnings[1].text, 'Expected indentation of 2 spaces (indentation)');
    t.is(warnings[2].text, 'Expected indentation of 2 spaces (indentation)');
    t.is(warnings[3].text, 'Unexpected leading zero (number-leading-zero)');
    t.is(warnings[4].text, 'Expected newline after "," (selector-list-comma-newline-after)');
    t.is(warnings[5].text, 'Expected newline after "," (selector-list-comma-newline-after)');
    t.is(
      warnings[6].text,
      'Expected empty line before non-nested rule (rule-non-nested-empty-line-before)'
    );
    t.is(warnings[7].text, 'Expected empty line before comment (comment-empty-line-before)');
    t.is(warnings[8].text, 'Expected single space before "{" (block-opening-brace-space-before)');
    t.is(warnings[9].text, 'Expected single space after ":" (declaration-colon-space-after)');
    t.is(
      warnings[10].text,
      'Unexpected value "none" for property "border" (declaration-property-value-blacklist)'
    );
  });

  return isValid;
});
