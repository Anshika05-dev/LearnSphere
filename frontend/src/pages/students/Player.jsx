import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Plus, CirclePlay } from "lucide-react";
import "../../styles/Player.css";
import { AuthContext } from "../../context/AuthContex";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Rating from "../../components/students/Rating";

const Player = () => {
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [playerData, setPlayerData] = useState({});

  const { enrolledCourses, calculateChapterTime } = useContext(AuthContext);
  const { courseId } = useParams();
  const getCourseData = () => {
    enrolledCourses.map((course) => {
      if (course._id === courseId) {
        setCourseData(course);
      }
    });
  };
  useEffect(() => {
    getCourseData();
  }, [enrolledCourses]);
  const toggleSection = (index) => {
    setOpenSection((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  return (
    <>
      <div className="_player">
        <div className="left_play">
          <h2>Course Structure</h2>
          <div className="chapter_breakdown">
            {courseData &&
              courseData.courseContent.map((chapter, index) => (
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
                              {lecture.lectureUrl && (
                                <p
                                  onClick={() =>
                                    setPlayerData({
                                      ...lecture,
                                      chapter: index + 1,
                                      lecture: i + 1,
                                    })
                                  }
                                  className="preview"
                                >
                                  Watch
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
          <div className="_ratings">
            <h1>Rate this Course:</h1>
            <Rating initialRating={0}/>
          </div>
        </div>

        <div className="right_div">
          {playerData.lectureUrl ? (
            <div className="youtube-wrapper">
              <YouTube 
                videoId={
                  playerData.lectureUrl
                    ? playerData.lectureUrl.split("/").pop()
                    : null
                }
              />

              <div className="about_lec">
                <p className="about_p">
                  {playerData.chapter}.{playerData.lecture}{" "}
                  {playerData.lectureTitle}
                </p>
                <button className="about_btn">{false? 'Completed':'Mark As Complete'}</button>
              </div>
            </div>
          ) : (
            <div className="_chk">
            <img
              className="thumbnail_img"
              src={courseData ? courseData.courseThumbnail : ""}
            />
            <button className="about_btn">{false? 'Completed':'Mark As Complete'}</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Player;
