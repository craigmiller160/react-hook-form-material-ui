import { Controller, FieldValues } from 'react-hook-form';
import { FormControlLabel } from '@mui/material';
import MuiCheckbox from '@mui/material/Checkbox';
import { DefaultProps } from '../types/form';

export const Checkbox = <F extends FieldValues>(props: DefaultProps<F>) => (
	<Controller
		name={props.name}
		control={props.control}
		rules={props.rules}
		render={({ field }) => (
			<FormControlLabel
				label={props.label}
				control={
					<MuiCheckbox
						{...field}
						id={props.id}
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
