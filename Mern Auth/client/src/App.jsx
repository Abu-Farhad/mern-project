import React from 'react'
import { Route,Routes } from 'react-router-dom'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import Home from './pages/Home'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';


const App = () => {
  return (
    <div className=''>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/email-verify' element={<EmailVerify/>}/>
        <Route path='reset-password' element={<ResetPassword/>}/>
      </Routes>
    </div>
  )
}

export default App
