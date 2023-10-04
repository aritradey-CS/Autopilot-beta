import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import SearchBar from "./components/SearchBar";

import CarList from "./components/CarList";
import Pagination from "./components/Pagination";
import carsData from "./components/carsData.json";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const carsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  useEffect(() => {
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true,
    });
    gsap.registerPlugin(ScrollTrigger);
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
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();

    // Clean up Locomotive Scroll when the component unmounts
    return () => {
      locoScroll.destroy();
    };
  }, []);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;

  const filteredCars = carsData.filter((val) => {
    if (searchTerm === "") {
      return true;
    }
    return val.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  return (
    <div className="App">
      <div className="main" id="main">
        <header className="navbar">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

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
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />

        <Router>
          <div className="Application">
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
