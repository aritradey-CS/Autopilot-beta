import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CarList from "./components/CarList"; // Use the correct letter casing
import CarDetails from "./components/CarDetails"; // Correct import path for CarDetails
import "./App.css"; // Import your CSS file

function App() {
  // Your state and logic here

  return (
    <div className="App">
      <header className="navbar">
        
        <div className="search-section">
          {/* Search input and button */}
          <input type="text" placeholder="Search cars by name" />
        </div>
          <button>Search</button>
        <div className="dropdowns">
          {/* Dropdowns for Category and Brand */}
          <div className="dropdown">
            
            <select id="category">
              <option value="relevance">Relevance</option>
              <option value="priceLowToHigh">Price Low to High</option>
              <option value="priceHighToLow">Price High to Low</option>
            </select>
          </div>
          <div className="dropdown">
            
            <select id="brand">
              <option value="allBrands">All Brands</option>
              <option value="audi">Audi</option>
              <option value="mercedes">Mercedes</option>
              <option value="bmw">BMW</option>
            </select>
          </div>
        </div>
        </header>
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<CarList />} />
          <Route path="/car/:id" element={<CarDetails />} /> {/* Optional */}
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
