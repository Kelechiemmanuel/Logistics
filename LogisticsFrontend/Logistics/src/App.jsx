
import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Services from './pages/Services'
import Offices from './pages/Offices'
import Contacts from './pages/Contacts'
import About from './pages/About'
import Account from './pages/Account'
import ProtectedRoute from './components/protectedRoute';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminDashboard from './protected/AdminDashboard';
import CustomerDashboard from './protected/CustomerDashboard';
import DriverDashboard from './protected/DriverDashboard'
import Login from './pages/Login';
import LocalShipping from './services/LocalShipping';
import GlobalShipping from './services/GlobalShipping';
import PersonalShopping from './services/PersonalShopping';
import WareHousing from './services/WareHousing';
import TrackShipment from './pages/TrackShipment';

const App = () => {
  return (
    <div className=''>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/services' element={<Services />} />
          <Route path='/offices' element={<Offices />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/about' element={<About />} />

          <Route path='/account' element={<Account />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/local/shipping' element={<LocalShipping />}/>
          <Route path='/global/shipping' element={<GlobalShipping />}/>
          <Route path='/personal/shopping' element={<PersonalShopping />}/>
          <Route path='/ware/housing' element={<WareHousing />}/>
          <Route path='/track/shipment' element={<TrackShipment />}/>

          <Route path='/admin/dashboard'
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path='/driver/dashboard'
            element={
              <ProtectedRoute allowedRoles={["driver"]}>
                <DriverDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path='/customer/dashboard'
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />



        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App