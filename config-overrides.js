/* eslint-disable no-param-reassign */
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  webpack(config, env) {
    if (env === 'development') {
      config.plugins.push(
        new StylelintPlugin(),
        //   {
        //   fix: true,
        //   configFile: './.stylelintrc.js',
        // }
      );
    }

    config.output.path = `${__dirname}/docs`;

    return config;
  },
};
