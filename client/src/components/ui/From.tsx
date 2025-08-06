import * as React from 'react'
import { cn } from '@/lib/utils'
import Input from './InputComponent'
import Button from './Button'
import { div } from 'motion/react-client'

type FromInputProps = React.ComponentPropsWithoutRef<typeof Input>

type FormButtonProps = React.ComponentProps<typeof Button>

const FormContainer = ({className, ...props}: React.ComponentProps<'div'>)=>{
    return (
        <div
        className={cn("",className)}
        {...props}
        />
    )

}

const Form = React.forwardRef<HTMLFormElement, React.ComponentProps<"form">>(
    ({className, ...props}, ref)=>{

        return (
            <form
            ref={ref}
            className={cn("", className)}
            {...props}
            />
        )

    }
)

const FormFeild = ({className, ...props}: React.ComponentProps<"div">)=>{
    return (
        <div className={cn("",className)} {...props}/>
    )

}

const FormLabel = ({className, ...props}: React.ComponentProps<"label">)=>{
    return (
        <label className={cn("",className)} {...props}/>
    )
}

const FormInput = ({className, ...props}: FromInputProps )=>{
    return (
        <Input
        className={cn('', className)}
        {...props}
        />
    )
}

const FormMessage = ({className, ...props}: React.ComponentProps<"p">)=>{
   return (
    <p className={cn("text-destructive text-sm", className)} {...props}/>
   )
}

const FormDescription = ({className, ...props}: React.ComponentProps<"p">)=>{
    return (
        <p className={cn("", className)} {...props}/>
    )
}

const FormSubmit = ({className, ...props}: FormButtonProps)=>{
   return (
    <Button
     className={cn("", className)}
     {...props}
    />
   )
}

export { 
    FormContainer,
    Form,
    FormFeild,
    FormLabel,
    FormInput,
    FormMessage,
    FormDescription,
    FormSubmit
}