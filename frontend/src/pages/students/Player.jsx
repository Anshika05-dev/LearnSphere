import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Plus, CirclePlay, CheckCheck } from "lucide-react";
import "../../styles/Player.css";
import { AuthContext } from "../../context/AuthContex";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Rating from "../../components/students/Rating";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../components/students/Loading";

const Player = () => {
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [playerData, setPlayerData] = useState({});
  const [progressData, setProgressData] = useState(null);
  const [initialRating, setInitialRating] = useState(0);

  const {
    enrolledCourses,
    calculateChapterTime,
    backendUrl,
    getToken,
    userData,
    fetchEnrolledCourses,
  } = useContext(AuthContext);
  const { courseId } = useParams();
  const getCourseData = () => {
    enrolledCourses.map((course) => {
      if (course._id === courseId) {
        setCourseData(course);
        course.courseRatings.map((item) => {
          if (item.userId === userData._id) {
            setInitialRating(item.rating);
          }
        });
      }
    });
  };
  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseData();
    }
  }, [enrolledCourses]);

  const markLectureAsCompleted = async (lectureId) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/user/update-course-progress",
        { courseId, lectureId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getCourseProgress();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCourseProgress = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/user/get-course-progress",
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        setProgressData(data.progressData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRate = async (rating) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/user/add-rating",
        { courseId, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        fetchEnrolledCourses();
      } else {
        console.log(data)
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getCourseProgress();
  }, []);

  const toggleSection = (index) => {
    setOpenSection((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  return courseData ? (
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
                          {progressData &&
                          progressData.lectureCompleted.includes(
                            lecture.lectureId
                          ) ? (
                            <CheckCheck className="icon" />
                          ) : (
                            <CirclePlay className="icon" />
                          )}
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
            <Rating initialRating={initialRating} onRate={handleRate} />
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
                <button onClick={() => markLectureAsCompleted(playerData.lectureId)} className="about_btn">
                {progressData &&
                progressData.lectureCompleted.includes(playerData.lectureId)
                  ? "Completed"
                  : "Mark As Complete"}
                </button>
              </div>
            </div>
          ) : (
            <div className="_chk">
              <img
                className="thumbnail_img"
                src={courseData ? courseData.courseThumbnail : ""}
              />
            </div>
          )}
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Player;
