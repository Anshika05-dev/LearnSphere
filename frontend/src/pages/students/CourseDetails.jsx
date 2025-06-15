import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContex";
import "../../styles/CourseDetail.css";
import {
  BookOpen,
  CirclePlay,
  Clock,
  ClockAlert,
  Plus,
  Star,
} from "lucide-react";
import Loading from "../../components/students/Loading";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const {
    allCourses,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    currency,
  } = useContext(AuthContext);

  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  };

  useEffect(() => {
    fetchCourseData();
  }, [allCourses]);
  const toggleSection = (index) => {
    setOpenSection((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return courseData ? (
    <>
      <div className="clr">{/* empty spacer */}</div>
      <div className="course_detail">
        <div className="left_col">
          <h1>{courseData.courseTitle}</h1>
          <p
            className="left_col_p"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          ></p>

          <div className="rating_course">
            <p className="left_col_p">{calculateRating(courseData)}</p>
            <div>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  fill={
                    i < Math.floor(calculateRating(courseData))
                      ? "black"
                      : "none"
                  }
                  stroke="black"
                />
              ))}
            </div>
            <p className="ratinglength">
              ({courseData.courseRatings.length}
              {courseData.courseRatings.length > 1 ? " Ratings" : " Rating"})
            </p>
            <p>
              {courseData.enrolledStudents.length}
              {courseData.enrolledStudents.length > 1
                ? " Students Enrolled"
                : " Student Enrolled"}
            </p>
          </div>

          <p>
            Course by:<span className="edu_name"> Anshika Gupta</span>
          </p>

          <div className="course_descrip">
            <h2 className="course_des_heading">Course Structure</h2>
            <div className="chapter_breakdown">
              {courseData.courseContent.map((chapter, index) => (
                <div key={index} className="chapter_breakdown_1">
                  <div
                    className="chapter_breakdown_2"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="chapter_breakdown_3">
                      <Plus
                        className={`${
                          openSection[index] ? "rotate-45" : ""
                        } transition-transform`}
                      />

                      <p className="chapter_breakdown_title">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p>
                      {chapter.chapterContent.length} lectures -{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>
                  <div
                    className={
                      openSection[index]
                        ? "lecture_breakdown_"
                        : "lecture_breakdown"
                    }
                  >
                    <ul className="lecture_breakdown_ulist">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="lecture_breakdown_llist">
                          <CirclePlay className="icon" />
                          <div className="lecture_breakdown_1">
                            <p>{lecture.lectureTitle}</p>
                            <div className="lecture_breakdown_2">
                              {lecture.isPreviewFree && (
                                <p
                                  onClick={() =>
                                    setPlayerData({videoId: lecture.lectureUrl.split('/').pop()})
                                  }
                                  className="preview"
                                >
                                  Preview
                                </p>
                              )}
                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  {
                                    units: ["h", "m"],
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="last_des">Course Description</h3>
            <p
              className="last_des_p"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription,
              }}
            ></p>
          </div>
        </div>

        <div className="right_col">
          {playerData?<YouTube videoId={playerData.videoId} optns={{playerVars:{autoplay:1}}}/>:<img src={courseData.courseThumbnail} className="img_right" />}
          <div className="right_col_1">
            <ClockAlert />
            <p className="offer">
              <span className="offer_days">5 Days</span> Left!!
            </p>
          </div>
          <div className="right_col_2">
            <p className="dis_price">
              {currency}
              {(
                courseData.coursePrice -
                (courseData.discount * courseData.coursePrice) / 100
              ).toFixed(2)}
            </p>
            <p className="udis_price">
              {currency}
              {courseData.coursePrice}
            </p>
            <p>{courseData.discount}% Off</p>
          </div>
          <div className="_course">
            <div className="right_col_3">
              <Clock />
              <p>{calculateCourseDuration(courseData)} |</p>
            </div>
            <div className="right_col_3">
              <BookOpen />
              <p>{calculateNoOfLectures(courseData)} Lectures</p>
            </div>
          </div>
          <div className="enroll">
            <button className="enroll_btn">
              {" "}
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now!"}
            </button>
          </div>
          <div className="right_des">
            <p>What's in the course?</p>
            <ul>
              <li>Lifetime access with free updates.</li>
              <li>Step-by-step, hands-on project guidance.</li>
              <li>Downloadable resources and source code.</li>
              <li>Quizzes to test your knowledge.</li>
              <li>Certificate of completion.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
