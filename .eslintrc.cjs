/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue-pug/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-standard'
  ],
  env: {
    'vue/setup-compiler-macros': true
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
  }
}
