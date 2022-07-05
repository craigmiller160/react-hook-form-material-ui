import { useForm } from 'react-hook-form';
import { Checkbox } from '../../src';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

interface Form {
	readonly field: boolean;
}

interface FormComponentProps {
	readonly onSubmit: (values: Form) => void;
}

const FormComponent = (props: FormComponentProps) => {
	const { control, handleSubmit } = useForm<Form>({
		defaultValues: {
			field: false
		}
	});
	return (
		<form onSubmit={handleSubmit(props.onSubmit)}>
			<Checkbox control={control} name="field" label="My Checkbox" />
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
		throw new Error();
	});
});
