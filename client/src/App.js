import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  let location = useLocation();

  return (
    <div className='App' style={{ padding: '25px' }}>
      {/* Nav bar is not shown on landing page */}
      {location.pathname === '/' ? null : <Nav />}
      <Routes>
        <Route exact path='/' element={<LandingPage />} />;
        {/* <Route path='/home' element={<Cards
          characters={characters}
          onClose={onClose}
        />} />;
        <Route path='/about' element={<About />} />;
        <Route path='/detail/:detailId' element={<Detail />} />;
        <Route path='/favorites' element={<Favorites />} />;
        <Route path='*' element={<Error />} />; */}
      </Routes>
    </div>
  );
}

export default App;
