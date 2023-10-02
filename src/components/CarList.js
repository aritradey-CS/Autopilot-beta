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
            <div className="config"><i class="ri-group-fill"></i> People {car.passengerCapacity}</div>
            <div className="config"><i class="ri-dashboard-3-fill"></i>  {car.mileage}</div>
            <div className="config"><i class="ri-steering-2-fill"></i>  {car.transmission}</div>
            <div className="config"><i class="ri-dashboard-2-fill"></i>  {car.fuelType}</div>

          </div>

                    
            <div className="car-footer">
              <div className="price">
                {car.pricePerMonth} / month
              </div>
              <div className="buttons">
                <button className="love-button"><i class="ri-heart-3-fill"></i>({car.loveCount})
                              <button className="rent-button">Rent Now</button>
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
