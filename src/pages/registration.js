import React, { useState } from 'react'
import logodark from '../../images/logodark.png'
import Image from 'next/legacy/image'
import { MdArrowRight } from 'react-icons/md';
import { useRouter } from 'next/router'
import axios, { Axios } from 'axios';
import AuthGuard from '@/components/AuthGuard';
import { ScaleLoader } from 'react-spinners';

const Registration = () => {
    const router = useRouter()

    const imageRoute = process.env.NEXT_PUBLIC_IMAGE_ROUTE;
    const baseApiRoute = process.env.NEXT_PUBLIC_BASE_API_URL;

    const [name, setname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false); 

    // Error message starts here
    const [errname, setErrname] = useState('')
    const [errEmail, setErrEmail] = useState('')
    const [errPassword, setErrPassword] = useState('')
    const [errCPassword, setErrCPassword] = useState('')
    const [registrationError, setRegistrationError] = useState('');
    

    // Handle function starts here
    const handleName = (e) => {
        setname(e.target.value)
        setErrname('')
    }
    
    const handleEmail = (e) => {
        setEmail(e.target.value)
        setErrEmail('')
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
        setErrPassword('')
    }

    const handleCPassword = (e) => {
        setCPassword(e.target.value)
        setErrCPassword('')
    }
    
    // Email validation
    const emailValidation = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)
    }


    // Submit button 
    async function handleRegistration (e) {
        e.preventDefault()
        if(!name) {
            setErrname('Enter your name')
        }

        if(!email) {
            setErrEmail('Enter your email')
        } else if(!emailValidation(email)) {
            setErrEmail('Enter a valid email')
        }

        if(!password) {
            setErrPassword('Enter your password')
        } else if(password.length < 6) {
            setErrPassword('Passwords must be at least 6 characters.')
        }

        if(!cPassword) {
            setErrCPassword('Confirm your password')
        } else if(cPassword !== password) {
            setErrCPassword('Password not matched')
        }

        // if (errname || errEmail || errPassword || errCPassword) {
        //     return;
        // }

            const formdata = new FormData()
            formdata.append('name', name)
            formdata.append('email', email)
            formdata.append('password', password)

            
        if(name && email && emailValidation(email) && password  && password.length >=6 && cPassword && cPassword === password) {
            setIsLoading(true);
            setRegistrationError('')   
            setErrname('') 
            setErrEmail('')
            setErrPassword('')
            setErrCPassword('')
            try {
                const response = await axios.post(`${baseApiRoute}/registration`, formdata)
                if(response.status === 200) {
                    setIsLoading(true)
                    // console.log(response)
                    router.push('/signin')
                } else {
                    setRegistrationError('shit')
                }
            } 
            catch(error) {
                // window.alert ('Error during registration:', error);
                setRegistrationError(error.response.data.error);
                // console.log(error.response.data.error)
            } finally {
                setIsLoading(false); // Set isLoading to false after processing is complete
            }
        }
    }
    


  return (
    <AuthGuard>
            <div className='w-full bg-gray-100 min-h-screen pb-10'>
                <form className='w-[370px] mx-auto flex flex-col items-center'>
                    <div onClick={() => router.push('/')} className='my-5 cursor-pointer'>
                        <Image 
                            src={logodark}
                            width={150}
                            height={40}
                            objectFit='contain'
                        />    
                    </div>
                    
                    <div className='w-full border border-zinc-200 p-6'>
                        <h2 className='font-medium text-3xl mb-4'>Create Account</h2>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <p className='font-medium pb-1'>Your name</p>
                                <input 
                                    onChange={handleName} 
                                    value={name}
                                    type="text" 
                                    placeholder='First name and last name' 
                                    className='border font-medium rounded-sm placeholder:font-normal placeholder:normal-case border-gray-400 px-2 py-1 w-full outline-none focus:drop-shadow-md'
                                />
                                {errname && (
                                    <p className='text-red-500 text-sm font-semibold pt-1'>
                                        <span className='italic mr-1'>!</span> 
                                        {errname}
                                    </p>
                                )}
                            </div>
                            <div>
                                <p className='font-medium pb-1'>Email or mobile phone number</p>
                                <input 
                                    onChange={handleEmail}
                                    value={email}
                                    type="email" 
                                    className='border font-medium lowercase rounded-sm border-gray-400 px-2 py-1 w-full outline-none focus:drop-shadow-md'
                                />
                                {errEmail && (
                                    <p className='text-red-500 text-sm font-semibold pt-1'>
                                        <span className='italic mr-1'>!</span> 
                                        {errEmail}
                                    </p>
                                )}
                                {registrationError && (
                                    <div>
                                        {errname || errEmail || errPassword || errCPassword ? (
                                            null
                                        ) : <p className='text-red-500 text-sm font-semibold pt-1'>
                                        <span className='italic mr-1'>!</span> {registrationError}
                                            </p>}
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className='font-medium pb-1'>Password</p>
                                <input
                                    onChange={handlePassword}
                                    value={password}
                                    type="password"
                                    placeholder='At least 6 characters.'
                                    className='border rounded-sm placeholder:normal-case border-gray-400 px-2 py-1 w-full outline-none focus:drop-shadow-md' 
                                />
                                {errPassword && (
                                    <p className='text-red-500 text-sm font-semibold pt-1'>
                                        <span className='italic mr-1'>!</span> 
                                        {errPassword}
                                    </p>
                                )}
                            </div>
                            <div>
                                <p className='font-medium pb-1'>Re-enter Password</p>
                                <input
                                    onChange={handleCPassword}
                                    value={cPassword}
                                    type="password"
                                    className='border rounded-sm border-gray-400 px-2 py-1 w-full outline-none focus:drop-shadow-md' 
                                />
                                {errCPassword && (
                                    <p className='text-red-500 text-sm font-semibold pt-1'>
                                        <span className='italic mr-1'>!</span> 
                                        {errCPassword}
                                    </p>
                                )}
                            </div>
                        </div>
                        <p className='text-sm text-gray-600 mt-2 mb-4'>Passwords must be at least 6 characters.</p>
                        <button
                            onClick={handleRegistration}
                            disabled={isLoading}
                            className='button border text-[17px] font-medium w-full mb-2'>Continue
                        </button>
                        {isLoading && (
                            <div className="flex items-center justify-center font-bold">
                            <ScaleLoader color="#F59E0B" size={40} className="text-black" />
                            </div>
                        )}

                        <div className='text-xs mt-3'>
                            {/* <p 
                                className='mb-4'>By Continuing, you agree to Amazozn's 
                                <span className='text-blue-600 cursor-pointer hover:underline'> Conditions of Use</span> and 
                                <span className='text-blue-600 cursor-pointer hover:underline'> Privacy Notice</span>.
                            </p> */}
                            <p 
                                className='flex flex-row'>Already have an account? 
                                <span onClick={() => router.push('/signin')} className='flex items-center justify-center pl-1 cursor-pointer text-blue-600 hover:underline hover:text-red-600'>Sign in 
                                    <span className='pt-0.5'><MdArrowRight /></span>
                                </span>
                            </p>
                            {/* <p 
                                className='flex flex-row'>Buying for work? 
                                <span className='flex items-center justify-center pl-1 cursor-pointer text-blue-600 hover:underline hover:text-red-600'>Create a few business account 
                                    <span className='pt-0.5'><MdArrowRight /></span>
                                </span>
                            </p> */}
                        </div>

                    </div>
                </form>
            </div>
            {/* <div className='w-full bg-gradient-to-t from-white via-white to-zinc-200'>
                <div className='w-[350px] mx-auto py-9 text-xs text-center'>
                    <div className='flex items-center justify-center space-x-9 pb-1'>
                        <p className='text-blue-600 cursor-pointer hover:underline hover:text-red-600'>Conditions of Use</p>
                        <p className='text-blue-600 cursor-pointer hover:underline hover:text-red-600'>Privacy Notice</p>
                        <p className='text-blue-600 cursor-pointer hover:underline hover:text-red-600'>Privacy Policy</p>
                    </div>
                    <p className=''>© 1996-2024, ReactBd.com, Inc. or its affiliates</p>
                </div>
            </div> */}
    </AuthGuard>
  )
}

export default Registration