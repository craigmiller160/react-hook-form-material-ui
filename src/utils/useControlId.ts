import { useId } from 'react';

export type ControlId = {
	readonly labelId: string;
	readonly inputId: string;
};

export const useControlId = (providedId?: string): ControlId => {
	const generatedId = useId();
	const inputId = providedId ?? generatedId;
	const labelId = `${inputId}-label`;
	return {
		inputId,
		labelId
	};
};
