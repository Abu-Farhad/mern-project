import React from "react";
import { assets, dummyTestimonial } from "../../assets/assets";

export default function Testimonial() {
  return (
    <div className="pb-14 px-8 md:px-0">
      <h2 className="text-3xl font-medium text-gray-800">Testimonials</h2>
      <p className="md:text-base text-gray-500 mt-3">
        Hear from our learners as they share their journeys of transformation,
        success, and how our <br /> platform has made a difference in their
        lives
      </p>
      <div className="grid grid-cols-auto gap-8 mt-14">
        {dummyTestimonial.map((Testimonial, index) => (
          <div key={index} className="text-sm text-left border border-gray-500/30 pb-6 rounded-lg shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden mb-4">
            <div className="flex bg-gray-500/30">
              <div className="flex items-center px-5 py-4 ">
              <img className="h-12 w-12 rounded-full" src={Testimonial.image} alt={Testimonial.name} />
            </div>
            <div className="flex items-center">
              <h1 className="text-lg font-medium text-gray-800">
                {Testimonial.name}
                <p className="text-gray-800/80 text-sm">{Testimonial.role}</p>
              </h1>
            </div>
            </div>
            <div className="p-5 pb-7 flex">
              {[...Array(5)].map((__,i)=>(
                <img className="h-3 " key={i} src={(i<Math.floor(Testimonial.rating))?assets.star:assets.star_blank} alt="" />
              ))}
            </div>
            <p className="text-gray-500 px-5">
              {Testimonial.feedback}
            </p>
            <a className="text-blue-500 underline px-5 mt-4" href="#">Read more</a>
          </div>
          
        ))}
      </div>
    </div>
  );
}
