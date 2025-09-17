import { createContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const [userData,setUserData]=useState({name:"Developer",
      email:"",
      isAccountVerified:false
    });

    const getAuthState=async()=>{
      try {
        const {data}=await axios.get(backendUrl+"/api/auth/is-auth",{withCredentials: true})
        if(data.success){
          setIsLoggedIn(true)
          await getUserData()
        }
      } catch (err) {
        toast.error(err.message)
      }
    }

    const getUserData=async()=>{
      try{
         const {data}=await axios.get(backendUrl+"/api/user/data",{withCredentials: true})
         data.success?setUserData(data.userData):toast.error(data.message)
        //  console.log(userData)
      }
      catch(error){
        toast.error(error.message)
      }
    }

    useEffect(()=>{
      getAuthState();
      // getUserData();
    },[])
    
    const value={
        backendUrl,
        isLoggedIn,setIsLoggedIn,
        userData,setUserData,
        getUserData
    }
  return <AppContext.Provider value={value}>
    {props.children}
  </AppContext.Provider>;
};
