import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import MuiTextField from '@material-ui/core/TextField';
import { FieldName } from 'react-hook-form/dist/types/form';
import { FieldRules } from '../types/form';

type Transform = (value: string) => any;

interface Props<T> {
    id?: string;
    name: keyof T;
    control: Control<T>;
    label: string;
    className?: string;
    error?: FieldError;
    rules?: FieldRules;
    type?: 'text' | 'number' | 'password';
    disabled?: boolean;
    transform?: Transform;
    placeholder?: string;
}

const TextField = <T extends object>(props: Props<T>) => {
    const {
        id,
        name,
        control,
        className,
        label,
        error,
        rules,
        type,
        disabled,
        transform,
        placeholder
    } = props;

    let actualTransform: Transform | undefined = transform;
    if (type === 'number' && transform === undefined) {
        actualTransform = (value) => (value ? parseInt(value, 10) : '');
    }

    return (
        <Controller
            control={ control }
            name={ name as FieldName<T> }
            rules={ rules }
            render={ ({ onChange, onBlur, value }) => (
                <MuiTextField
                    id={ id }
                    type={ type }
                    className={ className }
                    label={ label }
                    placeholder={ placeholder }
                    onChange={ (event) => {
                        if (actualTransform) {
                            onChange(actualTransform(event.target.value));
                        } else {
                            onChange(event.target.value);
                        }
                    } }
                    onBlur={ onBlur }
                    value={ value }
                    error={ !!error }
                    helperText={ error?.message ?? '' }
                    disabled={ disabled }
                />
            ) }
        />
    );
};

export default TextField;
