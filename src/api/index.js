  const baseURL =
  "https://api.weatherapi.com/v1/current.json?key=e241df2b02e44d8b902153928241810";

export const getWeatherDataForCity = async (city) => {
  console.log('getWeatherDataForCity is called')
  const response = await fetch(`${baseURL}&q=${city}&aqi=yes`);
  return await response.json();
};

export const getWeatherDataForLocation = async (lat, lon) => {
 console.log('getWeatherDataForLocation is called')
  const response = await fetch(`${baseURL}&q=${lat},${lon}&aqi=yes`);
  return await response.json();
};