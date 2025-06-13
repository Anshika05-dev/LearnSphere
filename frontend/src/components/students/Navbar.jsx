import React from "react";
import colored_logo from "../../assets/favicon.png";
import { Link, useLocation } from "react-router-dom";
import { User } from 'lucide-react';

import '../../styles/Navbar.css'
const Navbar = () => {
//   const location = useLocation();
  const iscourselistpage = location.pathname.includes("/course-list");
  return (
    <div className={iscourselistpage? "edu_nav":"nav"}>
      <img
        src={colored_logo}
        alt="logo"
        className="logo"
      />
      <div className="buttons">
          <button className="join_contri">Become Educator</button>
          <Link to="/my-enrollments" className="enroll">My Enrollments</Link>
        <button className="acc_button">
          Create Account
        </button>
      </div>
      <div className="mobile_menu">
<div>
<button className="join_contri">Become Educator</button>
<Link to="/my-enrollments" className="enroll">My Enrollments</Link>
</div>
<button className="profile"><User /></button>
      </div>
    </div>
  );
};

export default Navbar;
