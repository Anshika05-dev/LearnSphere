import React, { useContext, useEffect, useState } from "react";
import { dummyStudentEnrolled } from "../../assets/assets";
import Loading from "../../components/students/Loading";
import "../../styles/StudentsEnrolled.css";
import { AuthContext } from "../../context/AuthContex";
import { toast } from "react-toastify";
import axios from "axios";

const StudentsEnrolled = () => {
  const { backendUrl, isEducator, getToken } = useContext(AuthContext);
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const fetchEnrolledStudents = async () => {
    try {
      const token=await getToken()
      const{data}=await axios.get(backendUrl+'/api/educator/enrolled-students',{
        headers: { Authorization: `Bearer ${token}` }
      })
      if(data.success){
        setEnrolledStudents(data.enrolledStudents.reverse())
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };
  useEffect(() => {
    if(isEducator){
    fetchEnrolledStudents();}
  }, [isEducator]);
  return enrolledStudents ? (
    <div className="studentsenrolled_div_1">
      <div className="studentsenrolled_div_2">
        <table className="studentsenrolled_table_1">
          <thead className="table_2">
            <tr>
              <th className="_th1">#</th>
              <th className="_th">Students Name</th>
              <th className="_th">Course Tile</th>
              <th className="_th">Course Tile</th>
            </tr>
          </thead>
          <tbody>
            {enrolledStudents.map((item, index) => (
              <tr key={index} className="studentsenrolled_tr_1">
                <td className="studentsenrolled_td_1"> {index + 1}</td>
                <td className="studentsenrolled_td_2">
                  <img src={item.student.imageUrl} className="_student_image" />
                  <span>{item.student.name}</span>
                </td>
                <td className="studentsenrolled_td_3">{item.courseTitle}</td>
                <td className="studentsenrolled_td_3">
                  {new Date(item.purchaseDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default StudentsEnrolled;
