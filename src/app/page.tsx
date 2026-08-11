"use client"
import { useState } from 'react'
import Loader from '@/components/Loader'

const page = () => {

  const [isLoading, setisLoading] = useState(true)

  const handleLoadingComplete = () => {
    setisLoading(false)
  }

  return (
    <div className='min-h-screen overflow-hidden bg-[#000000]'>
      {
        isLoading && <Loader onLoadingComplete={handleLoadingComplete}/>
      }
      <div className={`${isLoading ? 'hidden' : 'block'} min-h-screen`}></div>
    </div>
  )
}

export default page