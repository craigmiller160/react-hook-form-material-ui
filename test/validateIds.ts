import { expect } from 'vitest';

export type InputTag = 'input' | 'textarea';

const validateInputIds = (
	container: HTMLElement,
	baseId: string,
	inputTag: InputTag = 'input'
) => {
	const label = container.querySelector('label');
	const input = container.querySelector(inputTag);

	if (!label) {
		return {
			pass: false,
			message: () => 'Unable to find label'
		};
	}

	if (!input) {
		return {
			pass: false,
			message: () => 'Unable to find input'
		};
	}

	const expectedLabelId = `${baseId}-label`;
	if (label.id !== expectedLabelId) {
		return {
			pass: false,
			message: () =>
				`Invalid label id. Expected: ${expectedLabelId}, Actual: ${label.id}`
		};
	}

	if (input.id !== baseId) {
		return {
			pass: false,
			message: () =>
				`Invalid input id. Expected: ${baseId}, Actual: ${input.id}`
		};
	}

	return {
		pass: true
	};
};

expect.extend({
	validateInputIds
});
