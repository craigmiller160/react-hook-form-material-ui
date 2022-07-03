import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import { FieldPath, FieldValues } from 'react-hook-form';

export interface SelectOption<R> {
	label: string;
	value: R;
}

export type Rules<F extends FieldValues> = Omit<
	RegisterOptions<F, FieldPath<F>>,
	'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;
