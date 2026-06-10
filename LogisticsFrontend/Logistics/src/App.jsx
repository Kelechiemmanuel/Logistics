
import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Services from './pages/Services'
import Offices from './pages/Offices'
import Contacts from './pages/Contacts'
import About from './pages/About'
import Account from './pages/Account'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className=''>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/services' element={<Services />}/>
          <Route path='/offices' element={<Offices />}/>
          <Route path='/contacts' element={<Contacts />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/account' element={<Account />}/>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App