import React from 'react'
import Navbar from './components/NavBar';
import AddEvents from './components/AddEvents';
import AllEvents from './components/AllEvents';
import EditEvents from './components/EditEvents';
import NotFound from './components/NotFound';
import CodeFound  from './components/CodeFound';
import AllCities from './components/cities/AllCities'
import EditCities from './components/cities/EditCities'
import AddCities from './components/cities/AddCities'
import AllLocations from './components/location/AllLocations'
import AddLocations from './components/location/AddLocation'
import EditLocations from './components/location/EditLocation'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Cities from './components/cities/Cities';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      {/* <Route path="/" element={<CodeFound />} /> */}
        <Route path="/all" element={<AllEvents />} />
        <Route path="/add" element={<AddEvents />} />
        <Route path="/edit/:id/" element={<EditEvents />} />
        <Route path="/add-ci" element={<AddCities />} />
        <Route path="/edit-ci/:id" element={<EditCities />} />
        <Route path="/all-ci" element={<AllCities />} />
        <Route path="/all-l" element={<AllLocations />} />
        <Route path="/add-l" element={<AddLocations />} />
        <Route path="/edit-l/:id" element={<EditLocations />} />
        {/* <Route  element={<NotFound />} /> */}
    </Routes>
    </BrowserRouter>
  )
}

export default App;

