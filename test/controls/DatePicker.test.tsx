import { DatePicker, ValueHasChanged } from '../../src';
import { useForm } from 'react-hook-form';
import React from 'react';
import { render } from '@testing-library/react';

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
		<form onSubmit={handleSubmit(props.onSubmit)}>
			<DatePicker
				control={control}
				name="field"
				label="My Checkbox"
				onValueHasChanged={props.onValueHasChanged}
			/>
			<button type="submit">Submit</button>
		</form>
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
		throw new Error();
	});
});
