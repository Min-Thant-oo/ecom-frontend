import React from 'react'
import {footerBottomItem} from '../../constants'
import axios from 'axios';

const FooterBottom = () => {



  return (
    <div className=' bg-amazon_blue py-8 '>
        <div className='max-w-5xl mx-auto'>
            <div className='w-full hidden sm:grid grid-cols-3 md:grid-cols-4 xl:grid-cols-7 px-5 gap-8'>
              {footerBottomItem.map((item) => (
                        <div key={item._id} className='hover:underline decoration-white cursor-pointer'>
                            <p className='text-xs text-white'>{item.title}</p>
                            <p className='text-xs text-gray-400'>{item.des}</p>
                        </div>
            ))}  
            </div>

            <div className='text-white text-xs w-full text-center mt-10'>
                <div className='flex flex-row gap-x-4 justify-center mb-1'>
                    <p className='hover:underline decoration-white cursor-pointer'>Conditions of Use</p>
                    <p className='hover:underline decoration-white cursor-pointer'>Privacy Notice</p>
                    <p className='hover:underline decoration-white cursor-pointer'>Your Ads Privacy Choices</p> 
                </div>

                <div>
                    <p>@ 1996-2024, solarecom.com, Inc. or its affiliates</p>
                </div>
                
            </div>
            
        </div>
        
    </div>
  )
}

export default FooterBottom