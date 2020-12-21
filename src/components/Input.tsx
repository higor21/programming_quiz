import React, {InputHTMLAttributes} from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  
}

const Input:React.FC<Props> = ({ ...inputProps }) => {
  return (
    <input {...inputProps} />
  )
}

export default Input
