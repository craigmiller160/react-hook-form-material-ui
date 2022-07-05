import React, { MutableRefObject } from 'react';
import { Input } from '@mui/material';
import { Controller, FieldValues } from 'react-hook-form';
import styled from '@emotion/styled';
import { DefaultProps } from '../types/form';

interface Props<F extends FieldValues> extends DefaultProps<F> {
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

// TODO need a label here
export const FileChooser = <F extends FieldValues>(props: Props<F>) => (
	<Controller
		name={props.name}
		control={props.control}
		rules={props.rules}
		render={({ field, fieldState }) => (
			<StyledDiv className={props.className}>
				<Input
					id={props.id}
					inputProps={{
						'data-testid': props.testId,
						ref: props.inputRef
					}}
					type="file"
					disabled={props.disabled}
					onBlur={field.onBlur}
					onChange={(e) => {
						field.onChange(
							(e.target as HTMLInputElement).files?.[0]
						);
						props.onValueHasChanged?.();
					}}
				/>
				<span style={{ color: 'red' }}>
					{fieldState.error?.message}
				</span>
			</StyledDiv>
		)}
	/>
);
