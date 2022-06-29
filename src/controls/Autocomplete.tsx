import React from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import MuiAutocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { SelectOption } from '../types/form';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

interface Props<R> {
    id?: string;
    name: string;
    control: Control;
    rules?: Omit<RegisterOptions<FieldValues, FieldPath<FieldValues>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    label: string;
    options: Array<SelectOption<R>>;
    className?: string;
}

const Autocomplete = <R extends any>(props: Props<R>) => {
    const {
        id,
        name,
        control,
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
            render={ ({ field, fieldState }) => (
                <MuiAutocomplete
                    id={ id }
                    className={ className }
                    options={ options }
                    getOptionLabel={ (option) => option?.label ?? '' }
                    // getOptionSelected={ (option, selected) => option.value === selected.value }
                    value={ field.value }
                    onChange={ (event, newValue) => field.onChange(newValue) }
                    onBlur={ field.onBlur }
                    renderInput={ (params) => (
                        <TextField
                            { ...params }
                            label={ label }
                            variant="outlined"
                            error={ !!fieldState.error }
                            helperText={ fieldState.error?.message ?? '' }
                        />
                    ) }
                />
            ) }
        />
    );
};

export default Autocomplete;
