import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [keyWord, setKeyWord] = useState("");
  const navigate = useNavigate();

  const seachHandler = (e) => {
    e.preventDefault();
    if (keyWord.trim()) {
      navigate(`/search/${keyWord}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={seachHandler} className="searchForm">
      <input
        type="text"
        placeholder="Search"
        name="q"
        onChange={(e) => setKeyWord(e.target.value)}
      />
      <button hidden type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBox;
