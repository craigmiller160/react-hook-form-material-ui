import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import MuiSwitch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DefaultProps } from '../types/form';

interface Props<F extends FieldValues> extends DefaultProps<F> {
	readonly color?: 'primary' | 'secondary' | 'default';
}

const Switch = <F extends FieldValues>(props: Props<F>) => {
	const { id, className, name, control, color, label } = props;

	const labelClassName = `${className ?? ''} switch-label`;

	return (
		<Controller
			control={control}
			name={name}
			rules={props.rules}
			render={({ field: { onChange, onBlur, value } }) => (
				<FormControlLabel
					className={labelClassName}
					label={label}
					control={
						<MuiSwitch
							id={id}
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
