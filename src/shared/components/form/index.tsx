
import React, { FC, CSSProperties, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import FormField from './field'
import type { IFormField } from './field'

import './index.scss'

interface FormProps {
	className?: string
	rowClassName?: string
  fields: IFormField[] | IFormField[][]
	values?: any
	onChange?: (field: any, value: any, selectOptionIndex?: number) => void
  onSubmit?: (data: any) => Promise<any>
	onClose?: () => void
	style?: CSSProperties
}

interface FieldErrorMessage {
	[key: string]: string
}

const CustomForm: FC<FormProps> = ({ className, rowClassName, fields, onChange, onSubmit = (async () => {}), values = {}, style = {} }: FormProps) => {
	const { control, handleSubmit, formState: { errors }, getValues, trigger } = useForm({
		defaultValues: values,
		mode: "onChange"
	})

	const errorMessagesByField: FieldErrorMessage = { } // Insert here desired field name for custom error message to the field
	const errorMessagesByErrorType: FieldErrorMessage = { 
		required: 'Field is required.', 
		min: 'Field value is less than minimun value',
		max: 'Field value is greater than maximun value',
	}
	
	const handleFormFieldChange = (field: string, value: any, selectOptionIndex?: number) => { 
		if(onChange) {
			onChange(field, value, selectOptionIndex)
			return
		}
	}

	const handleFieldSubmit = async (): Promise<void> => 
		trigger()
			.then(async (result: any) => {
				if (result && onSubmit)
					await onSubmit(getValues())
			})	
	
	const getFieldErrorMsg = (searchValue: string): string  => {
		if (!errors[searchValue]?.type)
			return ''

		return { ...errorMessagesByField, ...errorMessagesByErrorType }[searchValue]  || 'Campo inválido'
	}

	
	useEffect(() => {
		fields.forEach(field => {
			if (Array.isArray(field)) {
				field.forEach(field => { 
					if (field.name && field.rules?.select)
						field.rules = { validate: () => getValues(field.name!).length > 0 }
				})
				return
			}
			
			if (field.name && field.rules?.select)
				field.rules = { validate: () => getValues(field.name!).length > 0 }
		})
	})


	const generateField = (field: IFormField, key: number | string) => 
		<FormField 
			key={`${key}${field.name}`}
			field={field} 
			control={control}  
			error={getFieldErrorMsg(field.name!)} 	
			defaultValue={values[field.name!] || ''} 
			onChange={handleFormFieldChange}
			onSubmit={handleFieldSubmit}
			isSubmitEnabled={!Object.keys(errors).length}
	/>

	if (!fields.length)
		return null

  return <form
		className={className} 
		onSubmit={handleSubmit(onSubmit)} 
		style={style}
	>	
		{ fields.map((field: any, i) => 
			Array.isArray(field) ? 
				<div className={`form-row ${i} ${rowClassName || ''}`} key={i}>
					{ field.map(subField => 
						typeof subField !== 'string' ? generateField(subField, `${i}${subField.name}`) : <></>
					)}
				</div>
			: 
				generateField(field, i)
		)}
  </form>
}

export default CustomForm
