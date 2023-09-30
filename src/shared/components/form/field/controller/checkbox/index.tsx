
import React, { type FC, type CSSProperties } from 'react'
import type { FieldValues, ControllerRenderProps, FieldPath } from 'react-hook-form'

import { Checkbox } from '@mui/material'

interface CheckBoxFieldProps {
  className?: string
  containerStyle?: CSSProperties
  fieldStyle?: CSSProperties
  field: ControllerRenderProps<FieldValues, FieldPath<any>>
  disabled?: boolean
  label: string
}

const CheckBoxField: FC<CheckBoxFieldProps> = ({ className, containerStyle, field, fieldStyle, disabled, label }): JSX.Element => 
  <div style={containerStyle}>
    <Checkbox 
      className={className}
      onChange={(e) => field.onChange(e.target.checked)}
      checked={!!field.value}
      style={fieldStyle}
      disabled={disabled}
    />
    <label>{ label }</label>
  </div>

export default CheckBoxField
