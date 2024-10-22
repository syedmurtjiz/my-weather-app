import { useEffect, useState } from "react";
import Card from "./components/Card";
import Input from "./components/Input";
import Button from "./components/Button";
import { useWeather } from "./context/Weather";
import './App.css';
import './styles.css';

function App() {
  const weather = useWeather();
  const [loading, setLoading] = useState(false); // State to manage loading
  const [isDisabled, setIsDisabled] = useState(false); // State to manage button disabled

  console.log(weather);

  useEffect(() => {
    
    weather.fetchCurrentUserLocationData();
  }, []);

  const handleFetchData = () => {
    setIsDisabled(true); // Disable button while loading
    setLoading(true); // Set loading state to true

    weather.fetchData()
      .then(() => {
        // Assuming fetchData returns a promise
        // Handle successful data fetch if needed
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false); // Reset loading state
        setIsDisabled(false); // Enable button again
      });
  };

  return (
    <div>
      <h1>Weather Forecast</h1>
      <Input />
      <Button 
        onClick={handleFetchData} 
        value="Search" 
        className="search" 
        loading={loading} // Pass loading state to Button
        disabled={isDisabled} // Pass disabled state to Button
      />
      <Card />
      <Button 
        onClick={weather.fetchData} 
        value="Refresh" 
        className="refresh"
      /> 
    </div>
  );
}

export default App;
