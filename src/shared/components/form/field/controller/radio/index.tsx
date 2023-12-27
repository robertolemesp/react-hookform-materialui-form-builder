import React, { type FC, type CSSProperties } from 'react'
import type { FieldValues, ControllerRenderProps, FieldPath } from 'react-hook-form'

import type { FieldOptions } from '../../index'

import { RadioGroup, FormControlLabel, Radio } from '@mui/material'

interface RadioGroupFieldProps {
  className?: string
  label: string
  row?: boolean
  field: ControllerRenderProps<FieldValues, FieldPath<any>>
  fieldStyle: CSSProperties
  options: FieldOptions[]
}

const RadioGroupField: FC<RadioGroupFieldProps> = ({ className, label, row, field, fieldStyle, options }): JSX.Element => 
  <div>
    <label>{label}</label>
    <RadioGroup 
      className={className}
      style={fieldStyle} 
      row={row}
      {...field}
    >
      { options.map((option: FieldOptions, i: number) => 
          <FormControlLabel 
            key={i} 
            label={option.label} 
            value={option.value} 
            control={<Radio />} 
          />
        )
      }
    </RadioGroup>
  </div>

export default RadioGroupField
