export const validateIds = (container: HTMLElement, baseId: string) => {
	const label = container.querySelector('label');
	const input = container.querySelector('input');
	expect(label.id).toEqual(`${baseId}-label`);
	expect(input.id).toEqual(baseId);
};
