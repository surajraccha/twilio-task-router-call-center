const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    buffer: require.resolve('buffer/'),
    process: require.resolve('process/browser'),
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    util: require.resolve('util/'),
    path: require.resolve('path-browserify'),
    querystring: require.resolve('querystring-es3'),
    fs: false,  // fs is not available in the browser environment
    net: false, // net is not available in the browser environment
    tls: false, // tls is not available in the browser environment,
    url:false,
    vm:false,
    assert:false,
    os:false,
    "https": false
  };

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
  ]);

  return config;
};
