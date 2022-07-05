import { SelectOption, ValueHasChanged, Select } from '../../src';
import { useForm } from 'react-hook-form';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const options: ReadonlyArray<SelectOption<number>> = [
	{ value: 1, label: 'One' },
	{ value: 2, label: 'Two' }
];

interface Form {
	readonly field: number | null;
}

interface FormComponentProps {
	readonly onSubmit: (values: Form) => void;
	readonly onValueHasChanged: ValueHasChanged;
}

const FormComponent = (props: FormComponentProps) => {
	const { control, handleSubmit } = useForm<Form>({
		defaultValues: {
			field: null
		}
	});
	return (
		<form onSubmit={handleSubmit(props.onSubmit)}>
			<Select
				control={control}
				name="field"
				label="My Select"
				options={options}
				onValueHasChanged={props.onValueHasChanged}
			/>
			<button type="submit">Submit</button>
		</form>
	);
};

describe('Select', () => {
	let valueHasChangedCalled = false;
	let receivedValues: Form | undefined;
	beforeEach(() => {
		valueHasChangedCalled = false;
		receivedValues = undefined;
	});

	it('can select option', async () => {
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
		await userEvent.click(screen.getByLabelText('My Select'));
		await userEvent.click(screen.getByText('One'));
		expect(valueHasChangedCalled).toEqual(true);

		await userEvent.click(screen.getByText('Submit'));
		expect(receivedValues).toEqual({
			field: 1
		});
	});
});
