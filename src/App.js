import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CarList from "./components/CarList";
import CarDetails from "./components/CarDetails";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger"; // Import ScrollTrigger
import LocomotiveScroll from "locomotive-scroll"; // Import Locomotive Scroll
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Initialize Locomotive Scroll once the component is mounted
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true,
    });

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Enable smooth scrolling and proxy methods
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.querySelector("#main").style.transform
        ? "transform"
        : "fixed",
    });

    // Update Locomotive Scroll when ScrollTrigger refreshes
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // Refresh ScrollTrigger and Locomotive Scroll
    ScrollTrigger.refresh();

    // Clean up Locomotive Scroll when the component unmounts
    return () => {
      locoScroll.destroy();
    };
  }, []);

  const handleSearchClick = () => {
    console.log("Search term:", searchTerm);
  };

  return (
    <div className="App">
      <div className="main" id="main">
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
    </div>
  );
}

export default App;
