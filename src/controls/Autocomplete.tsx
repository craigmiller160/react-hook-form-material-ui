import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { FieldName } from 'react-hook-form/dist/types/fields';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { FieldRules, SelectOption } from '../types/form';

interface Props<R> {
    id?: string;
    name: string;
    control: Control;
    error?: FieldError;
    rules?: FieldRules;
    label: string;
    options: Array<SelectOption<R>>;
    className?: string;
}

const Autocomplete = <R extends any>(props: Props<R>) => {
    const {
        id,
        name,
        control,
        error,
        rules,
        label,
        options,
        className
    } = props;

    return (
        <Controller
            control={ control }
            name={ name }
            rules={ rules }
            render={ ({ onChange, onBlur, value }) => (
                <MuiAutocomplete
                    id={ id }
                    className={ className }
                    options={ options }
                    getOptionLabel={ (option) => option?.label ?? '' }
                    getOptionSelected={ (option, selected) => option.value === selected.value }
                    value={ value }
                    onChange={ (event, newValue) => onChange(newValue) }
                    onBlur={ onBlur }
                    renderInput={ (params) => (
                        <TextField
                            { ...params }
                            label={ label }
                            variant="outlined"
                            error={ !!error }
                            helperText={ error?.message ?? '' }
                        />
                    ) }
                />
            ) }
        />
    );
};

export default Autocomplete;
