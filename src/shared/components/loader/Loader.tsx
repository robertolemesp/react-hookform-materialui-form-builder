
import React, { CSSProperties } from 'react'
import RLoader from 'react-loader-spinner'

interface LoaderProps {
  height?: number
  width?: number
  color?: string
  containerStyle?: CSSProperties
}

const Loader = ({ height = 100, width = 100, color = 'white', containerStyle }: LoaderProps) => 
  <div style={containerStyle}>
    <RLoader
      type='TailSpin'
      color={color}
      height={height}
      width={width}
    />
  </div>
  
export default Loader
