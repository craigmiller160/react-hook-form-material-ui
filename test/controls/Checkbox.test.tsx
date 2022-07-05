import { useForm } from 'react-hook-form';
import { Checkbox } from '../../src';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

interface Form {
	readonly field: boolean;
}

interface FormComponentProps {
	readonly onSubmit?: (values: Form) => void;
	readonly dynamicSubmit?: () => void;
}

const FormComponent = (props: FormComponentProps) => {
	const { control, handleSubmit } = useForm<Form>({
		defaultValues: {
			field: false
		}
	});
	const onSubmit = props.onSubmit ? handleSubmit(props.onSubmit) : undefined;
	return (
		<form onSubmit={onSubmit}>
			<Checkbox
				control={control}
				name="field"
				label="My Checkbox"
				dynamicSubmit={props.dynamicSubmit}
			/>
			<button type="submit">Submit</button>
		</form>
	);
};

describe('Checkbox', () => {
	let receivedValues: Form | undefined;
	beforeEach(() => {
		receivedValues = undefined;
	});

	it('can check box', async () => {
		render(
			<FormComponent
				onSubmit={(values) => {
					receivedValues = values;
				}}
			/>
		);
		await userEvent.click(screen.getByLabelText('My Checkbox'));
		await userEvent.click(screen.getByText('Submit'));
		expect(receivedValues).toEqual({
			field: true
		});
	});

	it('does dynamic submit', async () => {
		let dynamicSubmitCalled = false;
		render(
			<FormComponent
				dynamicSubmit={() => {
					dynamicSubmitCalled = true;
				}}
			/>
		);
		await userEvent.click(screen.getByLabelText('My Checkbox'));
		expect(dynamicSubmitCalled).toEqual(true);
	});
});
