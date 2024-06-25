import React, { useState, } from 'react';
import axios from 'axios';
import '../App.css';

const WeatherChecker = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [backgroundImages, setBackgroundImages] = useState([
        `${process.env.PUBLIC_URL}/img/w3.jpg`,
        `${process.env.PUBLIC_URL}/img/weather1.jpg`,
        `${process.env.PUBLIC_URL}/img/566396.jpg`,
        `${process.env.PUBLIC_URL}/img/w4.jpg`,
        `${process.env.PUBLIC_URL}/img/w5.jpg`,
        `${process.env.PUBLIC_URL}/img/w6.jpg`,
        `${process.env.PUBLIC_URL}/img/w7.jpg`,
        `${process.env.PUBLIC_URL}/img/w8.jpg`,
        `${process.env.PUBLIC_URL}/img/w9.jpg`,
    ]);

    const API_KEY = 'f378fa5078f1c0807b02ef58e98e2101'; 

    const getWeather = async () => {
        if (city.trim() === '') {
            setError('City name cannot be empty');
            return;
        }

        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeather(response.data);
            setError(null);
            updateBackgroundAndIcon(response.data.weather[0].main);
        } catch (err) {
            setError('City not found');
            setWeather(null);
        }
    };

    const updateBackgroundAndIcon = (weatherCondition) => {
        const weatherImages = {
            Clear: [
                `${process.env.PUBLIC_URL}/img/clear1.webp`, `${process.env.PUBLIC_URL}/img/clear2.webp`
            ],
            Clouds: [
                `${process.env.PUBLIC_URL}/img/cloud1.webp`, `${process.env.PUBLIC_URL}/img/cloud2.webp`
            ],
            Rain: [
                `${process.env.PUBLIC_URL}/img/rain1.webp`, `${process.env.PUBLIC_URL}/img/rain2.webp`
            ],
            Snow: [
                `${process.env.PUBLIC_URL}/img/snow1.webp`, `${process.env.PUBLIC_URL}/img/snow2.webp`
            ],
            
        };

        setBackgroundImages(weatherImages[weatherCondition] || [
            `${process.env.PUBLIC_URL}/img/weather.webp`,
            `${process.env.PUBLIC_URL}/img/weather.webp`,
            `${process.env.PUBLIC_URL}/img/566396.jpg`,
            `${process.env.PUBLIC_URL}/img/w4.jpg`,
            `${process.env.PUBLIC_URL}/img/w5.jpg`,
            `${process.env.PUBLIC_URL}/img/w6.jpg`,
            `${process.env.PUBLIC_URL}/img/w7.jpg`,
            `${process.env.PUBLIC_URL}/img/w8.jpg`,
            `${process.env.PUBLIC_URL}/img/w9.jpg`,
        ]);
    };

    return (
        <div className="App">
            <div className="background-container">
                {backgroundImages.map((image, index) => (
                    <div key={index} className="background-image" style={{ backgroundImage: `url(${image})`, animationDelay: `${index * 10}s` }} />
                ))}
            </div>
            <div className="container">
                <h1>Weather Checker</h1>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                />
                <button onClick={getWeather}>Get Weather</button>
                {error && <p className="error">{error}</p>}
                {weather && (
                    <div className="weather-info">
                        <h2>{weather.name}</h2>
                        <p>Temperature: {weather.main.temp}°C</p>
                        <p>Weather: {weather.weather[0].description}</p>
                        <p>Humidity: {weather.main.humidity}%</p>
                        <p>Wind Speed: {weather.wind.speed} m/s</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherChecker;