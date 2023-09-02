import { FieldPath, useForm, RegisterOptions } from 'react-hook-form';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextField, { Transform } from '../../src/controls/TextField';
import { validateIds } from './validateIds';

interface Form {
	field: string | number;
}

interface FormComponentProps {
	type: 'text' | 'number';
	rules?: Omit<
		RegisterOptions<Form, FieldPath<Form>>,
		'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
	>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	transform?: Transform;
	onBlurTransform?: Transform;
	textArea?: boolean;
}

const onSubmit = jest.fn();
const onValueHasChanged = jest.fn();

const FormComponent = (props: FormComponentProps) => {
	const defaultValue = props.type ? '' : 0;
	const { control, handleSubmit } = useForm<Form>({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		defaultValues: {
			field: defaultValue
		}
	});

	return (
		<div>
			<p>Hello World</p>
			<form onSubmit={handleSubmit((values) => onSubmit(values))}>
				<TextField
					id="field"
					name="field"
					control={control}
					label="The Field"
					type={props.type}
					rules={props.rules}
					transform={props.transform}
					multiline={props.textArea}
					rows={props.textArea ? 5 : 0}
					onValueHasChanged={onValueHasChanged}
					onBlurTransform={props.onBlurTransform}
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

describe('TextField', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('accepts input for type text', async () => {
		await waitFor(() => render(<FormComponent type="text" />));

		const textField = screen.getByLabelText('The Field');
		await userEvent.type(textField, 'Hello World');
		expect(onValueHasChanged).toHaveBeenCalled();

		await waitFor(() => userEvent.click(screen.getByText('Submit')));
		expect(onSubmit).toHaveBeenCalledWith({
			field: 'Hello World'
		});
	});

	it('accepts input for type number', async () => {
		await waitFor(() => render(<FormComponent type="number" />));

		const textField = screen.getByLabelText('The Field');
		const submit = screen.getByText('Submit');

		await userEvent.clear(textField);
		await userEvent.type(textField, '12345');

		await waitFor(() => userEvent.click(submit));
		expect(onSubmit).toHaveBeenNthCalledWith(1, {
			field: 12345
		});

		await userEvent.clear(textField);
		await userEvent.type(textField, 'ABC');

		await waitFor(() => userEvent.click(submit));
		expect(onSubmit).toHaveBeenNthCalledWith(2, {
			field: ''
		});
	});

	it('transforms input onBlur', async () => {
		await waitFor(() =>
			render(
				<FormComponent
					type="text"
					onBlurTransform={(value) => `${value}-World`}
				/>
			)
		);

		const textField = screen.getByLabelText('The Field');
		const submit = screen.getByText('Submit');

		await userEvent.clear(textField);
		await userEvent.type(textField, '123');

		await waitFor(() => userEvent.click(submit));
		expect(onSubmit).toHaveBeenNthCalledWith(1, {
			field: '123-World'
		});
	});

	it('transforms input', async () => {
		await waitFor(() =>
			render(
				<FormComponent
					type="text"
					transform={(value) => value.toUpperCase()}
				/>
			)
		);

		const textField = screen.getByLabelText('The Field');
		await userEvent.type(textField, 'Hello World');

		await waitFor(() => userEvent.click(screen.getByText('Submit')));
		expect(onSubmit).toHaveBeenCalledWith({
			field: 'HELLO WORLD'
		});
	});

	it('shows text area', async () => {
		await waitFor(() => render(<FormComponent type="text" textArea />));

		const input = screen.getByLabelText('The Field');
		expect(input.tagName).toEqual('TEXTAREA');
		expect((input as HTMLTextAreaElement).rows).toEqual(5);
	});

	it('renders with id', () => {
		const { container: textContainer } = render(
			<FormComponent type="text" />
		);
		validateIds(textContainer, 'field');

		const { container: textAreaContainer } = render(
			<FormComponent type="text" textArea />
		);
		validateIds(textAreaContainer, 'field', 'textarea');

		const { container: numberContainer } = render(
			<FormComponent type="number" />
		);
		validateIds(numberContainer, 'field');
	});
});
