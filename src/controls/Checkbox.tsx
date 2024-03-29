import { Controller, type FieldValues } from 'react-hook-form';
import { FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';
import type { DefaultProps } from '../types/form.js';
import { useControlId } from '../utils/useControlId.js';

type LabelPlacement = 'end' | 'start' | 'top' | 'bottom';

interface Props<F extends FieldValues> extends DefaultProps<F> {
	readonly labelPlacement?: LabelPlacement;
}

export const Checkbox = <F extends FieldValues>(props: Props<F>) => {
	const { inputId, labelId } = useControlId(props.id);
	const labelPlacement = props.labelPlacement ?? 'end';
	return (
		<Controller
			name={props.name}
			control={props.control}
			rules={props.rules}
			render={({ field }) => (
				<FormControlLabel
					id={labelId}
					htmlFor={inputId}
					label={props.label}
					className={props.className}
					labelPlacement={labelPlacement}
					control={
						<MuiCheckbox
							{...field}
							id={inputId}
							data-testid={props.testId}
							disabled={props.disabled}
							checked={field.value}
							onChange={(event) => {
								field.onChange(event);
								props.onValueHasChanged?.();
							}}
						/>
					}
				/>
			)}
		/>
	);
};
