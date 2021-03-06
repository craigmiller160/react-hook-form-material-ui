import React from 'react';
import { Control, Controller } from 'react-hook-form';
import MuiSwitch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

interface Props {
    id?: string;
    name: string;
    control: Control;
    label: string;
    color?: 'primary' | 'secondary' | 'default';
    className?: string;
}

const Switch = (props: Props) => {
    const {
        id,
        className,
        name,
        control,
        color,
        label
    } = props;

    const labelClassName = `${className ?? ''} switch-label`;

    return (
        <Controller
            control={ control }
            name={ name }
            render={ ({ onChange, onBlur, value }) => (
                <FormControlLabel
                    className={ labelClassName }
                    label={ label }
                    control={ (
                        <MuiSwitch
                            id={ id }
                            classes={ {
                                input: `switch-${value}`
                            } }
                            onChange={ (event) => onChange(event.target.checked) }
                            onBlur={ onBlur }
                            checked={ value }
                            color={ color ?? 'primary' }
                        />
                    ) }
                />
            ) }
        />
    );
};

export default Switch;
