import React, { type ChangeEvent, type CSSProperties, type ReactNode } from 'react'
import type { FieldValues, ControllerRenderProps, FieldPath } from 'react-hook-form'
import { Input, InputLabel } from '@mui/material'

interface FileFieldProps {
  label: string
  field: ControllerRenderProps<FieldValues, FieldPath<any>>
  disabled?: boolean
  containerStyle?: CSSProperties
  fieldStyle?: CSSProperties
  onFileSelect: (file: File | null) => void
  children?: ReactNode
}

const FileField: React.FC<FileFieldProps> = (
  { label, field, disabled, containerStyle, 
    fieldStyle, onFileSelect, children }
  ): JSX.Element => {

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    
    if (onFileSelect) 
      onFileSelect(file)
  }

  return <div>
    <InputLabel htmlFor='file-input'>{ label }</InputLabel>
    <Input
      id='file-input'
      type='file'
      style={containerStyle}
      inputProps={{ style: { marginBottom: 10, ...fieldStyle }}}
      disabled={disabled}
      { ...field }
      value={field.value?.fileName}
      onChange={handleFileChange}
    />
    { children }
  </div>
}

export default FileField
