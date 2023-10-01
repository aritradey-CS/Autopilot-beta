// src/components/SearchBar.js
import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Your code for handling search goes here
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search cars by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
