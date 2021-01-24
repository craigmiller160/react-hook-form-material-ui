import { Validate, ValidationRule, ValidationValueMessage } from 'react-hook-form/dist/types/validator';
import { ReactText } from 'react';

export interface FieldRules {
    required?: string | boolean | ValidationValueMessage<boolean>;
    min?: ValidationRule<ReactText>;
    max?: ValidationRule<ReactText>;
    maxLength?: ValidationRule<ReactText>;
    minLength?: ValidationRule<ReactText>;
    pattern?: ValidationRule<RegExp>;
    validate?: Validate | Record<string, Validate>;
}

export interface SelectOption<R> {
    label: string;
    value: R;
}
