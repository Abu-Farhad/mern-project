import React, { useContext } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'


export default function Navbar() {
    const navigate=useNavigate()
    const {atoken,setAtoken}=useContext(AdminContext)
    const logout=()=>{
        atoken && setAtoken('')
        atoken && localStorage.removeItem('atoken')
        navigate('/')
    }
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{atoken?'Admin':'Doctor'}</p>
      </div>
      <div onClick={logout} className='bg-purple-500 text-white text-sm px-10 py-2 rounded rounded-full cursor-pointer'>Logout</div>
    </div>
  )
}
