import React from "react";
import "../../styles/Hero.css";
import SearchBar from "./SearchBar";
import Companies from "./Companies";
import CourseSection from "./CourseSection";
import CallToAction from "./CallToAction";
import Footer from "./Footer";


const Hero = () => {
  return (
    <div className="hero">
      <h1 className="heading">
      Empower your future with the<br></br> courses designed to<span className="heading_clr"> fit your choice.</span>
      </h1>
      <h3>Connecting Students to Tutors.✨✨</h3>
      <p className="des">
        Learn at your pace, build real-World projects, and unlock new opportunities.
        <br></br>
    Start your Journey with LearnSphere Today!!
      </p>
      <SearchBar />
      <Companies />
      <CourseSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Hero;
