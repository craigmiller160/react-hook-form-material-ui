import React from 'react';
import { useForm } from 'react-hook-form';
import Switch from '../../src/controls/Switch';

interface Form {
    field: boolean;
}

const onSubmit = jest.fn();

const FormComponent = () => {
    const { control, handleSubmit } = useForm<Form>({
        mode: 'onBlur',
        reValidateMode: 'onChange',
        defaultValues: {
            field: false
        }
    });

    return (
        <div>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Switch
                    name="field"
                    control={ control }
                    label="The Field"
                />
            </form>
        </div>
    );
};

describe('Switch', () => {
    it('works', () => {
        throw new Error();
    });
});