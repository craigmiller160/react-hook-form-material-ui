import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

export interface SelectOption<R> {
	label: string;
	value: R;
}

export type Rules<F extends FieldValues> = Omit<
	RegisterOptions<F, FieldPath<F>>,
	'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;

export type ValueHasChanged = () => void;

export interface DefaultProps<F extends FieldValues> {
	readonly control: Control<F>;
	readonly name: FieldPath<F>;
	readonly label: string;
	readonly rules?: Rules<F>;
	readonly onValueHasChanged?: ValueHasChanged;
}
