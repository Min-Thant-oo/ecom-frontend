import React, {useState} from 'react'
import logodark from '../../images/logodark.png'
import Image from 'next/legacy/image'
import { useRouter } from 'next/router';
import axios from 'axios';
import AuthGuard from '@/components/AuthGuard';
import { ScaleLoader } from 'react-spinners';

const Forgetpassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('')
    
    const [errEmail, setErrEmail] = useState('');
    const [forgetPasswordError, setforgetPasswordError] = useState('')

    const baseApiRoute = process.env.NEXT_PUBLIC_BASE_API_URL;
    const router = useRouter()

    const handleEmail = (e) => {
        setEmail(e.target.value)
        setErrEmail('')
    }

    // Email validation
    const emailValidation = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)
    }

    async function handleForgetPassword (e) {
        e.preventDefault()
    
        if(!email) {
          setErrEmail('Enter your email')
        } else if(!emailValidation(email)) {
          setErrEmail('Enter a valid email')
        }

        if(email && emailValidation(email)) {
            setIsLoading(true);
            setforgetPasswordError('')
            setMessage('')
            try {
                const response = await axios.post(`${baseApiRoute}/forgetpassword`, {email})

                if(response.status === 200) {
                  setMessage(response.data.message)
                  // console.log('Email Successfully sent.')
                } else {
                  setforgetPasswordError(response.data.error)
                  // console.log('a')
                }

            } catch(error) {
                if (error.response) {
                  setforgetPasswordError(error.response.data.error);
                  // console.log('b')
              } else {
                setforgetPasswordError('Error sending the password reset email.');
                // console.log('c')
              }
            } finally {
                setIsLoading(false); // Set isLoading to false after processing is complete
              }
        }
    }


  return (
    <AuthGuard>
      <div className='w-full '>
        <div className='w-full pt-7 h-screen bg-gray-100'>
          <form className='w-[350px] max-w-4xl flex flex-col gap- justify-center items-center h-full mx-auto pb-'>
            <div onClick={() => router.push('/')} className='flex justify-center items-center pb-6 cursor-pointer'>
              <Image 
                src={logodark}
                width={150}
                height={40}
                objectFit='contain'
                className=''
              />
            </div>
            

            <div className='flex flex-col space-y-4 border border-gray-200 shadow-sm p-6'>
              <p className='font-semibold text-2xl'>Forgot password?</p>
              <p className='font-medium text-md'>You are not alone. We’ve all been here at some point.
                {/* <br /> We will send you an email to reset your password. */}
              </p>
              <div>
                <p className='font-medium pb-1'>Email</p>
                <input 
                  onChange={handleEmail}
                  type="email" 
                  value={email}
                  className='border font-medium lowercase rounded-sm  border-gray-400 px-2 py-1 w-full outline-none focus:drop-shadow-md'
                />
                {errEmail && (
                  <p className='text-red-500 text-sm font-semibold pt-1'>
                      <span className='italic mr-1'>!</span> 
                      {errEmail}
                  </p>
                )}
              </div>
              <button
                onClick={handleForgetPassword}
                disabled={isLoading}
                className='button border text-[17px] font-medium'>Continue
              </button>
              {isLoading && (
                <div className="flex items-center justify-center font-bold">
                  <ScaleLoader color="#F59E0B" size={40} className="text-black" />
                </div>
              )}
              {forgetPasswordError && (
                <div>
                    {errEmail ? (
                        null
                    ) : <p className='text-yellow-600 text-sm font-semibold pt-1'>
                    <span className='italic mr-1'>!</span> {forgetPasswordError}
                        </p>}
                </div>
              )}
              {message && (
                <div>
                    {errEmail || forgetPasswordError ? (
                        null
                    ) : <p className='text-yellow-600 text-sm font-semibold pt-1'>
                    <span className='italic mr-1'>!</span> {message}
                        </p>}
                </div>
              )}
            </div>

          </form>
        </div>
      </div>
    </AuthGuard>
    
  )
}

export default Forgetpassword