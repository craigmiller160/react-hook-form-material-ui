import { DatePicker, ValueHasChanged } from '../../src';
import { useForm } from 'react-hook-form';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import format from 'date-fns/format/index';

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
			<p>Random Text</p>
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
		const todayFormatted = format(new Date(), 'MMM d, yyyy');

		const renderResult = render(
			<FormComponent
				onSubmit={(values) => {
					receivedValues = values;
				}}
				onValueHasChanged={() => {
					valueHasChangedCalled = true;
				}}
			/>
		);
		const dateChooserButton = renderResult.container.querySelector(
			'button[aria-label = "Choose date"]'
		);
		expect(dateChooserButton).not.toBeNull();
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		await userEvent.click(dateChooserButton!);

		const popupDialog = screen.getByRole('dialog');

		const selectedDateButton = popupDialog.querySelector(
			`button[aria-label = "${todayFormatted}"]`
		);
		expect(selectedDateButton).not.toBeNull();
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		await userEvent.click(selectedDateButton!);

		expect(valueHasChangedCalled).toEqual(true);
		await userEvent.click(screen.getByText('Submit'));
		expect(receivedValues?.field).toBeTruthy();
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const formattedValue = format(receivedValues!.field!, 'yyyy-MM-dd');
		expect(formattedValue).toEqual(format(new Date(), 'yyyy-MM-dd'));
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

		await userEvent.type(screen.getByLabelText('My Date'), '01012022', {
			delay: 1
		});
		await userEvent.click(screen.getByText('Random Text'));
		expect(valueHasChangedCalled).toEqual(true);
		expect(screen.getByLabelText('My Date')).toHaveValue('01/01/2022');
		await userEvent.click(screen.getByText('Submit'));
		expect(receivedValues).not.toBeUndefined();
		expect(receivedValues?.field).toBeTruthy();
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const formattedValue = format(receivedValues!.field!, 'yyyy-MM-dd');
		expect(formattedValue).toEqual('2022-01-01');
	});
});
