
import React, { FC, CSSProperties, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import FormField from './field/Field'
import type { IFormField } from './field/Field'

import { IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'

import './Form.scss'

interface FormProps {
	title?: string
  	fields: IFormField[] | IFormField[][]
	values?: any
	onChange?: (field: string, value: any) => void
  	onSubmit: (data: any) => void
	onClose?: () => void
	style?: CSSProperties
}

interface FieldErrorMessage {
	[key: string]: string
}

const CustomForm: FC<FormProps> = (props: FormProps) => {
	
	const { title, fields, onSubmit, onChange, onClose, values = {}, style = {} } = props

	const { control, handleSubmit, formState: { errors }, getValues, trigger } = useForm({
		defaultValues: values,
		mode: "onChange"
	})

	const errorMessagesByField: FieldErrorMessage = { username: 'Please provide a valid email' }
	const errorMessagesByErrorType: FieldErrorMessage = { required: 'This field is required.'}
	
	const handleFormFieldChange = (field: string, value: any) => { 
		if(onChange) {
			onChange(field, value)
			return
		}
	}

	const handleCloseButtonClick = (): void => { 
		if(onClose) 
			onClose()
	}

	const handleFieldSubmit = (): void => {
		trigger()
			.then(result => {
				if (result)
					onSubmit(getValues())
			})	
	}

	const getFieldErrorMsg = (searchValue: string): string  => {
		if (!errors[searchValue]?.type)
			return ''
	
		return { ...errorMessagesByField, ...errorMessagesByErrorType }[searchValue]  || 'Invalid Field'
	}

	useEffect(() => {
		console.log('values', values)
	}, [])

	useEffect(() => {
		fields.forEach(field => {
			if (Array.isArray(field)) {
				field.forEach(field => { 
					if (field.rules?.select)
						field.rules = { validate: () => getValues(field.name).length > 0 }
				})
				return
			}
			
			if (field.rules?.select)
				field.rules = { validate: () => getValues(field.name).length > 0 }
		})
	})

	if (!fields.length)
		return null

  return <form 
		className="flex flex-column" 
		onSubmit={handleSubmit(onSubmit)} 
		style={style}
	>	
		<div className='flex flex-row flex-wrap flex-center'>
			<h2>{ title }</h2>
			{ onClose && <IconButton onClick={handleCloseButtonClick}  style={{ marginLeft: 'auto' }}>
				<Close />
			</IconButton> }
		</div>
		{fields.map((field: any, i: number) => Array.isArray(field) ? 
			<div className="field-group">{ field.map(subField => 
				<FormField 
					key={i} 
					field={subField} 
					control={control}  
					error={getFieldErrorMsg(subField.name)} 	
					defaultValue={values[subField.name] || ''} 
					onChange={handleFormFieldChange}
				/>
			)}</div>
		:
			<FormField 
				key={i} 
				field={field} 
				control={control}  
				error={getFieldErrorMsg(field.name)}
				defaultValue={values[field.name] || ''} 
				onChange={handleFormFieldChange}
				onSubmit={handleFieldSubmit}
			/>)
			}
  </form>
}

export default CustomForm
