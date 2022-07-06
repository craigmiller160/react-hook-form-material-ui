import { Controller, FieldValues } from 'react-hook-form';
import { FormControlLabel } from '@mui/material';
import MuiCheckbox from '@mui/material/Checkbox';
import { DefaultProps } from '../types/form';
import { useId } from 'react';

export const Checkbox = <F extends FieldValues>(props: DefaultProps<F>) => {
	const generatedId = useId();
	const idToUse = props.id ?? generatedId;
	return (
		<Controller
			name={props.name}
			control={props.control}
			rules={props.rules}
			render={({ field }) => (
				<FormControlLabel
					htmlFor={idToUse}
					label={props.label}
					control={
						<MuiCheckbox
							{...field}
							id={idToUse}
							data-testid={props.testId}
							className={props.className}
							disabled={props.disabled}
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
