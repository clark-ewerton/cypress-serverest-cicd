import pluginJs from '@eslint/js'
import pluginCypress from 'eslint-plugin-cypress/flat'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  pluginJs.configs.recommended,
  pluginCypress.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      'prefer-const': 'error',
      'no-console': 'warn',
      'cypress/no-unnecessary-waiting': 'warn'
    }
  },
  {
  files: ["cypress.config.js"],
  languageOptions: {
    sourceType: "commonjs", // diz que esse arquivo usa require/module.exports
    ecmaVersion: 2020,
  }
}

]