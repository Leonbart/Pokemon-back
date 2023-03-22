import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import LandingPage from './components/LandingPage.jsx';
import Cards from './components/Cards.jsx';
import About from './components/About.jsx'

function App() {
  let location = useLocation();

  return (
    <div className='App'>
      {/* Nav bar is not shown on landing page */}
      {location.pathname === '/' ? null : <Nav />}
      <Routes>
        <Route exact path='/' element={<LandingPage />} />;
        <Route path='/home' element={<Cards />} />;
        <Route path='/about' element={<About />} />;
        {/* 
        <Route path='/detail/:detailId' element={<Detail />} />;
        <Route path='/favorites' element={<Favorites />} />;
        <Route path='*' element={<Error />} />; */}
      </Routes>
    </div>
  );
}

export default App;
