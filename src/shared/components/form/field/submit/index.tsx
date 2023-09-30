import React, { type FC, type CSSProperties, useState } from 'react'

import Button from '../../../button'

interface SubmitFieldProps {
  className?: string
  label: string
  isSubmitEnabled: boolean
  onSubmit?: () => Promise<any>
  fieldStyle?: CSSProperties
}

const SubmitField: FC<SubmitFieldProps> = ({ className,label, isSubmitEnabled, onSubmit, fieldStyle}): JSX.Element => {
  const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false)

	const handleSubmitButtonClick = async () => {
		if (onSubmit) {
			setIsSubmitting(true)
			await onSubmit()
			setIsSubmitting(false)
		}
	}
	
  return <Button
    className={className}
    style={{ 
      background: isSubmitEnabled ? 'black' : 'gray',
      width: '100%',
      ...fieldStyle
    }} 
    onClick={handleSubmitButtonClick}
    disabled={!isSubmitEnabled || isSubmitting}
    loading={isSubmitting}
  >
    { label }
  </Button>	
}

export default SubmitField
