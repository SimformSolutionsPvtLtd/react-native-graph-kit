const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'prettier',
    'plugin:react-native/all',
    'plugin:prettier/recommended', // https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    '@react-native-community/eslint-config',
    'eslint-config-prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    jsx: true,
    tsconfigRootDir: __dirname
  },
  ignorePatterns: ['.eslintrc.js'],
  plugins: [
    '@typescript-eslint',
    'eslint-comments',
    'react',
    'react-hooks',
    'react-native',
    '@react-native-community',
    'prettier',
    'jest',
    'import'
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`

        // Choose from one of the "project" configs below or omit to use <root>/tsconfig.json by default

        // use <root>/path/to/folder/tsconfig.json
        project: 'tsconfig.json'
      }
    }
  },
  // Map from global var to bool specifying if it can be redefined
  globals: {
    __DEV__: true,
    __dirname: false,
    __fbBatchedBridgeConfig: false,
    alert: false,
    cancelAnimationFrame: false,
    cancelIdleCallback: false,
    clearImmediate: true,
    clearInterval: false,
    clearTimeout: false,
    console: false,
    document: false,
    escape: false,
    Event: false,
    EventTarget: false,
    exports: false,
    fetch: false,
    FormData: false,
    global: false,
    Map: true,
    module: false,
    navigator: false,
    process: false,
    Promise: true,
    requestAnimationFrame: true,
    requestIdleCallback: true,
    require: false,
    Set: true,
    setImmediate: true,
    setInterval: false,
    setTimeout: false,
    window: false,
    XMLHttpRequest: false
  },
  rules: {
    'prettier/prettier': [
      ERROR,
      {},
      {
        usePrettierrc: true
      }
    ],
    // General
    indent: [
      OFF,
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        FunctionDeclaration: {
          parameters: 1,
          body: 1
        },
        FunctionExpression: {
          parameters: 1,
          body: 1
        },
        flatTernaryExpressions: true,
        offsetTernaryExpressions: true
      }
    ],
    // general
    'global-require': OFF,
    'no-plusplus': OFF,
    'no-cond-assign': OFF,
    'max-classes-per-file': [ERROR, 10],
    'no-shadow': OFF,
    'no-undef': OFF,
    'no-bitwise': OFF,
    'no-param-reassign': OFF,
    'no-use-before-define': OFF,
    'linebreak-style': [ERROR, 'unix'],
    semi: [ERROR, 'always'],
    'comma-dangle': [
      ERROR,
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'ignore'
      }
    ],
    'object-curly-spacing': [ERROR, 'always'],
    'eol-last': [ERROR, 'always'],
    'no-console': OFF,
    'no-restricted-syntax': [
      WARN,
      {
        selector:
          "CallExpression[callee.object.name='console'][callee.property.name!=/^(warn|error|info|trace|disableYellowBox|tron)$/]",
        message: 'Unexpected property on console object was called'
      }
    ],
    'require-jsdoc': [
      WARN,
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
          ArrowFunctionExpression: true,
          FunctionExpression: true
        }
      }
    ],
    eqeqeq: [WARN, 'always'],
    quotes: [ERROR, 'single', { avoidEscape: true, allowTemplateLiterals: false }],
    // typescript
    '@typescript-eslint/no-shadow': [ERROR],
    '@typescript-eslint/no-use-before-define': [ERROR],
    '@typescript-eslint/no-unused-vars': ERROR,
    '@typescript-eslint/consistent-type-definitions': [ERROR, 'interface'],
    '@typescript-eslint/indent': [
      OFF,
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        FunctionDeclaration: {
          parameters: 1,
          body: 1
        },
        FunctionExpression: {
          parameters: 1,
          body: 1
        },
        flatTernaryExpressions: true,
        offsetTernaryExpressions: true
      }
    ],
    // imports
    'import/extensions': OFF,
    'import/prefer-default-export': OFF,
    'import/no-cycle': OFF,
    'import/order': [
      ERROR,
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        },
        warnOnUnassignedImports: true
      }
    ],
    'import/no-unresolved': [ERROR, { commonjs: true, amd: true }],
    'import/named': ERROR,
    'import/namespace': ERROR,
    'import/default': ERROR,
    'import/export': ERROR,
    'import/no-extraneous-dependencies': [ERROR, { devDependencies: true }],
    // react hooks
    'react-hooks/exhaustive-deps': ERROR,
    'react-hooks/rules-of-hooks': ERROR,
    // react
    'react/jsx-props-no-spreading': OFF,
    'react/jsx-filename-extension': [ERROR, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/no-unescaped-entities': [ERROR, { forbid: ['>', '"', '}'] }],
    'react/prop-types': [ERROR, { ignore: ['action', 'dispatch', 'nav', 'navigation'] }],
    'react/display-name': OFF,
    'react/jsx-boolean-value': ERROR,
    'react/jsx-no-undef': ERROR,
    'react/jsx-uses-react': ERROR,
    'react/jsx-sort-props': [
      ERROR,
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: true,
        noSortAlphabetically: true
      }
    ],
    'react/jsx-pascal-case': ERROR,
    'react/no-children-prop': OFF,
    // react-native specific rules
    'react-native/no-unused-styles': ERROR,
    'react-native/no-inline-styles': ERROR,
    'react-native/no-color-literals': ERROR,
    'react-native/no-raw-text': ERROR
  }
};
