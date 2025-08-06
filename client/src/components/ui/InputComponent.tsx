import React, { forwardRef, InputHTMLAttributes } from 'react'

type InputProps =InputHTMLAttributes<HTMLInputElement>&{
    value?: string
    type?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    label?: string;
    className?: string
} 

function InputComponent({
    value,
    type = 'text',
    onChange,
    label,
    placeholder,
    className,
    ...rest
    
}: InputProps ,
ref: React.Ref<HTMLInputElement>) {
  return (
    <input
    type={type}
    ref={ref}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`focus:outline-none ${className} `}
    {...rest}
    />
  
  )
}
const Input = forwardRef(InputComponent)
Input.displayName = 'Input'


export default Input
