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

function App() {

  return (
    <>
    <Navbar />
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/adminLogin" element={<LoginPage isAdmin={true} />} />
        <Route path="/partnerDashboard" element={<PrivateRoute element={<PartnerDashboard />} />} />
        <Route path="/customerDashboard" element={<PrivateRoute element={<CustomerDashboard />} />} />
        <Route path="/adminDashboard" element={<PrivateRoute element={<AdminDashboard />} />} />
      </Routes>
    </Router>
    <Footer />
    </>
  )
}

export default App
