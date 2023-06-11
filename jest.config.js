const jestConfig = require('@craigmiller160/jest-config');
const configMerge = require('@craigmiller160/config-merge');
const path = require('path');

module.exports = configMerge(jestConfig, {
	setupFilesAfterEnv: [path.join(process.cwd(), 'test', 'setupTests.ts')]
});
