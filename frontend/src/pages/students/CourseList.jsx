import React, { useContext, useEffect, useState } from "react";
import '../../styles/CourseList.css';
import { AuthContext } from "../../context/AuthContex";
import SearchBar from "../../components/students/SearchBar";
import { useParams } from "react-router-dom";
import CourseCard from "../../components/students/CourseCard";


const CourseList = () => {
  const { navigate,allCourses } = useContext(AuthContext);
  const { keyword } = useParams(); 
  const[filteredCourse, setFilteredCourse] =useState([])
  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();
      keyword
        ? setFilteredCourse(
            tempCourses.filter(item =>
              item.courseTitle.toLowerCase().includes(keyword.toLowerCase())
            )
          )
        : setFilteredCourse(tempCourses);
    }
  }, [allCourses, keyword]);
  return (
    <>
    <div className="outer_course">
      <div className="outer_course_list">
        <div className="course_list">
          <h1 className="courselist_heading">Course List</h1>
          <p className="course_breadcrumb">
            <span className="breadcrumb_1" onClick={() => navigate("/")}>Home </span>/<span> Course List</span>
          </p>
        </div>

        <SearchBar data={keyword || ""} />
      </div>
      <div className="course_list_cards">
      {filteredCourse.length > 0 ? (
    filteredCourse.map((course, index) => (
      <CourseCard key={index} course={course} />
    ))
  ) : (
    <p className="no_course_found">No course found for "{keyword}"</p>
  )}
      </div>
    </div>
    </>
  );
};

export default CourseList;
