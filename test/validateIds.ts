import { expect } from 'vitest';

export type InputTag = 'input' | 'textarea';

const validateInputIds = (
	container: HTMLElement,
	baseId: string,
	inputTag: InputTag = 'input'
) => {
	const label = container.querySelector('label');
	const input = container.querySelector(inputTag);
	expect(label?.id).toEqual(`${baseId}-label`);
	expect(input?.id).toEqual(baseId);
};

expect.extend({
	validateInputIds
});
