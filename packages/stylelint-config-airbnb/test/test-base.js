
import fs from 'fs';
import stylelint from 'stylelint';
import test from 'ava';
import config from '../';

const good = fs.readFileSync('./test/good-base.css', 'utf-8');
const bad = fs.readFileSync('./test/bad-base.css', 'utf-8');

test('Nothing wrong with good-base.css', t => {
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

test('Warnings in bad-base.css', t => {
  const isValid = stylelint.lint({
    code: bad,
    config,
  })
  .then(data => {
    const { errored, results } = data;
    const { warnings } = results[0];

    t.truthy(errored, 'errored');

    t.is(warnings.length, 14);

    t.is(warnings[0].rule, 'indentation');
    t.is(warnings[1].rule, 'number-leading-zero');
    t.is(warnings[2].rule, 'string-quotes');
    t.is(warnings[3].rule, 'selector-max-id');
    t.is(warnings[4].rule, 'selector-list-comma-newline-after');
    t.is(warnings[5].rule, 'selector-list-comma-newline-after');
    t.is(warnings[6].rule, 'rule-empty-line-before');
    t.is(warnings[7].rule, 'comment-empty-line-before');
    t.is(warnings[8].rule, 'block-opening-brace-space-before');
    t.is(warnings[9].rule, 'declaration-colon-space-after');
    t.is(warnings[10].rule, 'declaration-colon-space-before');
    t.is(warnings[11].rule, 'declaration-block-single-line-max-declarations');
    t.is(warnings[12].rule, 'declaration-property-value-blacklist');
    t.is(warnings[13].rule, 'at-rule-empty-line-before');
  });

  return isValid;
});
