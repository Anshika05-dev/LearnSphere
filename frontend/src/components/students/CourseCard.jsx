import { Star } from 'lucide-react'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContex'
import { Link } from 'react-router-dom'
import '../../styles/CourseCard.css'

const CourseCard = ({course}) => {
  const{currency , calculateRating }=useContext(AuthContext)
  return (
    <Link to={'/course/'+course._id} onClick={()=>scrollTo(0,0)} className='course_card'>
      <img src={course.courseThumbnail} alt=''/>
      <div className='course_content'>
        <h4>{course.courseTitle}</h4>
        <p className='price'>{course.educator.name}</p>
        <div className='rating'>
          <p>{calculateRating(course)}</p>
          <div>{[...Array(5)].map((_,i)=>(
            <Star 
            key={i}
            fill={i < Math.floor(calculateRating(course)) ? 'black' : 'none'}
            stroke="black"
          />
          ))}</div>
          <p>{course.courseRatings.length}</p>
        </div>
        <p className='price'>{currency}{" "}{(course.coursePrice - course.discount*course.coursePrice/100).toFixed(2)}</p>
      </div>
      </Link>
  )
}

export default CourseCard