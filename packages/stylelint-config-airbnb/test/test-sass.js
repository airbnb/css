
import fs from 'fs';
import stylelint from 'stylelint';
import test from 'ava';
import config from '../';

const good = fs.readFileSync('./test/good-sass.scss', 'utf-8');
const bad = fs.readFileSync('./test/bad-sass.scss', 'utf-8');

test('Nothing wrong with good-sass.scss', t => {
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

test('Warnings in bad-sass.scss', t => {
  const isValid = stylelint.lint({
    code: bad,
    config,
  })
  .then(data => {
    const { errored, results } = data;
    const { warnings } = results[0];

    t.truthy(errored, 'errored');

    t.is(warnings.length, 10);

    t.is(warnings[0].rule, 'max-nesting-depth');
    t.is(warnings[1].rule, 'scss/dollar-variable-pattern');
    t.is(warnings[2].rule, 'scss/dollar-variable-pattern');
    t.is(warnings[3].rule, 'scss/dollar-variable-pattern');
    t.is(warnings[4].rule, 'scss/dollar-variable-pattern');
    t.is(warnings[5].rule, 'scss/at-extend-no-missing-placeholder');

    t.is(warnings[6].text, 'Expected declaration to come before at-rule (order/order)');
    t.is(warnings[7].text, 'Expected declaration to come before rule (order/order)');
    t.is(warnings[8].text, 'Expected at-rule to come before at-rule with a block (order/order)');
    t.is(warnings[9].text, 'Expected at-rule with a block to come before rule (order/order)');
  });

  return isValid;
});
