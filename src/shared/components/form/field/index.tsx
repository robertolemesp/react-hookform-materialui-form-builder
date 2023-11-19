import React, { type FC, type CSSProperties } from 'react'
import type { Control, FieldValues, FieldPath } from 'react-hook-form'

import ControllerField from './controller'
import SubmitField from './submit'

import './index.scss'

export interface FieldRule {
	required: boolean
	validationFunctions: ((...args: any[]) => boolean)[]
}

export interface FieldOptions {
	label: string
	value: any
}

export type FormFielType = 'text' | 'number' | 'date' | 'time' | 'password' | 'select' | 'checkbox' | 'radioGroup' | 'submit' | 'element'

export interface IFormField {
	className?: string
	name?: string
	type: FormFielType
	label?: string
	disabled?: boolean
	checked?: boolean
	selected?: boolean
	options?: FieldOptions[]
	multiple?: boolean
	multiline?: boolean
	formatFn?: (value: any) => any
	rules?: FieldRule | any
	element?: JSX.Element
	style?: CSSProperties
}

interface FormFieldProps {
	defaultValue?: any
	field: IFormField | any
	containerStyle?: CSSProperties
	error?: string
	control?: Control<FieldValues, FieldPath<any>>
	isSubmitEnabled?: boolean
	onChange?: (field: string, value: any, selectOptionIndex?: number) => void
	onSubmit?: () => Promise<any>
}

const FormField: FC<FormFieldProps> = ({
	field: {
		className = '', 
		name = '', 
		label = '', 
		type,
		disabled = false, 
		multiple = false, 
		multiline = false,
		options = [],
		rules,
		element,
		containerStyle,
		formatFn,
		style: fieldStyle
	}, 
	control, 
	defaultValue, 
	onChange,
	error,
	isSubmitEnabled = true,
	onSubmit
}: FormFieldProps) => {
	
	return <div 
		className={`field ${type}`}
		style={containerStyle}
	>
		{ type === 'element' ? 
			element

		: type === 'submit' ? 
			<SubmitField
				className={className} 
				label={label}
				isSubmitEnabled={isSubmitEnabled}
				onSubmit={onSubmit}
				fieldStyle={fieldStyle}
			/>
		: 
 			<ControllerField
			 	className={className} 
				name={name}
				type={type}
				label={label}
				disabled={disabled}
				multiline={multiline}
				multiple={multiple}
				options={options}
				control={control}
				defaultValue={defaultValue}
				containerStyle={containerStyle}
				fieldStyle={fieldStyle}
				formatFn={formatFn}
				onChange={onChange}
				rules={rules}
			/>
		}
		<small>{ error || null }</small>
	</div>
}

export default FormField
