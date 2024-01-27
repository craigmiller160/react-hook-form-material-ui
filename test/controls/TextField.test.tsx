import { describe, it, expect, vi, beforeEach } from 'vitest';
import { type FieldPath, useForm, type RegisterOptions } from 'react-hook-form';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import TextField, { type Transform } from '../../src/controls/TextField.js';

interface Form {
	field: string | number;
}

interface FormComponentProps {
	type: 'text' | 'number';
	rules?: Omit<
		RegisterOptions<Form, FieldPath<Form>>,
		'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
	>;

	transform?: Transform;
	onBlurTransform?: Transform;
	textArea?: boolean;
}

const onSubmit = vi.fn();
const onValueHasChanged = vi.fn();

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
		vi.clearAllMocks();
	});

	it('accepts input for type text', async () => {
		render(<FormComponent type="text" />);

		const textField = screen.getByLabelText('The Field');
		await userEvent.type(textField, 'Hello World');
		expect(onValueHasChanged).toHaveBeenCalled();

		await userEvent.click(screen.getByText('Submit'));
		expect(onSubmit).toHaveBeenCalledWith({
			field: 'Hello World'
		});
	});

	it('accepts input for type number', async () => {
		render(<FormComponent type="number" />);

		const textField = screen.getByLabelText('The Field');
		const submit = screen.getByText('Submit');

		await userEvent.clear(textField);
		await userEvent.type(textField, '12345');

		await userEvent.click(submit);
		expect(onSubmit).toHaveBeenNthCalledWith(1, {
			field: 12345
		});

		await userEvent.clear(textField);
		await userEvent.type(textField, 'ABC');

		await userEvent.click(submit);
		expect(onSubmit).toHaveBeenNthCalledWith(2, {
			field: ''
		});
	});

	it('transforms input onBlur', async () => {
		render(
			<FormComponent
				type="text"
				onBlurTransform={(value) => `${value}-World`}
			/>
		);

		const textField = screen.getByLabelText('The Field');
		const submit = screen.getByText('Submit');

		await userEvent.clear(textField);
		await userEvent.type(textField, '123');

		await userEvent.click(submit);
		expect(onSubmit).toHaveBeenNthCalledWith(1, {
			field: '123-World'
		});
	});

	it('transforms input', async () => {
		render(
			<FormComponent
				type="text"
				transform={(value) => value.toUpperCase()}
			/>
		);

		const textField = screen.getByLabelText('The Field');
		await userEvent.type(textField, 'Hello World');

		await userEvent.click(screen.getByText('Submit'));
		expect(onSubmit).toHaveBeenCalledWith({
			field: 'HELLO WORLD'
		});
	});

	it('shows text area', () => {
		render(<FormComponent type="text" textArea />);

		const input = screen.getByLabelText('The Field');
		expect(input.tagName).toEqual('TEXTAREA');
		expect((input as HTMLTextAreaElement).rows).toEqual(5);
	});

	it('renders with id', () => {
		const { container: textContainer } = render(
			<FormComponent type="text" />
		);
		expect(textContainer).hasInputIds('field');

		const { container: textAreaContainer } = render(
			<FormComponent type="text" textArea />
		);
		expect(textAreaContainer).hasInputIds('field', 'textarea');

		const { container: numberContainer } = render(
			<FormComponent type="number" />
		);
		expect(numberContainer).hasInputIds('field');
	});
});
