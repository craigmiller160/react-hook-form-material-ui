import React from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import MuiTextField from '@mui/material/TextField';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

type Transform = (value: string) => any;

interface Props<F extends FieldValues> {
    id?: string;
    name: FieldPath<F>;
    control: Control<F>;
    label: string;
    className?: string;
    rules?: Omit<RegisterOptions<F, FieldPath<F>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    type?: 'text' | 'number' | 'password';
    disabled?: boolean;
    transform?: Transform;
    placeholder?: string;
    multiline?: boolean;
    rows?: number;
    variant?: 'standard' | 'filled' | 'outlined';
    testId?: string;
}

const TextField = <F extends FieldValues>(props: Props<F>) => {
    const {
        id,
        name,
        control,
        className,
        label,
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
            render={ ({ field: { onChange, onBlur, value }, fieldState }) => (
                <MuiTextField
                    id={ id }
                    type={ type }
                    className={ className }
                    inputProps={ {
                        'data-testid': props.testId
                    } }
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
                    error={ !!fieldState.error }
                    helperText={ fieldState.error?.message ?? '' }
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
