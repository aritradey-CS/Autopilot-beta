import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CarList from "./components/CarList";
// import CarDetails from "./components/CarDetails";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import "./App.css";
import carsData from "./components/carsData.json";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  // Assuming you want to display 6 cars per page
  const carsPerPage = 6;

  // Initialize the current page state with 1 (assuming you start on the first page)
  const [currentPage, setCurrentPage] = useState(1);

  // Function to handle page change when clicking page numbers
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Function to handle next page click
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle previous page click
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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

  // Calculate the index of the first and last car for the current page
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;

  // Filter and slice the carsData array to get cars for the current page based on search term
  const filteredCars = carsData.filter((val) => {
    if (searchTerm === "") {
      return true; // Show all cars if no search term
    }
    return val.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  // Calculate the total number of pages based on filtered data
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  return (
    <div className="App">
      <div className="main" id="main">
        <header className="navbar">
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
              {/* <button className="search-button" onClick={handleSearchClick}>
                <i className="ri-search-line"></i>
              </button> */}
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

        <div className="car-list">
          {currentCars.map((val) => (
            <div className="car-card" key={val.id}>
              <div
                className="car-image"
                style={{ backgroundImage: `url(${val.image})` }}
              ></div>

              <div className="car-details">
                <div className="car-header">
                  <h2>{val.name}</h2>
                  <h3>{val.year}</h3>
                </div>
                <div className="car-config">
                  <div className="config">
                    <i className="ri-group-fill"></i> People{" "}
                    {val.passengerCapacity}
                  </div>
                  <div className="config">
                    <i className="ri-dashboard-3-fill"></i> {val.mileage}
                  </div>
                  <div className="config">
                    <i className="ri-steering-2-fill"></i> {val.transmission}
                  </div>
                  <div className="config">
                    <i className="ri-dashboard-2-fill"></i> {val.fuelType}
                  </div>
                </div>
                <div className="car-footer">
                  <div className="price">{val.pricePerMonth} / month</div>
                  <div className="buttons">
                    <button className="rent-button">Rent Now</button>
                    <button className="love-button">
                      <i className="ri-heart-3-fill"></i> ({val.loveCount})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="pagination">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1} // Disable the previous button on the first page
            >
              <i className="ri-arrow-left-circle-fill"></i>
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages} // Disable the next button on the last page
            >
              <i className="ri-arrow-right-circle-fill"></i>
            </button>
          </div>
        </div>
        <Router>
          <div className="App">
            <Routes>
              <Route exact path="/" element={<CarList />} />
              {/* <Route path="/car/:id" element={<CarDetails />} /> */}
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
