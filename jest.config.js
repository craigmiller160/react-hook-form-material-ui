const jestConfig = require('@craigmiller160/jest-config');
const jestConfigTs = require('@craigmiller160/jest-config-ts');
const configMerge = require('@craigmiller160/config-merge');

module.exports = configMerge(jestConfig, jestConfigTs);