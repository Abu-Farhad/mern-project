import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext=createContext()

const AdminContextProvider=(props)=>{
    const [atoken,setAtoken]=useState(localStorage.getItem('atoken')?localStorage.getItem('atoken'):'')
    const [doctors,setDoctors]=useState([])
    const backendUrl=import.meta.env.VITE_BACKENDURL;

    const getAllDoctors=async()=>{
        try {
            const {data}=await axios.post(backendUrl+'/api/admin/all-doctors',{},{headers:{atoken}})
            console.log(data)
            if(data.success==true){
                setDoctors(data.doctors)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            
        }
    }

    const changeAvailability=async(docId)=>{
        try {
            const {data}=await axios.post(backendUrl+'/api/admin/change-availability',{docId},{headers:{atoken}})
            if(data.success){
                toast.success(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
        getAllDoctors()
    }

    const value={
        atoken,setAtoken,backendUrl,doctors,getAllDoctors,changeAvailability
    }
    return <AdminContext.Provider value={value}>
        {props.children}
    </AdminContext.Provider>
}
export default AdminContextProvider