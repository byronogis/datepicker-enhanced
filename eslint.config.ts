import antfu from '@antfu/eslint-config'
import {} from 'eslint-flat-config-utils'

export default antfu(
  {
    type: 'lib',
    vue: true,
    stylistic: true,
  },
  {
    rules: {
      'no-console': ['warn', {
        allow: [
          'warn',
          'error',
          'info',
        ],
      }],

      /**
       * @see https://eslint.org/docs/latest/rules/no-unused-expressions
       */
      'ts/no-unused-expressions': 'warn',
      'ts/explicit-function-return-type': 'warn',

      /**
       * @see https://eslint.org/docs/latest/rules/prefer-promise-reject-errors
       */
      'prefer-promise-reject-errors': 'error',

      /**
       * Always use curly braces for blocks and new line.
       * @see https://eslint.org/docs/latest/rules/curly#all
       * @see https://eslint.style/rules/default/max-statements-per-line#max
       * @see https://eslint.style/rules/default/brace-style#stroustrup
       */
      'curly': ['error', 'all'],
      '@stylistic/max-statements-per-line': ['error', { max: 1 }],
      '@stylistic/brace-style': ['error', 'stroustrup'],

      'yaml/sort-keys': 'off',
    },
  },
)
