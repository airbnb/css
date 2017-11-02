module.exports = {
  plugins: [
    'stylelint-scss',
  ],
  rules: {
    'at-rule-empty-line-before': 'never',
    'block-opening-brace-space-before': 'always',
    'comment-empty-line-before': ['always', {
      ignore: ['stylelint-commands'],
    }],
    'declaration-colon-space-after': 'always',
    'declaration-colon-space-before': 'never',
    indentation: 2,
    'max-nesting-depth': 3,
    'no-invalid-double-slash-comments': true,
    'rule-non-nested-empty-line-before': ['always', {
      ignore: ['after-comment'],
    }],
    'selector-list-comma-newline-after': 'always',
    'selector-no-id': true,

    'scss/dollar-variable-pattern': '^foo',
    'scss/at-extend-no-missing-placeholder': true,

    'declaration-property-value-blacklist': {
      '/^border/': ['none'],
    },
  },
};
