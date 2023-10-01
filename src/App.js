import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CarList from "./components/CarList";
import CarDetails from "./components/CarDetails";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term

  const handleSearchClick = () => {
    // Perform the search action here using the searchTerm state
    // For example, you can console.log the searchTerm for now
    console.log("Search term:", searchTerm);
  };

  return (
    <div className="App">
      <header className="navbar">
        <div className="search-section">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search cars by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button" onClick={handleSearchClick}>
              <i className="ri-search-line"></i>
            </button>
          </div>
        </div>

        <div className="dropdowns">
          <div className="dropdown1">
            <select id="category">
              <option value="relevance">Relevance</option>
              <option value="priceLowToHigh">Price Low to High</option>
              <option value="priceHighToLow">Price High to Low</option>
            </select>
            <i className="ri-arrow-drop-down-line"></i>
          </div>
          <div className="dropdown2">
            <select id="brand">
              <option value="allBrands">All Brands</option>
              <option value="audi">Audi</option>
              <option value="mercedes">Mercedes</option>
              <option value="bmw">BMW</option>
            </select>
            <i className="ri-arrow-drop-down-line"></i>
          </div>
        </div>
      </header>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<CarList />} />
            <Route path="/car/:id" element={<CarDetails />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
