import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import gsap from "gsap";
import CarList from "./components/CarList";
import SearchBar from "./components/SearchBar";
import Dropdowns from "./components/Dropdowns";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
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

  const filteredCars = carsData.filter((val) => {
    if (searchTerm === "") {
      return true;
    }
    return val.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  return (
    <div className="App">
      <div className="main" id="main">
        <header className="navbar">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Dropdowns />
        </header>
        <CarList
          currentPage={currentPage}
          carsPerPage={carsPerPage}
          searchTerm={searchTerm}
        />
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
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
