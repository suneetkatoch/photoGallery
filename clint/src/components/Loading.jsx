import React from 'react'
import { OrbitProgress } from 'react-loading-indicators'

function Loading() {
  return (
    <div className='flex justify-center items-center  w-full  bg-white '>
    <OrbitProgress color="#32cd32" size="medium" text="" textColor="" />
    </div>
  )
}

export default Loading