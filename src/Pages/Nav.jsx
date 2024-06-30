import React, { useState } from 'react';
import './nav.css';
import { Link, useNavigate } from 'react-router-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { WiDaySunny } from 'weather-icons-react';
import { IoSearch } from "react-icons/io5";


function Nav({ isDarkMode, toggleDarkMode }) {
  const navigate = useNavigate();
  const [city, setCity] = useState('');

  const searchButtonClicked = () => {
    if (city.trim() !== "") {
      navigate('/search', { state: { city } });
    } else {
      alert("Please enter a city name");
    }
  };

  return (
    <div className='Header'>
      <h1>
        <Link to="/" className="header-link">
          <WiDaySunny size={40} className="header-icon" />
          <span className="header-text">Weather</span>
        </Link>
      </h1>      <div className="search-container">
        <div className="search">
          <input
            type="text"
            id='inputCity'
            value={city}
            placeholder='City....'
            onChange={(e) => setCity(e.target.value)}
            autocomplete="off"

          />
          <a id='SearchBtn' onClick={searchButtonClicked}><IoSearch size={20} /></a>
        </div>
        <div className='toggleBtn'>
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={35}
          />
        </div>
      </div>
    </div>
  );
}

export default Nav;
