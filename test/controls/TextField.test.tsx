import React from 'react';
import { useForm } from 'react-hook-form';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextField from '../../src/controls/TextField';
import { FieldRules } from '../../src';

interface Form {
    field: string | number;
}

interface FormComponentProps {
    type: 'text' | 'number';
    rules?: FieldRules;
    transform?: (value: string) => any;
}

const onSubmit = jest.fn();

const FormComponent = (props: FormComponentProps) => {
    const defaultValue = props.type ? '' : 0;
    const { control, errors, handleSubmit } = useForm<Form>({
        mode: 'onBlur',
        reValidateMode: 'onChange',
        defaultValues: {
            field: defaultValue
        }
    });

    const doSubmit = (args: any) => {
        onSubmit(args);
    };

    return (
        <div>
            <form onSubmit={ handleSubmit(doSubmit) }>
                <TextField
                    id="field"
                    name="field"
                    control={ control }
                    label="The Field"
                    error={ errors.field }
                    type={ props.type }
                    rules={ props.rules }
                    transform={ props.transform }
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

describe('TextField', () => {
    it('accepts input for type text', async () => {
        await waitFor(() => render(
            <FormComponent
                type="text"
            />
        ));

        const textField = screen.getByLabelText('The Field');
        userEvent.type(textField, 'Hello World');

        await waitFor(() => userEvent.click(screen.getByText('Submit')));
        expect(onSubmit).toHaveBeenCalledWith({
            field: 'Hello World'
        });
    });

    it('accepts input for type number', async () => {
        await waitFor(() => render(
            <FormComponent
                type="number"
            />
        ));

        const textField = screen.getByLabelText('The Field');
        const submit = screen.getByText('Submit');

        userEvent.clear(textField);
        userEvent.type(textField, '12345');

        await waitFor(() => userEvent.click(submit));
        expect(onSubmit).toHaveBeenNthCalledWith(1, {
            field: 12345
        });

        userEvent.clear(textField);
        userEvent.type(textField, 'ABC');

        await waitFor(() => userEvent.click(submit));
        expect(onSubmit).toHaveBeenNthCalledWith(2, {
            field: ''
        });
    });

    it('transforms input', async () => {
        await waitFor(() => render(
            <FormComponent
                type="text"
                transform={ (value) => value.toUpperCase() }
            />
        ));

        const textField = screen.getByLabelText('The Field');
        userEvent.type(textField, 'Hello World');

        await waitFor(() => userEvent.click(screen.getByText('Submit')));
        expect(onSubmit).toHaveBeenCalledWith({
            field: 'HELLO WORLD'
        });
    });
});
