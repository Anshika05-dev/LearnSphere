import React, { useContext,useState } from "react";
import "../../styles/MyEnrollment.css";
import { AuthContext } from "../../context/AuthContex";

const MyEnrollment = () => {
  const { enrolledCourses, calculateCourseDuration,navigate } = useContext(AuthContext);
  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 1, totalLectures: 5 },
    { lectureCompleted: 3, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 3 },
    { lectureCompleted: 5, totalLectures: 7 },
    { lectureCompleted: 6, totalLectures: 8 },
    { lectureCompleted: 2, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 10 },
    { lectureCompleted: 3, totalLectures: 5 },
    { lectureCompleted: 7, totalLectures: 7 },
    { lectureCompleted: 1, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 2 },
    { lectureCompleted: 5, totalLectures: 5 },
  ]);
  console.log(enrolledCourses);
  return (
    <>
      <div className="my_enrollment">
        <h1>My Enrollments</h1>
        <div className="table_wrapper">
          <table className="main_table">
            <thead className="main_table_head">
              <tr>
                <th className="table_heading">Course</th>
                <th className="table_heading">Duration</th>
                <th className="table_heading">Completed</th>
                <th className="table_heading">Status</th>
              </tr>
            </thead>

            <tbody>
              {enrolledCourses.map((course, index) => (
                <tr key={index} className="table_row">
                  <td className="table_data">
                    <img src={course.courseThumbnail} className="td_img"></img>
                    <div>
                      <p>{course.courseTitle}</p>
                    </div>
                  </td>
                  <td className="duration">
                    {calculateCourseDuration(course)}
                  </td>
                  <td className="completion">
                    {progressArray[index] &&
                      `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures}`}
                    <span> Lectures</span>
                  </td>
                  <td>
                    <button onClick={()=>navigate('/player/'+course._id)} className="btn_cmplt">{progressArray[index].lectureCompleted===progressArray[index].totalLectures?'Completed':'On Going'}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyEnrollment;
