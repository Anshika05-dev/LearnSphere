import React, { useContext,useState } from "react";
import colored_logo from "../../assets/favicon.png";
import { Link } from "react-router-dom";
import { Menu, User } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import "../../styles/Navbar.css";
import { AuthContext } from "../../context/AuthContex";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { navigate, isEducator } = useContext(AuthContext);
  const iscourselistpage = location.pathname.includes("/course-list");
  const { openSignIn } = useClerk();
  const { user } = useUser();
  return (
    <div className={iscourselistpage ? "edu_nav" : "nav"}>
      <Link to="/">
        <img src={colored_logo} alt="logo" className="logo" />
      </Link>
      <div className="buttons">
        {user && (
          <>
            <button
              onClick={() => navigate("/educator")}
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
                onClick={() => navigate("/educator")}
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
