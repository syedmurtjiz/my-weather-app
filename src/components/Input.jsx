import React from "react";
import { useWeather } from "../context/Weather";

const Input = () => {
  const weather = useWeather();

  return (
    <input
      className="input-field"
      placeholder="Search here"
      value={weather.searchCity || ""} // Ensure it's always a string
      onChange={(e) => weather.setSearchCity(e.target.value)} // Update context state
    />
  );
};

export default Input;
