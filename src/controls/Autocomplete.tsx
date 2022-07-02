import React from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import MuiAutocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import { SelectOption } from '../types/form';

interface Props<F extends FieldValues, R> {
    readonly id?: string;
    readonly name: FieldPath<F>;
    readonly control: Control<F>;
    readonly rules?: Omit<RegisterOptions<F, FieldPath<F>>, 'valueAsNumber' |
        'valueAsDate' | 'setValueAs' | 'disabled'>;
    readonly label: string;
    readonly options: ReadonlyArray<SelectOption<R>>;
    readonly className?: string;
    readonly disabled?: boolean;
}

const getOptionLabel = <R extends any>(option: string | SelectOption<R>) => {
    if (typeof option === 'string') {
        return option;
    }
    return (option as SelectOption<R>).label;
};

const Autocomplete = <F extends FieldValues, R extends any>(props: Props<F, R>) => {
    const {
        id,
        name,
        control,
        rules,
        label,
        options,
        className,
        disabled
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
                    isOptionEqualToValue={ (option, selected) => option.value === selected.value }
                    getOptionLabel={ getOptionLabel }
                    value={ field.value }
                    onChange={ (event, newValue) => field.onChange(newValue) }
                    onBlur={ field.onBlur }
                    disabled={ disabled }
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
