import React, { useState } from 'react';
import './nav.css';
import { Link, useNavigate } from 'react-router-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

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
      <h1><Link to="/">Weather App</Link></h1>
      <ul className="List">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <div className="search">
        <input
          type="text"
          id='inputCity'
          value={city}
          placeholder='City....'
          onChange={(e) => setCity(e.target.value)}
        />
        <button id='SearchBtn' onClick={searchButtonClicked}>Search</button>
      </div>
      <div className='toggleBtn'>
        <DarkModeSwitch
          style={{ marginBottom: '2rem' }}
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={35}
        />
      </div>
    </div>
  );
}

export default Nav;
