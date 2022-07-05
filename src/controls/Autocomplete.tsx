/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import { Controller, FieldValues } from 'react-hook-form';
import MuiAutocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { DefaultProps, SelectOption } from '../types/form';

interface Props<F extends FieldValues, R> extends DefaultProps<F> {
	readonly options: ReadonlyArray<SelectOption<R>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getOptionLabel = <R extends any>(option: string | SelectOption<R>) => {
	if (typeof option === 'string') {
		return option;
	}
	return (option as SelectOption<R>).label;
};

const Autocomplete = <F extends FieldValues, R>(props: Props<F, R>) => {
	const { id, name, control, rules, label, options, className, disabled } =
		props;

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field, fieldState }) => (
				<MuiAutocomplete
					id={id}
					className={className}
					options={options}
					isOptionEqualToValue={(option, selected) =>
						option.value === selected.value
					}
					getOptionLabel={getOptionLabel}
					value={field.value}
					onChange={(event, newValue) => {
						field.onChange(newValue);
						props.onValueHasChanged?.();
					}}
					onBlur={field.onBlur}
					disabled={disabled}
					renderInput={(params) => (
						<TextField
							{...params}
							inputProps={{
								...params.inputProps,
								'data-testid': props.testId
							}}
							label={label}
							variant="outlined"
							error={!!fieldState.error}
							helperText={fieldState.error?.message ?? ''}
						/>
					)}
				/>
			)}
		/>
	);
};

export default Autocomplete;
