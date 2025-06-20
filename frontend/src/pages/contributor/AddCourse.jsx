import React, { useEffect, useRef, useState } from "react";
import "../../styles/AddCourse.css";
import uniqid from "uniqid";
import Quill from "quill";
import { MoveDown, UploadCloud, X } from "lucide-react";

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });


  const [collapsedChapters, setCollapsedChapters] = useState({});
  const handleChapter = (action, chapterId) => {
    if (action === "add") {
      const title = prompt("Enter Chapter Name:");

      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterorder:
            chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === "remove") {
      setChapters(
        chapters.filter((chapter) => chapter.chapterId !== chapterId)
      );
    } else if (action === "toggle") {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };
  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === "add") {
      setCurrentChapterId(chapterId);

      setShowPopup(true);
    } else if (action === "remove") {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1);
          }

          return chapter;
        })
      );
    }
  };

  const addLecture = () => {

    setChapters (
    chapters.map((chapter) => {
    if (chapter.chapterId === currentChapterId) {
    const newLecture = {
    ...lectureDetails,
    lectureOrder: chapter.chapterContent.length > 0 ? chapter.
    chapterContent.slice(-1)[0].lectureOrder + 1 : 1,
    lectureId: uniqid()
    };
    chapter.chapterContent.push(newLecture);
  }
   return chapter;  
    })
    
    );
    setShowPopup(false);
    
  
    setLectureDetails({
    lectureTitle:'',
    
    lectureDuration:',',
    lectureUrl:'',
       
    isPreviewFree: false,
    
    });
    
    };
    const handleSubmit=async(e)=>{
      e.preventDefault()
    };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  const toggleChapterCollapse = (index) => {
    setCollapsedChapters((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="_add_course_div1">
      <form onSubmit={handleSubmit} className="_add_course_form">
        <div className="_add_course_div2">
          <p>Course Title</p>
          <input
            required
            type="text"
            placeholder="Type Here"
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            className="form_input_1"
          />
        </div>

        <div className="_add_course_div2">
          <p>Course Description</p>
          <div ref={editorRef}></div>
        </div>

        <div className="_add_course_div3">
          <div className="_add_course_div2">
            <p>Course Price</p>
            <input
              required
              type="number"
              placeholder="0"
              onChange={(e) => setCoursePrice(e.target.value)}
              value={coursePrice}
              className="form_input_1"
            />
          </div>

          <div className="_add_course_div4">
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage" className="lable_1">
              <UploadCloud className="upload" />
              <input
                type="file"
                id="thumbnailImage"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                hidden
              />
              {image && (
                <img src={URL.createObjectURL(image)} alt="thumbnail" />
              )}
            </label>
          </div>
        </div>

        <div className="_add_course_div2">
          <p>Discount %</p>
          <input
            required
            type="number"
            placeholder="0"
            min={0}
            max={100}
            onChange={(e) => setDiscount(e.target.value)}
            value={discount}
            className="form_input_1"
          />
        </div>
        <div className="chapters-container">
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="chapter-card">
              <div className="chapter-header">
                <div className="chapter-info">
                  <MoveDown onClick={() =>
                          handleChapter(
                            "toggle",
                            chapter.chapterId
                          )
                        }
                    className={`dropdown-icon ${
                      chapter.collapsed ? "collapsed" : ""
                    }`}
                  />
                  <span className="chapter-title">
                    {chapterIndex + 1}. {chapter.chapterTitle}
                  </span>
                </div>
                <span className="lecture-count">
                  {chapter.chapterContent.length} Lectures
                </span>
                <X className="delete-icon" onClick={() =>
                          handleChapter(
                            "remove",
                            chapter.chapterId
                          )
                        }/>
              </div>

              {!chapter.collapsed && (
                <div className="lecture-list">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div key={lectureIndex} className="lecture-item">
                      <span>
                        {lectureIndex + 1}. {lecture.lectureTitle} -{" "}
                        {lecture.lectureDuration} mins -{" "}
                        <a
                          href={lecture.lectureUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="lecture-link"
                        >
                          Link
                        </a>{" "}
                        - {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                      </span>
                      <X
                        className="delete-icon"
                        onClick={() =>
                          handleLecture(
                            "remove",
                            chapter.chapterId,
                            lectureIndex
                          )
                        }
                      />
                    </div>
                  ))}
                  <div
                    className="add-lecture-btn"
                    onClick={() => handleLecture("add", chapter.chapterId)}
                  >
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="add-chapter-btn" onClick={() => handleChapter("add")}>
            + Add Chapter
          </div>

          {showPopup && (
            <div className="popup-overlay">
              <div className="popup-content">
                <h2 className="popup-title">Add Lecture</h2>

                <div className="input-group">
                  <p>Lecture Title</p>
                  <input
                    type="text"
                    className="input-field"
                    value={lectureDetails.lectureTitle}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureTitle: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="input-group">
                  <p>Duration (minutes)</p>
                  <input
                    type="number"
                    className="input-field"
                    value={lectureDetails.lectureDuration}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureDuration: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="input-group">
                  <p>Lecture URL</p>
                  <input
                    type="text"
                    className="input-field"
                    value={lectureDetails.lectureUrl}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureUrl: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="checkbox-group">
                  <p>Is Preview Free?</p>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked,
                      })
                    }
                  />
                </div>

                <button type="button" className="submit-btn" onClick={addLecture}>
                  Add
                </button>

                <X className="close-icon" onClick={() => setShowPopup(false)} />
              </div>
            </div>
          )}

          <button type="submit" className="submit-form-btn">
            ADD
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
