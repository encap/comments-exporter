module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
  },
  plugins: ['prettier', 'react', 'react-hooks', 'jsx-a11y'],
  ignorePatterns: ['node_modules/', 'public/', 'dist/'],
  rules: {
    'prettier/prettier': [
      2,
      {
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
        endOfLine: 'lf',
      },
    ],
    'no-console': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'max-len': 0,
    'consistent-return': 0,
    'no-multiple-empty-lines': [2, { max: 2, maxEOF: 1 }],
    'no-mixed-operators': [1, { allowSamePrecedence: true }],
    'object-property-newline': [1, { allowMultiplePropertiesPerLine: true }],
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': 0,
    'react/forbid-prop-types': 0,
  },
};
