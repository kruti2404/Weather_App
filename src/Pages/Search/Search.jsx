import React, { useEffect, useState } from 'react';
import './search.css';
import Weather from '../../Component/weather';
import Forecast from '../../Component/forecast';
import { useLocation } from 'react-router-dom';
import loadingImage from '../../Media/loading.gif';

function Search() {
  const location = useLocation();
  const { city } = location.state || {};

  const API = 'fc09ece2375e8a56ba79bdf5ec57d4da';

  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (city) {
      setLoading(true);
      setError(null);

      const loadWeather = async () => {
        try {
          const weather_API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`;
          const response = await fetch(weather_API);
          const data = await response.json();

          if (data.cod !== '404') {
            setWeatherData(data);
          } else {
            setError('City not found');
          }
        } catch (error) {
          setError('Failed to fetch weather data');
        }
      };

      const loadForecast = async () => {
        try {
          const forecast_API = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API}`;
          const response = await fetch(forecast_API);
          const data = await response.json();

          if (data.cod !== '404') {
            setForecastData(data);
          } else {
            setError('City not found');
          }
        } catch (error) {
          setError('Failed to fetch forecast data');
        }
      };

      Promise.all([loadWeather(), loadForecast()]).finally(() => setLoading(false));
    }
  }, [city, API]);

  if (loading) {
    return <div className='loading'>
      <img src={loadingImage} alt="Loading..." />
    </div>;
  }

  if (error) {
    return <div className='error'>{error}</div>;
  }

  return (
    <div className='home'>
      <div className="main-content">
        <div className="current-weather">
          <Weather weatherData={weatherData} forecastData={forecastData}/>
        </div>
        <div className="weekly-forecast">
          <Forecast forecastData={forecastData} />
        </div>
      </div>
    </div>
  );
}

export default Search;
