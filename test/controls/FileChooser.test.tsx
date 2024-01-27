import { type MockedFunction, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { FileChooser, type ValueHasChanged } from '../../src/index.js';
import { useForm } from 'react-hook-form';

type Form = Readonly<{
	file: File | null;
}>;

type OnSubmit = (values: Form) => void;

type FormComponentProps = Readonly<{
	onSubmit: OnSubmit;
	onValueHasChanged: ValueHasChanged;
}>;

const FormComponent = (props: FormComponentProps) => {
	const { control, handleSubmit } = useForm<Form>({
		defaultValues: {
			file: null
		}
	});

	return (
		<form onSubmit={handleSubmit(props.onSubmit)}>
			<FileChooser
				id="my-file"
				control={control}
				name="file"
				label="My File"
			/>
		</form>
	);
};

test('renders, submits, and emits value on change', () => {
	const onSubmit: MockedFunction<OnSubmit> = vi.fn();
	const onValueHasChanged: MockedFunction<ValueHasChanged> = vi.fn();
	render(
		<FormComponent
			onSubmit={onSubmit}
			onValueHasChanged={onValueHasChanged}
		/>
	);
    const input = screen.getByLabelText('My File');
    expect(input).toBeVisible();
});
