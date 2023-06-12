import { useForm } from 'react-hook-form';
import { Checkbox, ValueHasChanged } from '../../src';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { validateIds } from './validateIds';

interface Form {
	readonly field: boolean;
}

interface FormComponentProps {
	readonly onSubmit: (values: Form) => void;
	readonly onValueHasChanged: ValueHasChanged;
}

const FormComponent = (props: FormComponentProps) => {
	const { control, handleSubmit } = useForm<Form>({
		defaultValues: {
			field: false
		}
	});
	return (
		<form onSubmit={handleSubmit(props.onSubmit)}>
			<Checkbox
				control={control}
				name="field"
				label="My Checkbox"
				onValueHasChanged={props.onValueHasChanged}
			/>
			<button type="submit">Submit</button>
		</form>
	);
};

describe('Checkbox', () => {
	let valueHasChangedCalled = false;
	let receivedValues: Form | undefined;
	beforeEach(() => {
		valueHasChangedCalled = false;
		receivedValues = undefined;
	});

	it('can check box', async () => {
		render(
			<FormComponent
				onSubmit={(values) => {
					receivedValues = values;
				}}
				onValueHasChanged={() => {
					valueHasChangedCalled = true;
				}}
			/>
		);
		await userEvent.click(screen.getByLabelText('My Checkbox'));
		expect(valueHasChangedCalled).toEqual(true);
		await userEvent.click(screen.getByText('Submit'));
		expect(receivedValues).toEqual({
			field: true
		});
	});

	it('renders with id', () => {
		const { container } = render(
			<FormComponent onSubmit={jest.fn()} onValueHasChanged={jest.fn()} />
		);
		validateIds(container, 'field');
	});
});
