import React, { useState, useEffect } from 'react';
import Home from './Pages/Home/Home';
import './App.css';
import Nav from './Pages/Nav';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import About from './Pages/About/About';
import Guide from './Pages/Guide/Guide';
import Search from './Pages/Search/Search';

function App() {
  const [isDarkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');


    } else {
      document.body.classList.remove('dark-mode');

    }
  }, [isDarkMode]);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    localStorage.setItem('darkMode', JSON.stringify(checked));
  };

  return (
    <Router>
      <Nav isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/about' element={ <About /> } />
        <Route path='/guide' element={ <Guide /> } />
        <Route path='/search' element={ <SearchWithState /> } />
      </Routes>
    </Router>
  );
}

function SearchWithState() {
  const location = useLocation();
  const { city } = location.state || {};
  return <Search city={city} />;
}

export default App;
