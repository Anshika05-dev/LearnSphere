import React, { useContext, useEffect, useState } from "react";
import "../../styles/MyCourses.css";
import { AuthContext } from "../../context/AuthContex";
import Loading from "../../components/students/Loading";

const MyCourses = () => {
  const { currency, allCourses } = useContext(AuthContext);
  const [courses, setCourses] = useState(null);

  const fetchEducatorCourses = async () => {
    setCourses(allCourses);
  };

  useEffect(() => {
    fetchEducatorCourses();
  }, [allCourses]);

  return courses ? (
    <div className="_edu_courses_outer">
      <div className="_edu_courses">
        <h2 className="_title">My Courses</h2>
        <div className="_edu_div1">
          <div className="_course_header_row">
            <div className="_header_cell">All Courses</div>
            <div className="_header_cell">Earnings</div>
            <div className="_header_cell _hide_425">Students</div>
            <div className="_header_cell _hide_425">Published On</div>
          </div>

          {courses.map((course) => (
            <div key={course._id} className="_course_row">
              <div className="_cell _course_info">
                <img
                  src={course.courseThumbnail}
                  className="_edu_course_img _hide_425"
                  alt="thumbnail"
                />
                <span>{course.courseTitle}</span>
              </div>
              <div className="_cell">
                {currency}{" "}
                {Math.floor(
                  course.enrolledStudents.length *
                    (course.coursePrice -
                      (course.discount * course.coursePrice) / 100)
                )}
              </div>
              <div className="_cell _hide_425">
                {course.enrolledStudents.length}
              </div>
              <div className="_cell _hide_425">
                {new Date(course.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MyCourses;
