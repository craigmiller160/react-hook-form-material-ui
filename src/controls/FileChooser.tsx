import React, { MutableRefObject } from 'react';
import { Input } from '@mui/material';
import { Control, FieldPath, FieldValues, Controller } from 'react-hook-form';
import styled from '@emotion/styled';
import { Rules } from '../types/form';

interface Props<F extends FieldValues> {
	readonly name: FieldPath<F>;
	readonly control: Control<F>;
	readonly rules?: Rules<F>;
	readonly disabled?: boolean;
	readonly testId?: string;
	readonly inputRef?: MutableRefObject<HTMLInputElement | undefined>;
}

const StyledDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	> * {
		width: 100%;
	}
`;

export const FileChooser = <F extends FieldValues>(props: Props<F>) => (
	<Controller
		name={props.name}
		control={props.control}
		rules={props.rules}
		render={({ field, fieldState }) => (
			<StyledDiv>
				<Input
					inputProps={{
						'data-testid': props.testId,
						ref: props.inputRef
					}}
					type="file"
					disabled={props.disabled}
					onBlur={field.onBlur}
					onChange={(e) =>
						field.onChange(
							(e.target as HTMLInputElement).files?.[0]
						)
					}
				/>
				<span style={{ color: 'red' }}>
					{fieldState.error?.message}
					{/* eslint-disable-next-line react/jsx-closing-tag-location */}
				</span>
			</StyledDiv>
		)}
	/>
);
