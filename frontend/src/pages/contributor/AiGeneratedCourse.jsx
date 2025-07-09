import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/GeneratedCourse.css";

const GeneratedCourse = () => {
  const location = useLocation();
  const { response } = location.state || { response: "" };

  const [parsedChapters, setParsedChapters] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);

  useEffect(() => {
    const parsed = parseCourseResponse(response);
    setParsedChapters(parsed);
    if (parsed.length > 0 && parsed[0].lectures.length > 0) {
      setSelectedLecture(parsed[0].lectures[0]);
    }
  }, [response]);

  const parseCourseResponse = (text) => {
    const chapters = text.split(/chapter\s*\d*[:.-]/i).slice(1); // remove intro
    return chapters.map((ch, index) => {
      const lines = ch.trim().split("\n").filter(Boolean);
      const chapterTitle = `Chapter ${index + 1}: ${lines[0].trim()}`;
      const lectures = [];

      let currentLecture = null;
      lines.slice(1).forEach((line) => {
        if (/lecture\s*\d*/i.test(line)) {
          if (currentLecture) lectures.push(currentLecture);
          currentLecture = {
            title: line.trim(),
            content: ""
          };
        } else if (currentLecture) {
          currentLecture.content += line + "\n";
        }
      });
      if (currentLecture) lectures.push(currentLecture);

      return { title: chapterTitle, lectures };
    });
  };

  return (
    <div className="course-container">
      <div className="course-sidebar">
        {parsedChapters.map((chapter, ci) => (
          <div key={ci}>
            <h3>{chapter.title}</h3>
            <ul>
              {chapter.lectures.map((lecture, li) => (
                <li
                  key={li}
                  className={
                    selectedLecture?.title === lecture.title ? "active" : ""
                  }
                  onClick={() => setSelectedLecture(lecture)}
                >
                  {lecture.title}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="course-content">
        {selectedLecture ? (
          <>
            <h2>{selectedLecture.title}</h2>
            <pre>{selectedLecture.content}</pre>
          </>
        ) : (
          <p>No lecture selected</p>
        )}
      </div>
    </div>
  );
};

export default GeneratedCourse;
