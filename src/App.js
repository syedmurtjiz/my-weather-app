import Card from './components/Card';
import Button from './components/Button';
import Input from './components/Input';
import './App.css';
import React from 'react';
import { useWeather } from './context/Weather';

function App() {
  const weather = useWeather();
  console.log(weather);

  return (
    <div>
      <h1>Weather Forecast</h1>
      <Input />
      <Button onClick={weather.fetchData} value="Search" />
      <Card />
      <Button onClick={weather.fetchData} value="Refresh" /> {/* Added onClick to Refresh button */}
    </div>
  );
}

export default App;
