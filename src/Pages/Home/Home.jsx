import React, { useEffect, useState } from 'react';
import './home.css';
import Weather from '../../Component/weather.jsx';
import Forecast from '../../Component/forecast.jsx';
import loadingImage from '../../Media/loading.gif';


function Home() {
  const API = 'fc09ece2375e8a56ba79bdf5ec57d4da';

  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => {
            setError('Failed to retrieve location');
            setLoading(false);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser');
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    if (location.lat && location.lon) {
      const loadWeather = async () => {
        try {
          const weather_API = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API}`;
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
          const forecast_API = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${API}`;
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
  }, [location, API]);

  if (loading) {
    return <div className='loading'>
      <img src={loadingImage} alt="Loading..." />
    </div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='home'>
      <div className="main-content">
        <div className="current-weather">
          <Weather weatherData={weatherData}  forecastData={forecastData}  />
        </div>
        <div className="weekly-forecast">
          <Forecast forecastData={forecastData} />
        </div>
      </div>
    </div>
  );
}

export default Home;
