import { DefaultProps, SelectOption } from '../types/form';
import { Controller, FieldValues } from 'react-hook-form';
import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select as MuiSelect
} from '@mui/material';

interface Props<F extends FieldValues> extends DefaultProps<F> {
	readonly options: ReadonlyArray<SelectOption<string | number>>;
}

export const Select = <F extends FieldValues>(props: Props<F>) => {
	return (
		<Controller
			name={props.name}
			control={props.control}
			rules={props.rules}
			render={({ field, fieldState }) => (
				<FormControl>
					<InputLabel>{props.label}</InputLabel>
					<MuiSelect
						{...field}
						className={props.className}
						inputProps={{
							'data-testid': props.testId
						}}
						id={props.id}
						onChange={(event) => {
							field.onChange(event);
							props.onValueHasChanged?.();
						}}
						label={props.label}
						error={!!fieldState.error}
						disabled={props.disabled}
					>
						{props.options.map((option) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</MuiSelect>
					<FormHelperText>{fieldState.error?.message}</FormHelperText>
				</FormControl>
			)}
		/>
	);
};
