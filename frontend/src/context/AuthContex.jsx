import { createContext, useState } from "react";
import { useEffect } from "react";
import { dummyCourses } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate= useNavigate()

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);

  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };
  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return totalRating / course.courseRatings.length;
  };
  useEffect(() => {
    fetchAllCourses();
  }, []);
  const value = {
    currency,
    navigate,
    allCourses,
    calculateRating,
    isEducator,
    setIsEducator
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
