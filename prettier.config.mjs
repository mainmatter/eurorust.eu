/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
export default {
  printWidth: 120,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  plugins: ['prettier-plugin-jinja-template'],
  overrides: [
    {
      files: ['**/*.{scss,yml,yaml,json}'],
      options: {
        singleQuote: false,
      },
    },
    {
      files: ['*.html'],
      options: {
        parser: 'jinja-template',
        singleQuote: false,
      },
    },
  ],
};
