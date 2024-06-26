import React from 'react';
import './forecast.css';
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { IoCloudyOutline } from "react-icons/io5";
import { FaTemperatureLow } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";


function Forecast({ forecastData }) {
  if (!forecastData || !forecastData.list) {
    return <div>No forecast data available</div>;
  }

  const getDailyForecasts = (data) => {
    const dailyData = [];
    const seenDays = new Set();

    data.forEach((item) => {
      const date = new Date(item.dt_txt);
      const day = date.getDate();

      if (!seenDays.has(day)) {
        seenDays.add(day);
        dailyData.push(item);
      }
    });

    return dailyData;
  };

  const dailyForecasts = getDailyForecasts(forecastData.list);

  return (
    <div className="forecast">
      <h2>Weekly Forecast</h2>
      <div className="forecast-items">
        {dailyForecasts.map((forecast, index) => (
          <div key={index} className="forecast-item">
            <div className="forecast-date-icon">
              <p className="date">
                <i className='fas fa-calendar-day'></i>
                {new Date(forecast.dt_txt).toLocaleDateString('en-US', { weekday: 'long' })}
              </p>
              <p className="description">
                <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt={forecast.weather[0].description} />
                {forecast.weather[0].description}
              </p>
            </div>
            <div className="forecast-temp-desc">
              <p className="temp"><FaTemperatureLow/>{Math.round(forecast.main.temp - 273.15)}°C</p>
              <p className="clouds"><IoCloudyOutline/> {forecast.clouds.all} %</p>
            </div>
            <div className="forecast-wind-humidity">
              <p className="wind"><TiWeatherWindyCloudy/> {forecast.wind.speed} m/s</p>
              <p className="humidity"><WiHumidity/> {forecast.main.humidity} %</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
