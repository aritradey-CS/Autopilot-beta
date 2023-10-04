import React from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-section">
      <div className="search-input-container">
        <input
          id="searchInput"
          type="text"
          placeholder="Search here..."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <i className="ri-search-line"></i>
      </div>
    </div>
  );
}

export default SearchBar;
