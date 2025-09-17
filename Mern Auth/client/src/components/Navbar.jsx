import React from 'react'
import {assets} from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {
  const navigate=useNavigate()
  const {userData,backendUrl,setUserData,setIsLoggedIn,isLoggedIn}=useContext(AppContext)

  const sendVerificationOtp=async()=>{
    try {
      axios.defaults.withCredentials=true;
      const {data}=await axios.post(backendUrl+'/api/auth/send-verify-otp')
      if(data.success){
        navigate('/email-verify');
        toast.success(data.message)
      }
      else{
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    }
  }
  const logOut=async ()=>{
    try {
      axios.defaults.withCredentials=true
      const {data}=await axios.post(backendUrl+'/api/auth/logout')
      data.success && setIsLoggedIn(false)
      data.success && setUserData({name:"Developer",email:'',isAccountVerified:false})
      navigate('/')
    } catch (err) {
      toast.error(err.message)
    }
  }
  
  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
      <img src={assets.logo} className='w-28 sm:w-32' alt="" />
      {isLoggedIn ? (
  <div className='group text-3xl bg-black text-white relative rounded-full px-4 py-2'>
    {userData.name[0].toUpperCase()}
    <div className='text-xl absolute hidden group-hover:block top-0 pt-15 right-0 w-30 z-10 text-black rounded'>
      <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
        {console.log(userData)}
        {!userData.isAccountVerified && <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify email</li>}
        <li onClick={logOut} className='cursor-pointer py-1 px-2 hover:bg-gray-200'>Logout</li>
      </ul>
    </div>
  </div>
) : (
  <button
    onClick={() => navigate('/login')}
    className='flex gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all'
  >
    Login <img src={assets.arrow_icon} alt="" />
  </button>
)}

    </div>
  )
}

export default Navbar
