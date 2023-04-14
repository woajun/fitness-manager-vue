module.exports = {
  root: true,
  env: {
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/airbnb',
    'airbnb-typescript/base',
    '@vue/typescript/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
    ecmaVersion: 2020,
  },
  rules: {
    'no-alert': 'off',
    'no-spaced-func': 'off',
    'linebreak-style': 'off',
    'vuejs-accessibility/form-control-has-label': 'off',
    'vue/html-button-has-type': 'off',
    'vuejs-accessibility/label-has-for': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vue/max-len': 'off',
    '@typescript-eslint/object-curly-spacing': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
  },
  ignorePatterns: ['dist/**', 'debug.js', 'tailwind.config.js'],
};
