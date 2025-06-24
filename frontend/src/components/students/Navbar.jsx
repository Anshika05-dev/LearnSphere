import React, { useContext,useState } from "react";
import colored_logo from "../../assets/favicon.png";
import { Link } from "react-router-dom";
import { Menu, User } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import "../../styles/Navbar.css";
import { AuthContext } from "../../context/AuthContex";
import axios from "axios";
import { toast } from "react-toastify";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { navigate, isEducator, backendUrl, setIsEducator, getToken } = useContext(AuthContext);
  const iscourselistpage = location.pathname.includes("/course-list");
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const becomeEducator=async()=>{
    try {
      if (isEducator){
        navigate('/educator')
        return;
      }
      const token = await getToken()
      const {data}=await axios.get(backendUrl+'/api/educator/update-role',{
        headers: { Authorization: `Bearer ${token}` }
      })
      if(data.success){
        setIsEducator(true)
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className={iscourselistpage ? "edu_nav" : "nav"}>
      <Link to="/">
        <img src={colored_logo} alt="logo" className="logo" />
      </Link>
      <div className="buttons">
        {user && (
          <>
            <button
              onClick={becomeEducator}
              className="join_contri"
            >
              {isEducator ? "Educator Dashboard" : "Become Educator"}
            </button>
            <Link to="/my-enrollments" className="enroll">
              My Enrollments
            </Link>
          </>
        )}
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()} className="acc_button">
            Create Account
          </button>
        )}
      </div>
      <Menu onClick={() => setShowMenu(!showMenu)} className="mob_menu"/>
      <div className="mobile_menu" style={{display: showMenu? 'flex':'none'}}>
        
          {user && (
            <>
              <button
                onClick={becomeEducator}
                className="join_contri"
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
              <Link to="/my-enrollments" className="enroll">
                My Enrollments
              </Link>
            </>
          )}
        
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()} className="profile">
            <User />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
