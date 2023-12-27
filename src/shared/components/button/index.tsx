
import React, { FC, CSSProperties, ReactNode } from 'react'
import { CircularProgress, Button as MUIButton } from '@mui/material'

interface ButtonProps {
  children?: ReactNode
  className?: string
  onClick?: () => void
  style?: CSSProperties
  disabled?: boolean
  loading?: boolean
}

const Button: FC<ButtonProps> = ({ children, onClick, className, disabled, loading, style }: ButtonProps): JSX.Element => 
  <MUIButton
    className={className}
    style={{ 
      background: 'black',
      color: 'white',
      boxShadow: '1px 1px 4px gray',
      borderRadius: 5,
      ...style 
    }} 
    onClick={onClick} 
    disabled={disabled}
  >
    { loading ? <CircularProgress size={30} style={{ color: 'white' }} /> : children }
  </MUIButton>

export default Button