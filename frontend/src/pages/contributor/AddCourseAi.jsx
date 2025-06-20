import React,{useState} from "react";
import "../../styles/AddCourseAI.css";

const AddCourseAi = () => {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [format, setFormat] = useState("");
  const [aiGeneratedCourse, setAiGeneratedCourse] = useState("");

  const handleSubmit=async(e)=>{
    e.preventDefault()
  };


  return (
    <>
      <div className="_addcourseai">
        <div>
          <h1 className="_addcourseai_h1">Generate Your Course Using AI</h1>
        </div>
        <button className="_addcourseai_btn">Upgrade</button>
      </div>
      <div className="_addcourseai1">
        <form>
          <p>Enter the Topic for your Course:</p>
          <input required type="text" placeholder="Topic.." value={topic} onChange={(e) => setTopic(e.target.value)}/>
          <p>Add your Course Description</p>
          <textarea placeholder="Course Description"  value={description}
            onChange={(e) => setDescription(e.target.value)}/>
          <p>What Format Should Your Course Follow?</p>
          <select required className="_addcourseai_select" value={format}
            onChange={(e) => setFormat(e.target.value)}>
            <option value="">-- Choose Format --</option>
            <option value="video">Video-Based</option>
            <option value="theory">Theory-Based</option>
          </select>
          <button className="_addcourseai_btn2"> Generate Your Course</button>
        </form>
      </div>
    </>
  );
};

export default AddCourseAi;
