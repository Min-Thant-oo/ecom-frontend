import React, {useState, useEffect  } from 'react'
import { useRouter } from 'next/router'

const FooterTop = () => {

  const [username, setUsername] = useState('');
    useEffect(() => {
        const storedUsername = localStorage.getItem('user_info');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

  const router = useRouter()
  return (
    <div className='w-full py-6'>
        {!username && 
          <>
            <div className='w-full border-y py-8 '>
              <div className='w-64 mx-auto text-center'>
                <p className='text-sm'>See Personalized recommendations</p>
                <button 
                  onClick={() => router.push('/signin')}
                  className='w-full button mt-1'
                >
                  Sign In
                </button>
                <p 
                  onClick={() => router.push('/registration')} 
                  className='text-xs mt-1'
                >
                  New Customer? <span className='text-blue-600 ml-1 cursor-pointer hover:text-yellow-500'>Start here.</span>
                </p>
              </div>
            </div>
          </>
        }
    </div>
  )
}

export default FooterTop