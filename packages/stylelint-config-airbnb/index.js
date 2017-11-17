module.exports = {
  plugins: [
    'stylelint-scss',
    'stylelint-order',
  ],
  rules: {
    indentation: 2,
    'max-nesting-depth': 2,
    'number-leading-zero': 'never',
    'selector-no-id': true,
    'selector-list-comma-newline-after': 'always',
    'rule-non-nested-empty-line-before': ['always', { ignore: ['after-comment'] }],
    'comment-empty-line-before': ['always', { ignore: ['stylelint-commands'] }],
    'block-opening-brace-space-before': 'always',
    'declaration-colon-space-after': 'always',
    'declaration-colon-space-before': 'never',
    'declaration-property-value-blacklist': { '/^border/': ['none'] },
    'at-rule-empty-line-before': ['always', { except: ['first-nested'] }],
    'scss/dollar-variable-pattern': '^[_a-z][\\w-]*$',
    'scss/at-extend-no-missing-placeholder': true,
    'scss/double-slash-comment-inline': 'never',
    'order/order': ['declarations', 'at-rules', 'rules'],
  },
};
