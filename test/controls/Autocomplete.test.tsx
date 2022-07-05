import { useForm } from 'react-hook-form';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectOption } from '../../src';
import Autocomplete from '../../src/controls/Autocomplete';

interface Form {
	field: SelectOption<number> | null;
}

const onSubmit = jest.fn();

const FormComponent = () => {
	const { control, handleSubmit } = useForm<Form>({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		defaultValues: {
			field: null
		}
	});

	const options: SelectOption<number>[] = [
		{
			label: 'First',
			value: 1
		},
		{
			label: 'Second',
			value: 2
		},
		{
			label: 'Third',
			value: 3
		},
		{
			label: 'Fourth',
			value: 4
		}
	];

	return (
		<div>
			<form onSubmit={handleSubmit((values) => onSubmit(values))}>
				<Autocomplete
					id="field"
					name="field"
					control={control}
					label="The Field"
					options={options}
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

describe('Autocomplete', () => {
	it('can select option', async () => {
		await waitFor(() => render(<FormComponent />));

		const input = screen.getByLabelText('The Field');

		await waitFor(() => userEvent.click(input));
		expect(screen.queryByText('First')).toBeVisible();
		expect(screen.queryByText('Second')).toBeVisible();
		expect(screen.queryByText('Third')).toBeVisible();
		expect(screen.queryByText('Fourth')).toBeVisible();
		await waitFor(() => userEvent.click(screen.getByText('Third')));

		await waitFor(() => userEvent.click(screen.getByText('Submit')));
		expect(onSubmit).toHaveBeenCalledWith({
			field: {
				label: 'Third',
				value: 3
			}
		});
	});

	it('does dynamic submit', async () => {
		throw new Error();
	});
});
