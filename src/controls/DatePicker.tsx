import { Controller, type FieldValues } from 'react-hook-form';
import type { DefaultProps, Rules } from '../types/form.js';
import {
	type CalendarPickerView,
	DatePicker as MuiDatePicker
} from '@mui/x-date-pickers';
import { TextField as MuiTextField } from '@mui/material';
import { isValid } from 'date-fns';
import { useControlId } from '../utils/useControlId.js';

const validate = (value?: Date): string | undefined =>
	!value || isValid(value) ? undefined : 'Must be valid date';

type Props<F extends FieldValues> = DefaultProps<F> &
	Readonly<{
		views?: ReadonlyArray<CalendarPickerView>;
	}>;

export const DatePicker = <F extends FieldValues>(props: Props<F>) => {
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
