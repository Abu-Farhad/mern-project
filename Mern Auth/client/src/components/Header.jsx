import React, { useContext } from 'react'
import { assets } from '../assets/assets'
// import {userData} from '../context/AppContext'
import { AppContext } from '../context/AppContext'
function Header() {
  const {userData}=useContext(AppContext)
  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center'>
      <img src={assets.header_img} alt="" className='w-auto h-26 mb-6 bg-blue-400 rounded-full object-cover'/>
      <h1 className='flex items-center ga[-2 text-xl sm:text-3xl font-medium mb-2'>Hey {userData?userData.name:'Developer'} <img src={assets.hand_wave} className={`w-8 aspect-square`} alt="" /></h1>
      <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to our app</h2>
      <p className='mb-8 max-w-md'>Let's start with a quick produce and we will have you up and running in no time!</p>
      <button className='border border-gray-500 rounded-full px-4 py-2.5 hover:bg-gray-100 transition-all'>Get Started</button>  
    </div>
  )
}

export default Header
