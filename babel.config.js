module.exports = function (api) {
  const babelEnv = api.env();
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true,
        },
        corejs: '3.0.0',
        useBuiltIns: 'usage',
      },
    ],
    '@babel/preset-react',
  ];
  const plugins = [
    '@babel/transform-react-constant-elements',
    'transform-react-remove-prop-types',
    'transform-react-pure-class-to-function',
    '@babel/plugin-transform-runtime',

    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',

    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-json-strings',

    'babel-plugin-react-scoped-css',
  ];

  if (babelEnv === 'production') {
    plugins.push(['@babel/plugin-transform-react-inline-elements']);
  }

  return {
    presets,
    plugins,
  };
};
