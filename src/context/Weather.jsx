import { createContext, useContext, useState } from "react";
import { getWeatherDataForCity, getWeatherDataForLocation } from "../api";

const WeatherContext = createContext(null);

// Custom hook to use the WeatherContext
export const useWeather = () => {
  return useContext(WeatherContext);
};

// WeatherProvider component
export const WeatherProvider = (props) => {
  const [data, setData] = useState(null);
  const [searchCity, setSearchCity] = useState(""); // Initialize with an empty string
  const [error, setError] = useState(null);

  // Function to fetch weather data for a city
  const fetchData = async () => {
    setError(null);
    if (!searchCity) {
      setError("Please enter a city name.");
      return;
    }
    try {
      const response = await getWeatherDataForCity(searchCity);
      if (response.error) {
        setError(response.error);
      } else {
        setData(response);
      }
    } catch (err) {
      setError("City not found. Please try again.");
    }
  };

  // Function to fetch weather data based on current user location
  const fetchCurrentUserLocationData = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        getWeatherDataForLocation(position.coords.latitude, position.coords.longitude)
          .then((response) => {
            if (response.error) {
              setError(response.error);
            } else {
              setData(response);
            }
          })
          .catch(() => {
            setError("Could not fetch weather data for your location.");
          });
      },
      () => {
        setError("Geolocation not allowed or not supported.");
      }
    );
  };

  return (
    <WeatherContext.Provider
      value={{
        searchCity,
        data,
        error,
        setSearchCity,
        fetchData,
        fetchCurrentUserLocationData,
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};
