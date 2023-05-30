import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import AdminDashboard from './pages/AdminDashboard'
import CustomerDashboard from './pages/CustomerDashboard'
import LoginPage from './pages/LoginPage'
import PartnerDashboard from './pages/PartnerDashboard'
import SignupPage from './pages/SignupPage'
import PrivateRoute from './PrivateRoute';
import CreateShipment from './pages/CreateShipment';
import { useState } from 'react';

function App() {
  const [isLoggedin, setIsLoggedIn] = useState(false);

  return (
    <>
    <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedin={isLoggedin} />
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/adminLogin" element={<LoginPage isAdmin={true} />} />
        <Route path="/partnerDashboard" element={<PrivateRoute setIsLoggedIn={setIsLoggedIn} element={<PartnerDashboard />} />} />
        <Route path="/customerDashboard" element={<PrivateRoute setIsLoggedIn={setIsLoggedIn} element={<CustomerDashboard />} />} />
        <Route path="/adminDashboard" element={<PrivateRoute setIsLoggedIn={setIsLoggedIn} element={<AdminDashboard />} />} />
        <Route path="/createShipment" element={<PrivateRoute setIsLoggedIn={setIsLoggedIn} element={<CreateShipment />} />} />
      </Routes>
    </Router>
    <Footer />
    </>
  )
}

export default App
