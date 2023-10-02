import React from "react";
import "./CarList.css"; // Import your CSS file for styling
import carsData from "./carsData.json"; // Correct the import path

function CarList() {
  return (
    <div className="car-list">
      {carsData.map((car) => (
        <div className="car-card" key={car.id}>
          <div
            className="car-image"
            style={{ backgroundImage: `url(${car.image})` }}
          ></div>
          <div className="car-details">
            <h4>{car.name}</h4>
            <p>{car.description}</p>
            <ul>
              <li>Year of Launch: {car.year}</li>
              <li>Passenger Capacity: {car.passengerCapacity}</li>
              <li>Mileage: {car.mileage}</li>
              <li>Transmission: {car.transmission}</li>
              <li>Fuel Type: {car.fuelType}</li>
              <li>Price Per Month: {car.pricePerMonth}</li>
            </ul>
            <div className="car-buttons">
              <button className="rent-button">Rent Now</button>
              <button className="love-button">
                Love React ({car.loveCount})
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CarList;
