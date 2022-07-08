import { Controller, FieldValues } from 'react-hook-form';
import { FormControlLabel } from '@mui/material';
import MuiCheckbox from '@mui/material/Checkbox';
import { DefaultProps } from '../types/form';
import { useId } from 'react';

type LabelPlacement = 'end' | 'start' | 'top' | 'bottom';

interface Props<F extends FieldValues> extends DefaultProps<F> {
	readonly labelPlacement?: LabelPlacement;
}

export const Checkbox = <F extends FieldValues>(props: Props<F>) => {
	const generatedId = useId();
	const idToUse = props.id ?? generatedId;
	const labelPlacement = props.labelPlacement ?? 'end';
	return (
		<Controller
			name={props.name}
			control={props.control}
			rules={props.rules}
			render={({ field }) => (
				<FormControlLabel
					htmlFor={idToUse}
					label={props.label}
					className={props.className}
					labelPlacement={labelPlacement}
					control={
						<MuiCheckbox
							{...field}
							id={idToUse}
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
