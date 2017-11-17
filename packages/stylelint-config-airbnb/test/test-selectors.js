
import fs from 'fs';
import stylelint from 'stylelint';
import test from 'ava';
import config from '../';

const good = fs.readFileSync('./test/good-selectors.css', 'utf-8');
const bad = fs.readFileSync('./test/bad-selectors.css', 'utf-8');

test('Nothing wrong with good-selectors.css', t => {
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

test('Warnings in bad-selectors.css', t => {
  const isValid = stylelint.lint({
    code: bad,
    config,
  })
  .then(data => {
    const { errored, results } = data;
    const { warnings } = results[0];

    t.truthy(errored, 'errored');

    t.is(warnings.length, 1);

    t.is(warnings[0].text, 'Unexpected id selector (selector-no-id)');
  });

  return isValid;
});
