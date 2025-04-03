// .eslintrc.js

// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    '@typescript-eslint/recommended',
    'next/core-web-vitals', // Next.js特定的规则
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    // 这里可以添加或覆盖规则
    'react/react-in-jsx-scope': 'off', // Next.js 13+ 不再需要导入 React
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-indent': ['error', 2], // 2个空格缩进
    'react/jsx-indent-props': ['error', 2], // 属性缩进2个空格
    'react/jsx-max-props-per-line': ['error', { maximum: 1 }], // 每行最多1个属性
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'], // 闭合标签与首标签对齐
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'ignore' }], // 属性中不使用花括号
    'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }], // 自闭合标签前有空格
    'react/jsx-no-literals': 'warn', // 警告直接使用字符串字面量
    'react/jsx-no-bind': 'error', // 禁止在render中绑定方法
    'react/jsx-props-no-spreading': 'warn', // 警告过度使用对象展开
    'react/jsx-sort-props': ['warn', {
      ignoreCase: true,
      callbacksLast: false,
      shorthandFirst: false,
      shorthandLast: false,
    }], // 按字母顺序排序属性
    'react/jsx-boolean-value': ['error', 'always'], // 省略布尔属性的值
    'react/jsx-handler-names': ['warn', {
      eventHandlerPrefix: 'handle',
      eventHandlerPropPrefix: 'on',
    }], // 事件处理程序命名约定
  },
};