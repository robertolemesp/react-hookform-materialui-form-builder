import React, { type FC, type CSSProperties, type KeyboardEvent, useState } from 'react'
import { IconButton, TextField as MUITextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import type { FieldValues, ControllerRenderProps, FieldPath } from 'react-hook-form'

import type { FormFielType } from '../../index'

interface TextFieldProps {
  className?: string
  type: Partial<FormFielType>
  field: ControllerRenderProps<FieldValues, FieldPath<any>>
  label: string
  disabled?: boolean
  multiline?: boolean
  fieldStyle?: CSSProperties
  formatFn?: (value: any) => any
}

const TextField: FC<TextFieldProps> = ({ className, type, field, label, disabled, multiline, fieldStyle, formatFn }): JSX.Element => {
  const [ isPasswordExplicit, setIsPasswordExplicit ] = useState<boolean>(false)

  const isPasswordField: boolean = type === 'password'

	const handlePasswordExplicityIconClick = () => setIsPasswordExplicit(!isPasswordExplicit)

  const handleOnFieldKeyDown = (event: KeyboardEvent<HTMLInputElement>, type: Partial<FormFielType>) => {
    if (
      type === 'number' &&
      !(event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Backspace' || /^[0-9]+$/.test(event.key))
    ) 
      event.preventDefault()
  } 

  return <MUITextField
    className={className}
    type={isPasswordField && isPasswordExplicit ? 'text' : type }
    { ...isPasswordField && { 
      InputProps: { 
        style: { resize: 'both' },
        endAdornment: <IconButton onClick={handlePasswordExplicityIconClick} color='primary'> 
          { isPasswordExplicit ? <Visibility /> : <VisibilityOff /> }
        </IconButton>
      }
    }}
    label={label}
    disabled={disabled}
    multiline={multiline}
    onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => handleOnFieldKeyDown(event, type)}
    style={{ 
      minHeight: 54,
      width: '100%', 
      ...fieldStyle 
    }}
    { ...(type === 'date' && { InputLabelProps: { shrink: true } }) }
    { ...{ 
        ...field, 
        value: formatFn ? formatFn(field.value) : field.value,
        onChange: event => field.onChange(type === 'number' ? parseInt(event.target.value, 10) : event.target.value)
      }
    }
  />
}

export default TextField
