import React from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import MuiSwitch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

interface Props<F extends FieldValues> {
	readonly id?: string;
	readonly name: FieldPath<F>;
	readonly control: Control<F>;
	readonly label: string;
	readonly color?: 'primary' | 'secondary' | 'default';
	readonly className?: string;
}

const Switch = <F extends FieldValues>(props: Props<F>) => {
	const { id, className, name, control, color, label } = props;

	const labelClassName = `${className ?? ''} switch-label`;

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, onBlur, value } }) => (
				<FormControlLabel
					className={labelClassName}
					label={label}
					control={
						<MuiSwitch
							id={id}
							classes={{
								input: `switch-${value}`
							}}
							onChange={(event) => onChange(event.target.checked)}
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
