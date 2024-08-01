// eslint.config.js
module.exports = [
  {
    rules: {
      semi: 'error',
      'prefer-const': 'error',
    },
  },
];

// const prettierPlugin = require('eslint-plugin-prettier')

// module.exports = [
//   {
//     files: ['**/*.js'],
//     languageOptions: {
//       sourceType: 'module',
//       ecmaVersion: 'latest',
//     },
//     plugins: {
//       prettier: prettierPlugin,
//     },
//     rules: {
//       semi: 'error',
//       'prefer-const': 'error',
//       // Add Prettier recommended rules
//       ...prettierPlugin.configs.recommended.rules,
//     },
//     // Include any other configuration directly here if needed
//   },
// ]
