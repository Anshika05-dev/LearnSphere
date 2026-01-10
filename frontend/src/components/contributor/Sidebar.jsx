import { BookMarked, BookOpenCheck, BrainCircuit, Home, UserCheck } from 'lucide-react';
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContex';
import '../../styles/Sidebar.css'
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
  
  const {isEducator} =useContext (AuthContext)
  const menuItems = [

    // { name: 'Dashboard', path: '/educator', icon: <Home />},
    // { name: 'Add Course', path: '/educator/add-course', icon: <BookMarked /> },
    // { name: 'My Courses', path: '/educator/my-courses', icon: <BookOpenCheck /> },
    // { name: 'Student Enrolled', path: '/educator/student-enrolled', icon: <UserCheck/> },
    // { name: 'Add Course With AI', path: '/educator/add-course-ai', icon: <BrainCircuit /> },
    ];
  return isEducator && (
    <div className='_sidebar'>{
      menuItems.map((item)=>(
        <NavLink to={item.path} key={item.name} end={item.path=== '/educator'}
        className={({ isActive }) => isActive ? '_active' : '_inactive'}>
          <p>
            {item.icon}
          </p>
          <p>
            {item.name}
          </p>
        </NavLink>
      ))
    }</div>
  )
}

export default Sidebar