module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    "no-console": 0,
    'vue/no-parsing-error': [2, {
      "x-invalid-end-tag": false
    }]
  }
}
