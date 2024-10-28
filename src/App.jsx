import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Navbar from './Components/Navbar';
import BannerSection from './Components/BannerSection';
import DetailsPage from './pages/DetailsPage';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<BannerSection />} />
        <Route path='/country/:code' element={<DetailsPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
