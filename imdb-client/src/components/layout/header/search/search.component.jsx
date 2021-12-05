import React, { useState, useContext } from "react";
import FormControl from "react-bootstrap/FormControl";
import movieContext from "../../../../common/context/movieContext";

const SearchButtonSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    role="presentation"
  >
    <path fill="none" d="M0 0h24v24H0V0z"></path>
    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
  </svg>
);

const Search = () => {
  const [name, setName] = useState("");
  const {searchQuery, setSearchQuery} = useContext(movieContext);

  return (
    <>
      <div className="search-input-container">
        <FormControl
          type="text"
          placeholder="Search IMDb"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="search-btn-container">
        <button
          type="button"
          className="search-button"
          onClick={() => setSearchQuery({...searchQuery, name})}
        >
          <SearchButtonSvg />
        </button>
      </div>
      
    </>
  );
};

export default Search;
