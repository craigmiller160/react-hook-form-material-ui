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
			<button type="submit">Submit</button>
		</form>
	);
};

test('renders, submits, and emits value on change', async () => {
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

	const file = new File(['hello'], 'hello.png', { type: 'image/png' });
	await userEvent.upload(input, file);

	expect(onValueHasChanged).toHaveBeenCalledWith(file);

	const button = screen.getByText('Submit');
	await userEvent.click(button);
	expect(onSubmit).toHaveBeenCalledWith<[Form]>({
		file
	});
});
