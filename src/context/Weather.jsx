import { createContext, useContext, useState } from "react";
import { getWeatherDataForCity, getWeatherDataForLocation } from "../api";

const WeatherContext = createContext(null);

export const useWeather = () => {
  return useContext(WeatherContext);
};

export const WeatherProvider = (props) => {
  const [data, setData] = useState(null);
  const [searchCity, setSearchCity] = useState(null);
  const [error, setError] = useState(null); // State to store error messages

  // Function to fetch weather data for a city
  const fetchData = async () => {
    setError(null); // Reset error before fetching
    if (!searchCity) {
      setError("Please enter a city name."); // Handle empty input
      return;
    }
    try {
      const response = await getWeatherDataForCity(searchCity);
      if (response.error) {
        // Check for API-specific error messages
        setError(response.error); // Set error message from API
      } else {
        setData(response); // Store the fetched weather data
      }
    } catch (err) {
      setError("City not found. Please try again."); // Set error message
    }
  };

  // Function to fetch weather data based on current user location
  const fetchCurrentUserLocationData = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getWeatherDataForLocation(
          position.coords.latitude,
          position.coords.longitude
        )
          .then((response) => {
            if (response.error) {
              setError(response.error); // Handle API-specific error messages
            } else {
              setData(response); // Store the fetched location-based weather data
            }
          })
          .catch((err) => {
            setError("Could not fetch weather data for your location."); 
          });
      },
      (error) => {
        setError("Geolocation not allowed or not supported."); // Handle geolocation errors
      }
    );
  };

  return (
    <WeatherContext.Provider
      value={{
        searchCity,
        data,
        error, // Include error in the context
        setSearchCity,
        fetchData,
        fetchCurrentUserLocationData,
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};
