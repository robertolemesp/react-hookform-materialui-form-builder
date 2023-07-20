
import React, { FC, CSSProperties, ReactNode } from 'react'
import { Button as MUIButton } from '@mui/material'
import Loader from '../loader/Loader'


import './Button.scss'

interface ButtonProps {
  className?: string
  children?: ReactNode
  onClick: () => void
  style?: CSSProperties
  type?: string
  disabled?: boolean
  loading?: boolean
}

const Button: FC<ButtonProps> = ({ children, onClick, type, disabled, loading, style }: ButtonProps): JSX.Element => 
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
    { loading ? 
      <Loader 
        width={27} 
        height={27}
        containerStyle={{ marginTop: 5 }} 
      /> 
    : 
      children }
  </MUIButton>

export default Button