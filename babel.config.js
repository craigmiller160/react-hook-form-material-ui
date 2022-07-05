const babelConfig = require('@craigmiller160/babel-config');
const babelConfigReact = require('@craigmiller160/babel-config-react');
const configMerge = require('@craigmiller160/config-merge');

module.exports = configMerge(babelConfig, babelConfigReact);