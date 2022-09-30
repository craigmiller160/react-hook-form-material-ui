import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import MuiTextField from '@mui/material/TextField';
import { DefaultProps } from '../types/form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Transform = (value: string) => any;

interface Props<F extends FieldValues> extends DefaultProps<F> {
	readonly type?: 'text' | 'number' | 'password';
	readonly transform?: Transform;
	readonly onBlurTransform?: Transform;
	readonly placeholder?: string;
	readonly multiline?: boolean;
	readonly rows?: number;
	readonly variant?: 'standard' | 'filled' | 'outlined';
}

const TextField = <F extends FieldValues>(props: Props<F>) => {
	const {
		id,
		name,
		control,
		className,
		label,
		rules,
		type,
		disabled,
		transform,
		onBlurTransform,
		placeholder,
		multiline,
		rows,
		variant
	} = props;

	let actualTransform: Transform | undefined = transform;
	if (type === 'number' && transform === undefined) {
		actualTransform = (value) => (value ? parseInt(value, 10) : '');
	}

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, onBlur, value }, fieldState }) => (
				<MuiTextField
					id={id}
					type={type}
					className={className}
					inputProps={{
						'data-testid': props.testId
					}}
					label={label}
					placeholder={placeholder}
					onChange={(event) => {
						if (actualTransform) {
							onChange(actualTransform(event.target.value));
						} else {
							onChange(event.target.value);
						}
						props.onValueHasChanged?.();
					}}
					onBlur={(event) => {
						if (onBlurTransform) {
							onChange(onBlurTransform(event.target.value));
						}
						onBlur();
					}}
					value={value}
					error={!!fieldState.error}
					helperText={fieldState.error?.message ?? ''}
					disabled={disabled}
					multiline={multiline}
					rows={rows}
					variant={variant}
				/>
			)}
		/>
	);
};

export default TextField;
