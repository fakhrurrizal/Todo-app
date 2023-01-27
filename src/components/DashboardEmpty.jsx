import React from 'react'
import { Empty } from '../assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEllipsisH } from '@fortawesome/free-solid-svg-icons'

function DashboardEmpty() {
  return (
    <div className='relative lg:mx-28 xl:ml-52 md:mx-28 sm:mt-10 lg:mt-10 md:mt-2 flex '>
        <img 
          src={Empty} 
          className="absolute md:block sm:hidden lg:block lg:w-[400px] md:w-[350px] justify-content-center right"
        />
        
        <div className='lg:ml-72 sm:m-auto md:ml-56 lg:mt-0 md:mt-12 cursor-pointer text-center'>
          <div className='border border-8 rounded-md lg:px-32 sm:px-10 sm:py-10 lg:py-16 mb-5 '>  
            <FontAwesomeIcon icon={faPlus} className="bg-aqua hover:bg-sky-500 px-3 py-2 text-white lg:text-[70px] rounded-[100px]"/>
          </div>
          <span className=' text-slate-500 mt-5 font-bold text-lg font-poppins'>Buat Activity pertamamu</span>
          <div className='mt-7'>
            <FontAwesomeIcon icon={faEllipsisH}  className="text-[52px] text-slate-300"/>
          </div>
        </div>
    </div>
  )
}

export default DashboardEmpty