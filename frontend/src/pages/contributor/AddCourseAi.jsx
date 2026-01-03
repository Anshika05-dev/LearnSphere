import React, { useContext, useState } from "react";
import "../../styles/AddCourseAI.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContex";

const AddCourseAi = () => {
  const { backendUrl, getToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [format, setFormat] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prompt = `You are an expert on the topic: ${topic} generate a detailed course of basis of the following description ${description} and ${format} dividing the details into various chapters and further into lectures [eg. chapter1:introduction chapter2:about the topic and so on] also add the video links from youtube if video-based format is choosen and for theory based format add detaild theory also give appropriate titles return a formated document`;

    const token = await getToken();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/gemini/generate",
        { prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(data);

      navigate("/educator/generated-course", { state: { response: data.response } });
    } catch (error) {
      console.error("Error generating course:", error);
    }
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
          <input
            required
            type="text"
            placeholder="Topic.."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <p>Add your Course Description</p>
          <textarea
            placeholder="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p>What Format Should Your Course Follow?</p>
          <select
            required
            className="_addcourseai_select"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="">-- Choose Format --</option>
            <option value="video">Video-Based</option>
            <option value="theory">Theory-Based</option>
          </select>
          <button onClick={handleSubmit} className="_addcourseai_btn2">
            Generate Your Course
          </button>
          <button onClick={handleadd} className="_addcourseai_btn2">
            Add as the Course
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCourseAi;
