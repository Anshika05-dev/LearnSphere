import React, { useContext } from "react";
import { Link } from "react-router-dom";
import '../../styles/CourseSection.css'
import { AuthContext } from "../../context/AuthContex";
import CourseCard from "./CourseCard";

const CourseSection = () => {
const{allCourses}=useContext(AuthContext);

  return (
    <div>
      <h2>Learn from the best</h2>
      <p className="course_des">
        Discover our top-rated courses across various categories. From coding
        and design to business and wellness, our courses are crafted to deliver
        results.
      </p>
      <div className="courses">
        {allCourses.slice(0,4).map((course,index)=><CourseCard  key={index} course={course}/>)}
      </div>
      <Link to={'/course-list'} onClick={()=>scrollTo(0,0)} className="showcourse_btn">Show All Courses</Link>
    </div>
  );
};

export default CourseSection;
