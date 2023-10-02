import React from "react";
import "./CarList.css"; // Import your CSS file for styling
import carsData from "./carsData.json";

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
            <div className="car-header">
              <h2>{car.name}</h2>
              <h3>{car.year}</h3>
            </div>
            
          <div className="car-config">
            <div className="config">Capacity: {car.passengerCapacity}</div>
            <div className="config">Mileage: {car.mileage}</div>
            <div className="config">Transmission: {car.transmission}</div>
            <div className="config">Fuel Type: {car.fuelType}</div>

          </div>

                    
            <div className="car-footer">
              <div className="price">
                {car.pricePerMonth} / month
              </div>
              <div className="buttons">
                <button className="rent-button">Rent Now</button>
                <button className="love-button">
                  Love React ({car.loveCount})
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
