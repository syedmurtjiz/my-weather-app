import React from "react";
import { useWeather } from "../context/Weather";

const Input = () => {
  const weather = useWeather();

  return (
    <input
      className="input-field"
      placeholder="Search here"
      value={weather.searchCity || ""} // Use empty string if null
      onChange={(e) => weather.setSearchCity(e.target.value)}
    />
  );
};

export default Input;
