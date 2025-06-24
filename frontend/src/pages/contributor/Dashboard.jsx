import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContex";
import { dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/students/Loading";
import { FileUser, SquareLibrary, Users } from "lucide-react";
import "../../styles/Dashboard.css";
import { toast } from "react-toastify";
import axios from "axios";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const { currency, backendUrl, getToken, isEducator } = useContext(AuthContext);

  const fetchDashboardData = async () => {
   try {
    const token=await getToken()
      const{data}=await axios.get(backendUrl+'/api/educator/dashboard',{
        headers: { Authorization: `Bearer ${token}` }
      })
      if(data.success){
        setDashboardData(data.dashboardData)
      }else{
        toast.error(data.message)
      }
   } catch (error) {
    toast.error(error.message)
   }
  };
  useEffect(() => {
    if(isEducator){
    fetchDashboardData();}
  }, [isEducator]);

  return dashboardData ? (
    <div className="_dashboard">
      <div className="_dashboard_1">
        <div className="_dashboard_2">
          <div className="_dashboard_3">
            <Users />
            <div>
              <p className="_p1">{dashboardData.enrolledStudentsData.length}</p>
              <p className="_p2">Total Enrollments</p>
            </div>
          </div>
          <div className="_dashboard_3">
            <FileUser />
            <div>
              <p className="_p1">{dashboardData.totalCourses}</p>
              <p className="_p2">Total Courses</p>
            </div>
          </div>
          <div className="_dashboard_3">
            <SquareLibrary />
            <div>
              <p className="_p1">
                {currency} {dashboardData.totalEarnings}
              </p>
              <p className="_p2">Total Earnings</p>
            </div>
          </div>
        </div>
        <div>
          <h1 className="_h1">Latest Enrollments</h1>
          <div className="_dashboard_4">
            <table className="table_1">
              <thead className="table_2">
                <tr>
                  <th className="_th1">#</th>
                  <th className="_th">Student Name</th>
                  <th className="_th">Course Tile</th>
                </tr>
              </thead>
              <tbody className="table_3">
                {dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr key={index} className="_tr1">
                    <td className="_edu__td1">{index + 1}</td>
                    <td className="_td2">
                      <img
                        src={item.student.imageUrl}
                        alt="Profile"
                        className="_user_img"
                      />
                      <span className="span1">{item.student.name}</span>
                    </td>
                    <td className="_td3">{item.courseTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;
