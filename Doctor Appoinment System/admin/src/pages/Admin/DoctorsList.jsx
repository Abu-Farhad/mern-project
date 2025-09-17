import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

export default function DoctorsList() {
  const { doctors = [], atoken, getAllDoctors,changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    // include atoken and getAllDoctors in the dependency array
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken, getAllDoctors]);


  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.length > 0 ? (
          doctors.map((item, index) => (
            <div
              className="group border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer"
              key={item.id || index}
            >
              <img
                className="bg-indigo-50 group-hover:bg-indigo-500 transition-all duration-500"
                src={item.image}
                alt={item.name || "Doctor"}
              />
              <div className="p-4">
                <p className="text-neutral-800 text-lg font-medium">{item.name}</p>
                <p className="text-zinc-600 text-lg font-medium">{item.speciality}</p>
                <div className="flex gap-2 mt-2 items-center text-sm">
                  <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No doctors found</p>
        )}
      </div>
    </div>
  );
}
