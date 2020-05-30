module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {},
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
      ],
      parser: '@typescript-eslint/parser',
      settings: {
        react: {
          pragma: 'React',
          version: 'detect',
        },
      },
      parserOptions: {
        sourceType: 'module',
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
      },
      plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import'],
      rules: {
        'no-unused-vars': 'off',
        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', 'internal'],
            pathGroups: [
              {
                pattern: 'react',
                group: 'external',
                position: 'before',
              },
            ],
            pathGroupsExcludedImportTypes: ['react'],
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
        '@typescript-eslint/no-unused-vars': 'error',
        'react/prop-types': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
      },
    },
  ],
  globals: {
    React: 'writable',
  },
}
