import React from "react";

function Dropdowns() {
  return (
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
  );
}

export default Dropdowns;
