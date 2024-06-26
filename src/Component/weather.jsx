import React from 'react';
import './weather.css';
import { WiHumidity } from "react-icons/wi";
import { IoMdCloudOutline } from "react-icons/io";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { FaTemperatureEmpty } from "react-icons/fa6";


function Weather({ weatherData, forecastData }) {
  if (!weatherData || !forecastData || !forecastData.list) {
    return <div>No data available</div>;
  }

  const { name, main, weather, wind ,clouds} = weatherData;
  const temperature = main?.temp;
  const feelsLike = main?.feels_like;
  const humidity = main?.humidity;
  const cloud = clouds?.all;
  const description = weather?.[0]?.description;
  const icon = weather?.[0]?.icon;

  // Get the first six timely forecasts for the day
  const timelyForecasts = forecastData.list.slice(0, 6);

  return (
    <div className="weather-container">
      <h2>Current Weather</h2>
      <div className="weather-content">
        <div className="weather-info">
          <div className='forFlex'>
            <div>
              <p>{name}</p>
              <p>{new Date().toLocaleDateString()}</p>
            </div>
            <div className="temperature">
              <p>{Math.round(temperature - 273.15)}°C</p>
              <p className="description">{description}</p>
            </div>
            <div>
              <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} />
            </div>
          </div>
          <span className="head">Air condition</span>
          <span className="details">
            <p><FaTemperatureEmpty />Real Feel <br />{Math.round(feelsLike - 273.15)}°C</p>
            <p><TiWeatherWindyCloudy/> Wind <br />{wind.speed} m/s</p>
            <p><WiHumidity/>Humidity <br />{humidity}%</p>
            <p> <IoMdCloudOutline/>Clouds <br />{cloud} %</p>
          </span>
          <span className="head">Today's Forecast</span>
          <span className="TimelyForecast">
            {timelyForecasts.map((forecast, index) => (
              <div key={index} className="forecastTimely">
                <>
                <p>{new Date(forecast.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </>
                <>
                <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt={forecast.weather[0].description} />
                </>
                <>
                <p>{Math.round(forecast.main.temp - 273.15)}°C</p>
                </>
                
              </div>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Weather;
