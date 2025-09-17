import React, { useContext } from "react";
// import { assets } from "../assets/assets_admin/assets.js";
import { useState } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
export default function Login() {
  const [state, setState] = useState("Admin");
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {setAtoken,backendUrl}=useContext(AdminContext);
  
  
  const onSubmitHandler= async (e) => {
    
    e.preventDefault()
    try {
      if(state=='Admin'){
        // console.log(backendUrl)
        const {data}=await axios.post(backendUrl+'/api/admin/login',{email,password})
        if(data.success){
          localStorage.setItem('atoken',data.token)
          setAtoken(data.token)
          toast.success("Login Successfull")
        }
        else{
          toast.error("Something wrong!")
        }
      }
      else{

      }
    } catch (error) {
      
    }
  }

  return (
    <>
    <form onSubmit={onSubmitHandler} action="" className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-white rounded-xl text-[#5ESESE] text-sm shadow-lg">
        <p className="text-2xl m-auto font-semibold">
          <span className="text-purple-700">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} className="border border-gray-400 w-full rounded p-2" type="email" required />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input onChange={(e)=>setPassword(e.target.value)} value={password} className="border border-gray-400 w-full rounded p-2" type="password" required />
        </div>
        <button className="bg-purple-700 text-white w-full rounded-md py-2 mt-2 font-semibold text-xl">Login</button>
        {
            state==='Admin'?
            <p>Doctor Login?<span onClick={()=>setState('Doctor')} className="ml-2 text-blue-500 underline cursor-pointer">Click Here</span></p>:
            <p >Admin Login?<span className="ml-2 underline text-blue-500 cursor-pointer" onClick={()=>{setState('Admin')}}>Click Here</span></p>
        }
      </div>
    </form>
    {/* <ToastContainer/> */}
    </>
  );
}
