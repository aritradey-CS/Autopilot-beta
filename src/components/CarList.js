import React, { useState } from "react";
import "./CarList.css"; // Import your CSS file for styling
import carsData from "./carsData.json";

function CarList() {
  // Define the number of cars to display per page
  const carsPerPage = 6;

  // Initialize the current page state
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index of the first and last car for the current page
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;

  // Slice the carsData array to get cars for the current page
  const currentCars = carsData.slice(indexOfFirstCar, indexOfLastCar);

  // Calculate the total number of pages
  const totalPages = Math.ceil(carsData.length / carsPerPage);

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

  return (
    <div className="car-list">
      {currentCars.map((car) => (
        <div className="car-card" key={car.id}>
          <div
            className="car-image"
            style={{ backgroundImage: `url(${car.image})` }}
          ></div>
          <div className="car-details">
            <div className="car-header">
              <h2>{car.name}</h2>
              <h3>{car.year}</h3>
            </div>
            <div className="car-config">
              <div className="config">
                <i class="ri-group-fill"></i> People {car.passengerCapacity}
              </div>
              <div className="config">
                <i class="ri-dashboard-3-fill"></i> {car.mileage}
              </div>
              <div className="config">
                <i class="ri-steering-2-fill"></i> {car.transmission}
              </div>
              <div className="config">
                <i class="ri-dashboard-2-fill"></i> {car.fuelType}
              </div>
            </div>
            <div className="car-footer">
              <div className="price">{car.pricePerMonth} / month</div>
              <div className="buttons">
                <button className="love-button">
                  <i class="ri-heart-3-fill"></i> ({car.loveCount})
                </button>
                <button className="rent-button">Rent Now</button>
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
          Previous
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
          Next
        </button>
      </div>
    </div>
  );
}

export default CarList;
