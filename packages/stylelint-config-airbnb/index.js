module.exports = {
  plugins: [
    'stylelint-scss',
  ],
  rules: {
    indentation: 2,
    'max-nesting-depth': 2,
    'selector-no-id': true,
    'selector-list-comma-newline-after': 'always',
    'rule-non-nested-empty-line-before': ['always', { ignore: ['after-comment'] }],
    'no-invalid-double-slash-comments': true,
    'comment-empty-line-before': ['always', { ignore: ['stylelint-commands'] }],
    'at-rule-empty-line-before': 'never',
    'block-opening-brace-space-before': 'always',
    'declaration-colon-space-after': 'always',
    'declaration-colon-space-before': 'never',
    'scss/dollar-variable-pattern': '^[_a-z][\\w-]*$',
    'scss/at-extend-no-missing-placeholder': true,
    'declaration-property-value-blacklist': { '/^border/': ['none'] },
  },
};
