import { Controller, FieldValues } from 'react-hook-form';
import { DefaultProps, Rules } from '../types/form';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers';
import MuiTextField from '@mui/material/TextField';
import isValid from 'date-fns/isValid/index';
import { useControlId } from '../utils/useControlId';

const validate = (value?: Date): string | undefined =>
	!value || isValid(value) ? undefined : 'Must be valid date';

export const DatePicker = <F extends FieldValues>(props: DefaultProps<F>) => {
	const rules: Rules<F> = {
		...(props.rules ?? {}),
		validate
	};
	const { inputId } = useControlId(props.id);
	return (
		<Controller
			name={props.name}
			control={props.control}
			rules={rules}
			render={({ field, fieldState }) => (
				<MuiDatePicker
					{...field}
					className={props.className}
					onChange={(date, stringValue) => {
						field.onChange(date, stringValue);
						if (stringValue === undefined) {
							props.onValueHasChanged?.();
						}
					}}
					label={props.label}
					disabled={props.disabled}
					renderInput={(params) => (
						<MuiTextField
							{...params}
							id={inputId}
							inputProps={{
								...params.inputProps,
								'data-testid': props.testId
							}}
							onBlur={(event) => {
								params.onBlur?.(event);
								props.onValueHasChanged?.();
							}}
							error={!!fieldState.error}
							helperText={fieldState.error?.message ?? ''}
						/>
					)}
				/>
			)}
		/>
	);
};
