import React from 'react'
import { ListEmpty } from '../assets'

function EmptyList() {
  return (
    <div>
        <img 
            src={ListEmpty}
            className="m-auto cursor-pointer sm:w-48 md:w-72 sm:mt-10 lg:w-[450px]"
        />
    </div>
  )
}

export default EmptyList