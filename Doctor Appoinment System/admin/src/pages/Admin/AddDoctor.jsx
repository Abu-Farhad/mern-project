import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function AddDoctor() {

  const [docImg,setDocImg]=useState(false)
  const [name,setName]=useState()
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const [experience,setExperience]=useState('1 year')
  const [fees,setFees]=useState()
  const [about,setAbout]=useState()
  const [speciality,setSpeciality]=useState('General physician')
  const [degree,setDegree]=useState()
  const [address1,setAddres1]=useState()
  const [address2,setAddress2]=useState()

  const {backendUrl,atoken}=useContext(AdminContext)

  const onSubmitHandler=async(e)=>{
    e.preventDefault()
    try {
      if(!docImg)
        {return toast.error("Image not found")};

      const formData=new FormData()
      formData.append('image',docImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('experience',experience)
      formData.append('fees',Number(fees))
      formData.append('about',about)
      formData.append('speciality',speciality)
      formData.append('degree',degree)
      formData.append('address',JSON.stringify({line1:address1,line2:address2}))

      // console.log(typeof(formData))
      const {data}=await axios.post(backendUrl+'/api/admin/add-doctor',formData,{headers:{atoken}})

      if(data.success){
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setExperience('')
        setFees('')
        setAbout('')
        setSpeciality('')
        setDegree('')
        setAddres1('')
        setAddress2('')
      }
      else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <form className="mb-3 w-full" action="">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docImg?URL.createObjectURL(docImg):assets.upload_area}
              alt=""
            />
          </label>
          <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p>
            Upload doctor <br />
            picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name</p>
              <input onChange={(e)=>setName(e.target.value)} 
                value={name}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input onChange={(e)=>setEmail(e.target.value)}
              value={email}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="email"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="password"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select name="" id="" onChange={(e)=>setExperience(e.target.value)} value={experience}>
                {[...Array(10)].map((_, idx) => (
                  <option key={idx} value={`${idx + 1} Year`}>
                    {idx + 1} Year
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                onChange={(e)=>setFees(e.target.value)}
                value={fees}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="fees"
                required
              />
            </div>
          </div>
          <div className="w-full gap-4 flex flex-col flex-1">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select name="" id=""
              onChange={(e)=>setSpeciality(e.target.value)} value={speciality}>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="General Physician">General Physician</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                onChange={(e)=>setDegree(e.target.value)}
                value={degree}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Education"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                onChange={(e)=>setAddres1(e.target.value)} 
                value={address1}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="address 1"
              />
              <input
                onChange={(e)=>setAddress2(e.target.value)}
                value={address2}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="address 2"
              />
            </div>
          </div>
        </div>
        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea className="w-full px-4 pt-2 border rounded-md"
            type="text"
            placeholder="Write about doctor"
            rows={5}
            required
            onChange={(e)=>setAbout(e.target.value)}
            value={about}
          />
        </div>
        <div className="flex justify-center">
          <button onClick={onSubmitHandler} type="submit" className="bg-purple-600 px-4 py-2 rounded-full text-white w-full max-w-[500px] mx-auto mt-5">Add doctor</button>
        </div>
      </div>
    </form>
  );
}