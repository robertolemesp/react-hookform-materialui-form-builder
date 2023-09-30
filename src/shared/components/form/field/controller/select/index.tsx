import React, { type FC, type CSSProperties, useState } from 'react'
import { Box, Chip, MenuItem, OutlinedInput, Select } from '@mui/material'
import { Cancel } from '@mui/icons-material'

import type { FieldValues, ControllerRenderProps, FieldPath } from 'react-hook-form'
import { type FieldOptions } from '../..'

interface SelectFieldProps {
  className?: string
  label: string
  field: ControllerRenderProps<FieldValues, FieldPath<any>>
  multiple?: boolean
  defaultValue?: []
  onChange?: (field: string, value: any, selectOptionIndex?: number) => void
  disabled?: boolean
  fieldStyle?: CSSProperties
  options: FieldOptions[]
}

const SelectField: FC<SelectFieldProps> = (
  { className, label, field, multiple, defaultValue, onChange, disabled, fieldStyle, options }
  ): JSX.Element => {
  const [ selectValue, setSelectValue ] = useState<any>(Array.isArray(defaultValue) ? defaultValue : [])
  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const SelectMenuOptions = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    }
  }

  const handleSelectFieldDelete = (field: string, value: any) => {
		setSelectValue(selectValue.filter((selectedValue: string) => selectedValue !== value))
		if(onChange)
			onChange(field, value)
	}

	const handleSelectOptionClick = (field: string, value: string, optionIndex: number) => {
		if (multiple) {
			const foundValueIndex = selectValue.findIndex((v: string) => v === value)
			if (foundValueIndex === -1) {
				setSelectValue([ ...selectValue, value ])
				return
			}

			setSelectValue(selectValue.filter((selectedValue: string) => selectedValue !== value))
		}

		if (!multiple) 
			setSelectValue(value)

		if (onChange) 
			onChange(field, value, optionIndex)
	}
  
  return <>
    <label style={{ marginBottom: 5 }}>{ label }</label>
    { selectValue.length > 0 && multiple && <Box sx={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 0.5,
      marginBottom: 1.5,
      p: 1,
      border: 1,
      borderColor: 'grey.500',
      borderRadius: 3
    }}>
      { selectValue.map((value: any, i: number) => 
        <Chip 
          key={i} 
          label={value} 
          deleteIcon={<Cancel onMouseDown={e => e.stopPropagation()} />}  
          onDelete={() => handleSelectFieldDelete(field.name, value)}
        />
      )}
    </Box>}
    <Select
      className={className}
      {...field}
      {...(multiple && { 
        input: <OutlinedInput id='select-multiple-chip' label='Chip' />,
        value: selectValue
      }) }
      style={{ width: '100%', ...fieldStyle }}
      multiple={multiple}
      MenuProps={SelectMenuOptions}
      disabled={disabled}
      //onChange={(e: SelectChangeEvent<any>) => handleSelectFieldChange(field.name, e.target.value)}
    > 
      { options.map((option: FieldOptions, i: number) => 
        <MenuItem 
          key={i} 
          value={option.value.toString()} 
          onClick={() => handleSelectOptionClick(field.name, option.value.toString(), i)}
        >
          {option.label}
        </MenuItem>) 
      }
    </Select>
  </>
}

export default SelectField