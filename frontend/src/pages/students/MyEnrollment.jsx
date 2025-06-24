import React, { useContext, useEffect, useState } from "react";
import "../../styles/MyEnrollment.css";
import { AuthContext } from "../../context/AuthContex";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../components/students/Loading";

const MyEnrollment = () => {
  const {
    enrolledCourses,
    calculateCourseDuration,
    navigate,
    userData,
    fetchEnrolledCourses,
    backendUrl,
    getToken,
    calculateNoOfLectures,
  } = useContext(AuthContext);
  const [progressArray, setProgressArray] = useState([]);
  const getCourseProgress = async () => {
    try {
      const token = await getToken();
      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          const { data } = await axios.post(
            `${backendUrl}/api/user/get-course-progress`,
            { courseId: course._id },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          let totalLectures = calculateNoOfLectures(course);
          const lectureCompleted = data.progressData
            ? data.progressData.lectureCompleted.length
            : 0;
          return { totalLectures, lectureCompleted };
        })
      );
      setProgressArray(tempProgressArray);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (userData) {
      fetchEnrolledCourses();
    }
  }, [userData]);

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseProgress();
    }
  }, [enrolledCourses]);
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
                    <button
                      onClick={() => navigate("/player/" + course._id)}
                      className="btn_cmplt"
                    >{progressArray[index]?.lectureCompleted !== undefined &&
                      progressArray[index]?.totalLectures !== undefined
                      ?progressArray[index].lectureCompleted ===
                      progressArray[index].totalLectures
                        ? "Completed"
                        : "On Going":<Loading/>}
                    </button>
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
