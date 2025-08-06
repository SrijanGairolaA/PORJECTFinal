'use client';
import Button from '@/components/ui/Button';
import { Form, FormContainer, FormFeild, FormInput, FormLabel, FormSubmit } from '@/components/ui/From';
import Input from '@/components/ui/InputComponent'
import { div } from 'motion/react-client';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';


type FormValues = {
  email: string
  password: string
}

function page() {

  const { register, handleSubmit} = useForm<FormValues>()

  
    
    const onSubmit: SubmitHandler<FormValues> = async(data)=>{
      try {
        const response  = await fetch('http://localhost:7000/api/user/login',{
          method: 'POST',
          headers:{
            'content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const result = await response.json()
        console.log("server response", result)
      } catch (error) {
        console.error('error connectin to baceknd ', error)
      }
      
    }


  return (
     <div className='bg- min-h-screen flex flex-col justify-center'>
      <div className='pt-2 '>
     <div className=' flex flex-col w-full max-w-md mx-auto items-center'>
      <div className='bg-amber-200 p-2 rounded-lg'>App Login</div>
      <div className='text-3xl'>Welcome!</div>
    </div>
      </div>

      <div className='bg-green-400  md:pb-7'>
      <FormContainer className='bg-white border border-gray-300 flex flex-col gap-3 w-full max-w-md mx-auto p-4 '>
      <Form onSubmit={handleSubmit(onSubmit)}>
         <FormFeild className='flex flex-col gap-2'>
         <FormLabel>
          Email Address
        </FormLabel>
        <FormInput
         {...register("email")}
          type="email"
        className='w-full border border-gray-400 rounded-lg p-2'
        />
       </FormFeild>
       <FormFeild className=' flex flex-col gap-2'>
         <FormLabel>
          Password
        </FormLabel>
        <FormInput
        {...register("password")}
        type="password"
        className='w-full border border-gray-400 rounded-lg p-2'
        />
       </FormFeild>
       <FormFeild>
        <div className='flex justify-between mt-3'>
            <div className='flex pl-2'>
              <FormInput type='checkbox' className='h-5 w-5'/>
              <div className='ml-2' >Remember me</div>
            </div>
            <div className='hover:text-blue-600 hover:underline'>Forget password?</div>
          </div>
       </FormFeild>
       <FormFeild>
        <FormSubmit  type='submit' className='text-white w-full'>
          Login
        </FormSubmit>
       </FormFeild>
       <FormFeild>
         <div className='relative mt-8'>
        <div className='absolute bg-white left-1/2 -top-3.5 '>or</div>
        <div className='w-full border-t border-gray-500'></div>
      </div>
       </FormFeild>
       <FormFeild>
        <div className='mt-8'>
        <div>
          <Button className='w-full bg-sky-800 text-white'>
          Sign up
          </Button></div>
          <div className='pl-2 mt-2 text-gray-500 hover:underline'>
            New user?
          </div>
          </div>
       </FormFeild>
      </Form>
      </FormContainer>

       </div>
   
     </div>
   
    
  )
}

export default page


{/* <div className='bg- min-h-screen flex flex-col justify-center'>
   <div className='pt-2 '>
     <div className=' flex flex-col w-full max-w-md mx-auto items-center'>
      <div className='bg-amber-200 p-2 rounded-lg'>App Login</div>
      <div className='text-3xl'>Welcome!</div>
    </div>
   </div>

   <div className='m-4  md:pb-7'>
    <div className='bg-white border border-gray-300 w-full max-w-md mx-auto p-4 '>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <div className='pl-3'>
          Email Address
        </div>
        <div className='mt-2'><Input
          type='text'
          {...register('email',{required: true})}
          placeholder='Enter your email'
          className='bg-white border focus:border-2 focus:border-blue-600 border-gray-300 w-full rounded-lg p-2'
          /></div>
        <div className='mt-3 pl-3'>
          Password
        </div>  
         <div className='mt-2 mb-3'><Input
          type='text'
          {...register('password',{required: true})}
          placeholder='Enter your password'
          className='bg-white border  focus:border-2 focus:border-blue-600 border-gray-300 w-full rounded-lg  p-2'
          /></div>
          <div className='flex justify-between mt-3'>
            <div className='flex pl-2'>
              <Input type='checkbox' className='h-5 w-5'/>
              <div className='ml-2' >Remember me</div>
            </div>
            <div className='hover:text-blue-600 hover:underline'>Forget password?</div>
          </div>
          <div className='mt-8'>
            <Button type='submit' className='w-full bg-sky-800 text-white'>
              Login
            </Button>
          </div>
      </form>
      <div className='relative mt-8'>
        <div className='absolute bg-white left-1/2 -top-3.5 '>or</div>
        <div className='w-full border-t border-gray-500'></div>
      </div>
      <div className='mt-8'>
        <div><Button className='w-full bg-sky-800 text-white'>
          Sign up
          </Button></div>
          <div className='pl-2 mt-2 text-gray-500 hover:underline'>
            New user?
          </div>
      </div>
    </div>
   </div>
     
   </div> */}