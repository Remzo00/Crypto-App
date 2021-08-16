import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from './Pages/LandingPage';
import ProfilePage from './Pages/ProfilePage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
        <Route path="/" exact component={LandingPage} />
          <Route path="/profile" component={ProfilePage}/> 
          
        </Switch>
      </BrowserRouter>     
    </div>
  );
}

export default App;
