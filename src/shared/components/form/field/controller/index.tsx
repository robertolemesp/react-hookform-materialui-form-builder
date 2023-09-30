import React, { type FC, type CSSProperties } from 'react'
import { Control, Controller, FieldValues, FieldPath } from 'react-hook-form'

import type { FieldOptions, FieldRule } from '..'

import TextField from './text'
import SelectField from './select'
import CheckBoxField from './checkbox'
import RadioGroupField from './radio'


interface ControllerFieldProps {
  className?: string
  name: string
  type: 'text' | 'number' | 'date' | 'password' | 'select' | 'checkbox' | 'radioGroup'
  label: string
  disabled: boolean
  multiline: boolean
  multiple: boolean
  options: FieldOptions[]
  control?: Control<FieldValues, FieldPath<any>>
  defaultValue: any
  containerStyle: CSSProperties
  fieldStyle: CSSProperties
  formatFn: (value: any) => any
  onChange?: (field: string, value: any, selectOptionIndex?: number) => void
  rules: FieldRule | any
}

const ControllerField: FC<ControllerFieldProps> = (
  { 
    className, name, type, label, disabled, multiline, multiple, options, control,
    defaultValue, containerStyle, fieldStyle, formatFn, onChange, rules 
  }): JSX.Element => 
    <Controller
      name={name}
      control={control}
      defaultValue={formatFn ? formatFn(defaultValue) : defaultValue}
      rules={rules}
      render={({ field }) =>
        ['text', 'number', 'date', 'password'].includes(type) ? 
          <TextField 
            className={className}
            type={type}
            field={field}
            label={label}
            disabled={disabled}
            multiline={multiline}
            fieldStyle={fieldStyle}
            formatFn={formatFn}
          />

        : type === 'select' ? 
          <SelectField 
            className={className}
            label={label}
            field={field}
            multiple={multiple}
            onChange={onChange}
            defaultValue={defaultValue}
            disabled={disabled}
            fieldStyle={fieldStyle}
            options={options}
          />

        : type === 'checkbox' ?
          <CheckBoxField 
            className={className}
            containerStyle={containerStyle}
            field={field}
            fieldStyle={fieldStyle}
            disabled={disabled}
            label={label}
          />

        : type === 'radioGroup' && options?.length ?
          <RadioGroupField
            className={className} 
            label={label}
            field={field}
            fieldStyle={fieldStyle}
            options={options}
          />
        : <></> // Caso um tipo inexistente seja passado
      }
    />

export default ControllerField
