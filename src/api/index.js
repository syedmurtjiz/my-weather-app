const baseURL = "https://api.weatherapi.com/v1/current.json?key=e241df2b02e44d8b902153928241810&q";

export const getWeatherDataForCity = async (city) => {
    const response = await fetch(`${baseURL}&q=${city}&aqi=yes`);
    const data = await response.json();
    return data; 
  };
  