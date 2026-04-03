import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ProtectedRoute from './components/ProtectedRoute';
import LenisScroll from './components/LenisScroll';

// Pages
import Home from './pages/Home';
import AutoLoan from './pages/AutoLoan';
import HomeLoan from './pages/HomeLoan';
import PersonalLoan from './pages/PersonalLoan';
import BusinessLoan from './pages/BusinessLoan';
import UsedCarLoan from './pages/UsedCarLoan';
import LoanAgainstProperty from './pages/LoanAgainstProperty';
import Insurance from './pages/Insurance';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import EMICalculator from './pages/EMICalculator';
import CibilCheck from './pages/CibilCheck';
import Login from './pages/Login';
import Signup from './pages/Signup';
import GoogleAuthSuccess from './pages/GoogleAuthSuccess';
import AdminDashboard from './pages/AdminDashboard';
import Feedback from './pages/Feedback';
import BookAppointment from './pages/BookAppointment';
import CustomerDashboard from './pages/CustomerDashboard';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <LenisScroll />
          <div className="min-h-screen transition-colors duration-300" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auto-loan" element={<AutoLoan />} />
              <Route path="/home-loan" element={<HomeLoan />} />
              <Route path="/personal-loan" element={<PersonalLoan />} />
              <Route path="/business-loan" element={<BusinessLoan />} />
              <Route path="/used-car-loan" element={<UsedCarLoan />} />
              <Route path="/loan-against-property" element={<LoanAgainstProperty />} />
              <Route path="/insurance" element={<Insurance />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/emi-calculator" element={<EMICalculator />} />
              <Route path="/cibil-check" element={<CibilCheck />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/auth/google/success" element={<GoogleAuthSuccess />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/book-appointment" element={<BookAppointment />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <CustomerDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
            <Footer />
            <Chatbot />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
