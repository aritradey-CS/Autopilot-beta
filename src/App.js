import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CarList from "./components/CarList"; // Use the correct letter casing
import CarDetails from "./components/CarDetails"; // Correct import path for CarDetails

function App() {
  // Your state and logic here

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<CarList />} />
          <Route path="/car/:id" element={<CarDetails />} /> {/* Optional */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
