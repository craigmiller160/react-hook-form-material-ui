import { beforeEach, describe, it, vi, expect } from 'vitest';
import { useForm } from 'react-hook-form';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Switch from '../../src/controls/Switch';

interface Form {
	field: boolean;
}

const onSubmit = vi.fn();
const onValueHasChanged = vi.fn();

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
				<Switch
					id="field"
					name="field"
					control={control}
					label="The Field"
					onValueHasChanged={onValueHasChanged}
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

describe('Switch', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});
	it('works', async () => {
		render(<FormComponent />);

		const input = screen.getByLabelText('The Field');
		await userEvent.click(input);
		expect(onValueHasChanged).toHaveBeenCalled();

		await userEvent.click(screen.getByText('Submit'));
		expect(onSubmit).toHaveBeenCalledWith({
			field: true
		});
	});

	it('renders with id', () => {
		const { container } = render(<FormComponent />);
		expect(container).hasInputIds('field');
	});
});
