import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import Home from "./pages/students/Home";
import CourseList from "./pages/students/CourseList";
import CourseDetails from "./pages/students/CourseDetails";
import MyEnrollment from "./pages/students/MyEnrollment";
import Player from "./pages/students/Player";
import Loading from "./components/students/Loading";
import Educator from "./pages/contributor/Educator";
import Dashboard from "./pages/contributor/Dashboard";
import AddCourse from "./pages/contributor/AddCourse";
import AddCourseAI from "./pages/contributor/AddCourseAi";
import MyCourses from "./pages/contributor/MyCourses";
import AiGeneratedCourse from "./pages/contributor/AiGeneratedCourse"; 
import StudentsEnrolled from "./pages/contributor/StudentsEnrolled";
import Navbar from "./components/students/Navbar";
import "quill/dist/quill.snow.css";
import { ToastContainer} from 'react-toastify';


const App = () => {

  const iseducatorroute= useMatch('/educator/*')

  return (
    <div>
      <ToastContainer/>
      {!iseducatorroute && <Navbar />}
      
      <Routes>

        <Route path="/"element={<Home/>}/>
        <Route path="/course-list"element={<CourseList/>}/>
        <Route path="/course-list/:keyword?" element={<CourseList />} />
        <Route path="/course/:id"element={<CourseDetails/>}/>
        <Route path="/my-enrollments"element={<MyEnrollment/>}/>
        <Route path="/player/:courseId"element={<Player/>}/>
        <Route path="/loading/:path"element={<Loading/>}/>

        <Route path="/educator" element={<Educator/>}>
        <Route path="/educator"element={<Dashboard/>}/>
        <Route path="add-course"element={<AddCourse/>}/>
        <Route path="my-courses"element={<MyCourses/>}/>
        <Route path="student-enrolled"element={<StudentsEnrolled/>}/>
        <Route path="add-course-ai"element={<AddCourseAI/>}/>
        <Route path="generated-course" element={<AiGeneratedCourse />} />
        
        </Route>
      </Routes>
    </div>
  );
};

export default App;
