"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
 

import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { getLoggedInUser, SignIn, signUp } from '@/lib/actions/user.actions'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  phone: z.string().optional()
})

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const router = useRouter()
  const[isLoading,setisLoading]=useState(false);
  const formSchema= authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    
    },
  })

  // 2. Define a submit handler.
  const onSubmit= async(data: z.infer<typeof formSchema>) =>
    {
 
    setisLoading(true);
    try{
        if(type==='sign-up'){
            const newUser=await signUp(data);
            setUser(newUser);
        }
        
        if(type==='sign-in'){
          const response=await SignIn({
            email:data.email,
            password:data.password,

          })
          if(response) router.push('/')
    }
   } catch(error){
console.log(error);
} finally {
    setisLoading(false);
}
   
  }

  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href='/' className='cursor-pointer flex items-center gap-1 px-4'>
          <Image src='/icons/logo.svg' width={34} height={34} alt='horizonlogo' />
          <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
        </Link>
        <div className='flex flex-col gap-1 md:gap-3'>
          {user ? 'Link Account' : type === 'sign-in' ? 'sign-in' : 'sign-up'}
          <p className='text-16 font-normal text-gray-600'>
            {user ? 'Link your account to get started' : 'Please enter your details'}
          </p>
        </div>
      </header>
      {user ? (
        <div className='flex flex-col gap-4'></div>
      ) : (
        <FormProvider {...form}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              {type==='sign-up' && (
                <>
                <div className='flex gap-4'>
              <CustomInput control={form.control} name='firstName' label='First Name' placeholder='Enter your First Name' />
              <CustomInput control={form.control} name='lastName' label='Last Name' placeholder='Enter your Last Name' />
              </div>
              
              <CustomInput control={form.control} name='address1' label='Address' placeholder='Enter your address' />
              <CustomInput control={form.control} name='city' label='city' placeholder='Enter your city' />
             
             <div className='flex gap-4'>
              <CustomInput control={form.control} name='state' label='State' placeholder='Example: NY' />
              <CustomInput control={form.control} name='postalCode' label='postal Code' placeholder='Example: 11101' />
              </div>
              <div className='flex gap-4'>
              <CustomInput control={form.control} name='dateOfBirth' label='Date of Birth' placeholder='YYYY-MM-DD' />
              <CustomInput control={form.control} name='ssn' label='SSN' placeholder='Example: 1234' />
              </div> 
                </>
              )}
              <CustomInput control={form.control} name='email' label='email' placeholder='Enter your email' />
              <CustomInput control={form.control} name='password' label='password' placeholder='Enter your password' />
            <div className='flex flex-col gap-4'>
            <Button type='submit' className='form-btn'>{isLoading ? (
                <>
              <Loader2 size={20} className='animate-spin'/> &nbsp;
              Loading..
              
              </>
              
            ) : type==='sign-in' ? 'Sign In':'Sign Up'}</Button>
   
            </div>
                    </form>
          </Form>
        </FormProvider>
     
      )}
      <footer className='flex justify-center gap-1'>
<p className='text-14 font-normal text-gray-600'>{type==='sign-in'?"Don't have an account?":"Already have an account?"}</p>
<Link href={type==='sign-in'?'/sign-up':'/sign-in'} className='form-link'>{type==='sign-in'?'Sign Up' :
'Sign In'}</Link>
      </footer>
    </section>
  )
}

export default AuthForm
