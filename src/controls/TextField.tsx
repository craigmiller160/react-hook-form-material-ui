import React from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import MuiTextField from '@mui/material/TextField';
import { Rules } from '../types/form';

type Transform = (value: string) => any;

interface Props<F extends FieldValues> {
	readonly id?: string;
	readonly name: FieldPath<F>;
	readonly control: Control<F>;
	readonly label: string;
	readonly className?: string;
	readonly rules?: Rules<F>;
	readonly type?: 'text' | 'number' | 'password';
	readonly disabled?: boolean;
	readonly transform?: Transform;
	readonly placeholder?: string;
	readonly multiline?: boolean;
	readonly rows?: number;
	readonly variant?: 'standard' | 'filled' | 'outlined';
	readonly testId?: string;
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
					}}
					onBlur={onBlur}
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
