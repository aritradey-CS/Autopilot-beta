// src/components/CarCard.js
import React from "react";

function CarCard({ car }) {
  return (
    <div className="car-card">
      <img src={car.image} alt={car.name} />
      <h2>{car.name}</h2>
      {/* Add more car details here */}
    </div>
  );
}

export default CarCard;
