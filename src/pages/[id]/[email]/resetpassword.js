import React, {useState, useEffect} from 'react'
import logodark from '../../../../images/logodark.png'
import Image from 'next/legacy/image'
import { useRouter } from 'next/router'
import axios from 'axios';
import AuthGuard from '@/components/AuthGuard';
import { ScaleLoader } from 'react-spinners';
import { MdArrowRight } from 'react-icons/md';


const Passwordreset = () => {

  const router = useRouter();
  const { query } = useRouter();
  const token = query.id;
  const email = query.email;
  // console.log(email);
  // console.log(token);

  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('')
  const [countdown, setCountdown] = useState(5);
  
  const [errPassword, setErrPassword] = useState('');
  const [errCPassword, setErrCPassword] = useState('');
  const [passwordUpdateError, setPasswordUpdateError] = useState('')

  const baseApiRoute = process.env.NEXT_PUBLIC_BASE_API_URL;

  const handlePassword = (e) => {
    setPassword(e.target.value)
    setErrPassword('')
  } 

  const handleCPassword = (e) => {
    setCPassword(e.target.value)
    setErrCPassword('')
  } 


  async function handleresetpassword (e) {
    e.preventDefault()

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

    const formdata = new FormData()
    formdata.append('token', token)
    formdata.append('email', email)
    formdata.append('password', password)
    formdata.append('cPassword', cPassword)

    if(password && password.length >= 6 && cPassword && cPassword === password) {

        setIsLoading(true);
        setPasswordUpdateError('')   
        setErrPassword('')
        setErrCPassword('')

        try {
          const response = await axios.post(`${baseApiRoute}/resetpassword`, formdata)
          if(response.status === 200) {
            setMessage(response.data.message)
            // console.log('a')
            
             // Start countdown only when the response is 200
            let countdownValue = 5;
            const countdownInterval = setInterval(() => {
              setCountdown(--countdownValue);

              if (countdownValue === 0) {
                clearInterval(countdownInterval);
                router.push('/signin');
              }
            }, 1000);


          } else {
            setPasswordUpdateError(response.data.error)
            // console.log('b')
          }
        } catch(error) {
            if (error.response) {
              setPasswordUpdateError(error.response.data.error);
              // console.log('c')
            } else {
                setPasswordUpdateError('Error updating the password.');
                // console.log('d')
              }
          } finally {
              setIsLoading(false); // Set isLoading to false after processing is complete
            }
    }
  }

  return (
    <AuthGuard>
            <div className='w-full bg-gray-100 min-h-screen md:h-screen pb-10'>
                <form className='w-[370px] mx-auto flex flex-col justify-center items-center h-full'>
                    <div onClick={() => router.push('/')} className='my-5 cursor-pointer'>
                        <Image 
                            src={logodark}
                            width={150}
                            height={40}
                            objectFit='contain'
                        />    
                    </div>
                    
                    <div className='w-full border border-zinc-200 p-6'>
                        <h2 className='font-medium text-xl mb-4'>Reset the password for {email}</h2>
                        <div className='flex flex-col gap-3'>
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
                            onClick={handleresetpassword}
                            className='button border text-[17px] font-medium w-full mb-2'
                            disabled={isLoading}
                        >
                          Continue
                        </button>
                        {isLoading && (
                            <div className="flex items-center justify-center font-bold">
                            <ScaleLoader color="#F59E0B" size={40} className="text-black" />
                            </div>
                        )}

                        {passwordUpdateError && (
                          <div>
                              {errPassword || errCPassword || message ? (
                                  null
                              ) : <p className='text-red-500 text-sm font-semibold pt-1'>
                              <span className='italic mr-1'>!</span> {passwordUpdateError}
                                  </p>}
                          </div>
                        )}

                        {message && (
                          <div>
                            {errPassword || errCPassword || passwordUpdateError ? null : (
                              <>
                                <p className='text-yellow-500 text-sm font-semibold pt-2'>
                                  <span className='italic mr-1'>!</span> {message}
                                </p>
                                {countdown > 0 && (
                                  <p className='text-yellow-500 text-sm font-semibold pt-2'>
                                    <span className='italic mr-1'>!</span> Redirecting you to the signin page in {countdown} seconds.
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        )}

                        <div className='text-xs mt-3'>
                            <p 
                                className='flex flex-row'>Already have an account? 
                                <span onClick={() => router.push('/signin')} className='flex items-center justify-center pl-1 cursor-pointer text-blue-600 hover:underline hover:text-red-600'>Sign in 
                                    <span className='pt-0.5'><MdArrowRight /></span>
                                </span>
                            </p>
                        </div>

                    </div>
                </form>
            </div>
    </AuthGuard>
  )
}

export default Passwordreset