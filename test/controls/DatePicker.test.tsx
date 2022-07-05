import { DatePicker, ValueHasChanged } from '../../src';
import { useForm } from 'react-hook-form';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

interface Form {
	readonly field: Date | null;
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
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<form onSubmit={handleSubmit(props.onSubmit)}>
				<DatePicker
					control={control}
					name="field"
					label="My Date"
					onValueHasChanged={props.onValueHasChanged}
				/>
				<button type="submit">Submit</button>
			</form>
		</LocalizationProvider>
	);
};

describe('DatePicker', () => {
	let valueHasChangedCalled = false;
	let receivedValues: Form | undefined;
	beforeEach(() => {
		valueHasChangedCalled = false;
		receivedValues = undefined;
	});
	it('can select date', async () => {
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
		throw new Error();
	});

	it('can type date', async () => {
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
		await userEvent.type(screen.getByLabelText('My Date'), '01/01/2022');
		expect(valueHasChangedCalled).toEqual(true);
		await userEvent.click(screen.getByText('Submit'));
		expect(receivedValues).not.toBeUndefined();
		expect(receivedValues?.field).toBeInstanceOf(Date);
	});
});
