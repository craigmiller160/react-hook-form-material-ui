import React, { MutableRefObject } from 'react';
import { FormControlLabel, Input } from '@mui/material';
import { Controller, FieldValues } from 'react-hook-form';
import styled from '@emotion/styled';
import { DefaultProps } from '../types/form';
import { useControlId } from '../utils/useControlId';

interface Props<F extends FieldValues> extends DefaultProps<F> {
	readonly inputRef?: MutableRefObject<HTMLInputElement | undefined>;
}

const StyledDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	& .MuiFormControlLabel-root {
		width: 100%;
		margin: 0;
		padding: 0;

		& .MuiInput-root {
			width: 100%;
		}
	}
`;

export const FileChooser = <F extends FieldValues>(props: Props<F>) => {
	const { inputId, labelId } = useControlId(props.id);
	return (
		<Controller
			name={props.name}
			control={props.control}
			rules={props.rules}
			render={({ field, fieldState }) => (
				<StyledDiv className={props.className}>
					<FormControlLabel
						labelPlacement="bottom"
						id={labelId}
						htmlFor={inputId}
						control={
							<Input
								id={inputId}
								inputProps={{
									'data-testid': props.testId,
									ref: props.inputRef
								}}
								type="file"
								disabled={props.disabled}
								onBlur={field.onBlur}
								onChange={(e) => {
									field.onChange(
										(e.target as HTMLInputElement)
											.files?.[0]
									);
									props.onValueHasChanged?.();
								}}
							/>
						}
						label={props.label}
					/>
					<span style={{ color: 'red' }}>
						{fieldState.error?.message}
					</span>
				</StyledDiv>
			)}
		/>
	);
};
