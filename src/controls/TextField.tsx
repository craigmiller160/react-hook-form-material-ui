import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import MuiTextField from '@material-ui/core/TextField';
import { FieldRules } from '../types/form';

type Transform = (value: string) => any;

interface Props {
    id?: string;
    name: string;
    control: Control;
    label: string;
    className?: string;
    error?: FieldError;
    rules?: FieldRules;
    type?: 'text' | 'number' | 'password';
    disabled?: boolean;
    transform?: Transform;
    placeholder?: string;
    multiline?: boolean;
    rows?: number;
    variant?: 'standard' | 'filled' | 'outlined';
}

const TextField = (props: Props) => {
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
        placeholder,
        multiline,
        rows,
        variant
    } = props;

    let actualTransform: Transform | undefined = transform;
    if (type === 'number' && transform === undefined) {
        actualTransform = (value) => (value ? parseInt(value, 10) : '');
    }

    return (
        <Controller
            control={ control }
            name={ name }
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
                    multiline={ multiline }
                    rows={ rows }
                    variant={ variant }
                />
            ) }
        />
    );
};

export default TextField;
