import React from "react";
import { useWeather } from '../context/Weather';

const Card = () => {
    const { data, error } = useWeather(); // Destructure data and error

    return (
        <div className="card">
            {error ? (
                <p style={{ color: 'red'}}>Invalid city name.Try another.</p> 
            ) : data ? (
                <>
                    <img src={data.current.condition.icon} alt="Weather icon" />
                    <h2>{data.current.temp_c} °C</h2>
                    <h5>
                        {data.location.name}, {data.location.region} {""} {data.location.country}
                    </h5>
                </>
            ) : (
                <p>Loading weather data...</p> // Optional loading state
            )}
        </div>
    );
};

export default Card;
