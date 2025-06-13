import React, { useState } from "react";
import { Search } from "lucide-react";
import "../../styles/SearchBar.css";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : "");
  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate("/course-list/" + input);
  };
  return (
    <form onSubmit={onSearchHandler} className="search_bar_outer">
      <Search className="search_icon" />
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        placeholder="Try Java Develope Or React Dev "
        className="search_bar"
      />
      <button type="submit" className="search_btn">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
