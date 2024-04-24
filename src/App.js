import React from 'react';
import Register from './component/Register';
import Login from './component/Login'
import Dashboard from './component/Dashboard';
import Home from './component/Home';
import Office from './component/Office';
import LivingRoom from './component/LivingRoom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Bedroom from './component/Bedroom';
import Restroom from './component/Restroom';
import Kitchen from './component/Kitchen';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register/>} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/office' element={<Office />} />
      <Route path='/home' element={<Home />} />
      <Route path='/living-room' element={<LivingRoom />} />
      <Route path='/bedroom' element={<Bedroom />} />
      <Route path='/restroom' element={<Restroom />} />
      <Route path='/kitchen' element={<Kitchen />} />


      
      {/* <Route path='/home' element={<Home />} /> */}
    </Routes>
    </BrowserRouter>
  );
}

export default App;
