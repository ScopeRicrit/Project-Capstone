import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import DashboardPage from './pages/DashboardPage'; // Impor DashboardPage
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

// Komponen untuk memeriksa apakah pengguna sudah login
const isAuthenticated = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

// Komponen PrivateRoute untuk melindungi rute dashboard
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

// Komponen untuk mengatur layout berdasarkan rute
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarAndFooter = ['/login', '/register', '/dashboard'].includes(location.pathname);

  return (
    <div className="app">
      {!hideNavbarAndFooter && <Navbar />}
      <main>{children}</main>
      {!hideNavbarAndFooter && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/profile" element={<NotFoundPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;