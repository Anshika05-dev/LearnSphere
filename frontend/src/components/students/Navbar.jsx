import React from "react";
import colored_logo from "../../assets/favicon.png";
import { Link} from "react-router-dom";
import { User } from 'lucide-react';
import { useClerk,UserButton,useUser} from "@clerk/clerk-react";

import '../../styles/Navbar.css'
const Navbar = () => {

  const iscourselistpage = location.pathname.includes("/course-list");
 const {openSignIn}= useClerk();
 const{user}=useUser();
  return (
    <div className={iscourselistpage? "edu_nav":"nav"}>
      <img
        src={colored_logo}
        alt="logo"
        className="logo"
      />
      <div className="buttons">
          {user&&<><button className="join_contri">Become Educator</button>
          <Link to="/my-enrollments" className="enroll">My Enrollments</Link></>}
        { user? <UserButton />:<button onClick={()=>openSignIn()} className="acc_button">
          Create Account
        </button>}
      </div>
      <div className="mobile_menu">
<div>
{user&&<><button className="join_contri">Become Educator</button>
<Link to="/my-enrollments" className="enroll">My Enrollments</Link></>}
</div>
{ user? <UserButton />:<button onClick={()=>openSignIn()} className="profile"><User /></button>}
      </div>
    </div>
  );
};

export default Navbar;
