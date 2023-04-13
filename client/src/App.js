import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import LandingPage from './components/LandingPage.jsx';
import Cards from './components/Cards.jsx';
import About from './components/About.jsx';
import Detail from './components/Detail.jsx';
import CreateForm from './components/CreateForm.jsx';
import DisplaySearch from './components/DisplaySearch';

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
        <Route path='/detail/:pokeId' element={<Detail />} />;
        <Route path='/search' element={<DisplaySearch />} />;
        <Route path='/create' element={<CreateForm />} />;
      </Routes>
    </div>
  );
}

export default App;
