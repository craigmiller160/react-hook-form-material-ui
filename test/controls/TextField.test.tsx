import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '../../src/controls/TextField';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

interface Form {
    field: string | number;
}

interface FormComponentProps {
    type: 'text' | 'number';
}

const onSubmit = jest.fn();

const FormComponent = (props: FormComponentProps) => {
    const defaultValue = props.type ? '' : 0;
    const { control, errors, handleSubmit, formState, getValues } = useForm<Form>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            field: defaultValue
        }
    });

    console.log(formState); // TODO delete this

    return (
        <div>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <TextField
                    id="field"
                    name="field"
                    control={ control }
                    label="The Field"
                    error={ errors.field }
                    type={ props.type }
                />
                <button type="submit">Submit</button>
                <p>Current Value: { getValues().field }</p>
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
        screen.debug(); // TODO delete this
    });

    it('accepts input for type number', () => {
        throw new Error();
    })

    it('displays error message for validation rules', () => {
        throw new Error();
    });

    it('transforms input', () => {
        throw new Error();
    });

    it('is disabled', () => {
        throw new Error();
    });
});