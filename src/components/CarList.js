import React from "react";
import carsData from "./carsData.json"; // Make sure to import your car data source
import "./CarList.css"

function CarList({ currentPage, carsPerPage, searchTerm }) {
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;

  const filteredCars = carsData.filter((val) => {
    if (!searchTerm || searchTerm === "") {
      return true;
    }
    return val.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const carsToDisplay = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  return (
    <div className="car-list">
      {carsToDisplay.map((val) => (
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
                <i className="ri-group-fill"></i> People {val.passengerCapacity}
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
  );
}

export default CarList;
