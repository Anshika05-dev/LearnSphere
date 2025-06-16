import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/contributor/Navbar";
import "../../styles/Educator.css";
import Sidebar from "../../components/contributor/Sidebar";
import Footer from "../../components/contributor/Footer";

const Educator = () => {
  return (
    <div className="educator">
      <Navbar />
      <div className="educator_1">
        <Sidebar />
        <div className="educator_2">
        {<Outlet />}
        </div></div>
        <Footer />
    </div>
  );
};

export default Educator;
