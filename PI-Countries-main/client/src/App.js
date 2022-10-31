import './App.css';
import React from 'react';
import {Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CountryDetail from './components/CountryDetail';
import CreateActivity from './components/CreateActivity';

function App() {
  return (
    <div className="App">
      <h1>Paises del mundo App</h1>
      <Route exact path='/'><LandingPage/></Route>
      <Route path='/home'><Home/></Route>
      <Route path='/countries/:idCountry'><CountryDetail/></Route>
      <Route path='/activities'><CreateActivity/></Route>
    </div>
  );
}

export default App;
