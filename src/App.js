import Home from './Pages/Home/Home';
import './App.css';
import Nav from './Pages/Nav';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import About from './Pages/About/About';
import Guide from './Pages/Guide/Guide';
import Search from './Pages/Search/Search';

function App() {

  return (
    <>
    <Router>
    <Nav></Nav>
    <Routes>
      <Route path='/' element={ <Home/> }/>
      <Route path='/about' element={ <About/> }/>
      <Route path='/guide' element={ <Guide/> }/>
      <Route path='/search' element={ <SearchWithState/> } />
    </Routes>
</Router>
    </>
  );
}


function SearchWithState() {
  const location = useLocation();
  const { city } = location.state || {};
  return <Search city={city} />;
}

export default App;
