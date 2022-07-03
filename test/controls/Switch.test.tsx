import React from 'react';
import { useForm } from 'react-hook-form';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Switch from '../../src/controls/Switch';

interface Form {
	field: boolean;
}

const onSubmit = jest.fn();

const FormComponent = () => {
	const { control, handleSubmit } = useForm<Form>({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		defaultValues: {
			field: false
		}
	});

	return (
		<div>
			<form onSubmit={handleSubmit((values) => onSubmit(values))}>
				<Switch name="field" control={control} label="The Field" />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

describe('Switch', () => {
	it('works', async () => {
		await waitFor(() => render(<FormComponent />));

		const input = screen.getByLabelText('The Field');
		userEvent.click(input);

		await waitFor(() => userEvent.click(screen.getByText('Submit')));
		expect(onSubmit).toHaveBeenCalledWith({
			field: true
		});
	});
});
