import React, { FC, useEffect, useState } from 'react'

import { Control, Controller, FieldValues } from 'react-hook-form'

import Button from '../../button/Button'
import { TextField, Select, Checkbox, Radio, RadioGroup, FormControlLabel, MenuItem, Box, Chip, OutlinedInput } from '@mui/material'
import { Cancel } from '@mui/icons-material'

import './Field.scss'

interface FieldOptions {
	label: string
	value: any
}

interface FieldRule {
	required: boolean
	validationFunctions: ((...args: any[]) => boolean)[]
}

interface FieldError {
	[field: string]: string
}
export interface IFormField {
	name: string
	type: 'text' | 'number' | 'password' | 'select' | 'checkbox' | 'radioGroup' | 'submit'
	label: string
	checked?: boolean
	selected?: boolean
	options?: FieldOptions[]
	chips?: boolean
	rules?: FieldRule | any
}

interface FormFieldProps {
	defaultValue?: any
	field: IFormField | any
	error?: string
	control?: Control<FieldValues, any>
	onChange?: (field: string, value: any) => void
	onSubmit?: () => void
}

const FormField: FC<FormFieldProps> = (props: FormFieldProps) => {
	const handleSubmitButtonClick = () => props.onSubmit!()
	
	const { 'field': { name, label, type, chips = false, options, rules }, control, defaultValue, onChange, error } = props
	const [ selectValues , setSelectValues ] = useState<any>(defaultValue)

	const handleSelectFieldDelete = (field: string, value: any) => {
		setSelectValues(selectValues.filter((selectedValue: string) => selectedValue !== value))
		if(onChange)
			onChange(field, value)
	}

	const handleSelectOptionClick = (field: string, value: string) => {
		const foundValueIndex = selectValues.findIndex((v: string) => v === value)
		if (foundValueIndex === -1) {
			setSelectValues([ ...selectValues, value ])
			return
		}

		setSelectValues(selectValues.filter((selectedValue: string) => selectedValue !== value))

		if (onChange)
			onChange(field, value)
	}

	
	const generateSelect = (field: any) => {
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
		
		return <>
			<label>{ label }</label>
			<Box sx={{ 
				display: 'flex', 
				flexWrap: 'wrap', 
				gap: 0.5, 
				marginBottom: 1.5,
				p: 1,
				border: 1,
				borderColor: 'grey.500',
				borderRadius: 3
			}}>
				{ selectValues.map((value: any, i: number) => 
					<Chip 
						key={i} 
						label={value} 
						deleteIcon={<Cancel onMouseDown={e => e.stopPropagation()} />}  
						onDelete={() => handleSelectFieldDelete(field.name, value)}
					/>
				)}
			</Box>
			<Select 
				{...field}
				{...(chips && { 
					input: <OutlinedInput id='select-multiple-chip' label='Chip' />,
					value: selectValues
				}) }
				label="a"
				style={{ width: '100%' }}
				multiple={chips}
				MenuProps={SelectMenuOptions}
				//onChange={(e: SelectChangeEvent<any>) => handleSelectFieldChange(field.name, e.target.value)}
			> 
				{ options.map((option: FieldOptions, i: number) => 
					<MenuItem 
						key={i} 
						value={option.value.toString()} 
						onClick={() => handleSelectOptionClick(field.name, option.value.toString())}
					>
						{option.label}
					</MenuItem>) 
				}
			</Select>
		</>
	}
	
	return <div className='field' style={{ marginTop: type !== 'submit' ? 25 : 'auto' }}>
		{ type === 'submit' ? 
			<Button 
				style={{ 
					width: '100%', 
					height: 45, 
					background: 'black', 
					color: 'white',
					margin: '40px auto 15px'
				}} 
				onClick={handleSubmitButtonClick}
			>
				{ label }
			</Button>	
			:
 			<Controller
				name={name}
				control={control}
				defaultValue={defaultValue}
				rules={rules}
				render={({ field }) =>
					['text', 'number', 'password'].includes(type) ? 
						<TextField 
							type={type}
							style={{ minHeight: 60, width: '100%' }}
							label={label}
							{...field}
						/>

					: type === 'select' ? 
						generateSelect(field)

					: type === 'checkbox' ?
						<>
							<label>{ label }</label>
							<Checkbox 
								onChange={(e) => field.onChange(e.target.checked)}
								checked={!!field.value}
							/>
						</>

					: type === 'radioGroup' && options?.length ?
						<RadioGroup aria-label={label} {...field}>
							{ options.map((option: FieldOptions, i: number) => <FormControlLabel key={i} label={option.label} value={option.value} control={<Radio />} />) }
						</RadioGroup>

					: <></>
				}
			/>
		}
		<small>{ error || null }</small>
	</div>
}

export default FormField
