import React from "react";
// import Navbar from '../../components/student/Navbar'
import Hero from "../../components/student/Hero";
import Companies from "../../components/student/Companies";
import CourseSection from "../../components/student/CourseSection";
import Testimonial from "../../components/student/Testimonial";
import CallToAction from "../../components/student/CallToAction";
import Footer from "../../components/student/Footer";
export default function Home() {
  return (
    <div className="flex flex-col items-center space-y-7 text-center">
      <Hero/>
      <Companies/>
      <CourseSection/>
      <Testimonial/>
      <CallToAction/>
      <Footer/>
    </div>
  );
}
