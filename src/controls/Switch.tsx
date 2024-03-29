import React from 'react';
import { Controller, type FieldValues } from 'react-hook-form';
import { Switch as MuiSwitch, FormControlLabel } from '@mui/material';
import { type DefaultProps } from '../types/form.js';
import { useControlId } from '../utils/useControlId.js';

interface Props<F extends FieldValues> extends DefaultProps<F> {
	readonly color?: 'primary' | 'secondary' | 'default';
}

const Switch = <F extends FieldValues>(props: Props<F>) => {
	const { id, className, name, control, color, label } = props;
	const { inputId, labelId } = useControlId(id);
	const labelClassName = `${className ?? ''} switch-label`;

	return (
		<Controller
			control={control}
			name={name}
			rules={props.rules}
			render={({ field: { onChange, onBlur, value } }) => (
				<FormControlLabel
					id={labelId}
					className={labelClassName}
					label={label}
					control={
						<MuiSwitch
							id={inputId}
							data-testid={props.testId}
							classes={{
								input: `switch-${value}`
							}}
							disabled={props.disabled}
							onChange={(event) => {
								onChange(event.target.checked);
								props.onValueHasChanged?.();
							}}
							onBlur={onBlur}
							checked={value}
							color={color ?? 'primary'}
						/>
					}
				/>
			)}
		/>
	);
};

export default Switch;
