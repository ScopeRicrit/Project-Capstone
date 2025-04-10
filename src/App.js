// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import PengeluaranPage from './pages/PengeluaranPage';
import DashboardPage from './pages/DashboardPage';
import ContactPage from './pages/ContactPage';
import ReviewPage from './pages/ReviewPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

const isAuthenticated = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/accounts" />;
};

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarAndFooter = ['/accounts', '/dashboard', '/pengeluaran', '/review', '/notfound'].includes(location.pathname);

  return (
    <div className="app">
      {!hideNavbarAndFooter && <Navbar />}
      <main>{children}</main>
      {!hideNavbarAndFooter && <Footer />}
    </div>
  );
};

const App = () => {
  const [isLogin, setIsLogin] = useState(true); 

  const AccountsWrapper = () => (
    <>
      {isLogin ? (
        <LoginPage onSwitchToRegister={() => setIsLogin(false)} />
      ) : (
        <RegisterPage onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </>
  );

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/accounts" element={<AccountsWrapper />} /> 
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile" element={<NotFoundPage />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute><DashboardPage /></PrivateRoute>}
          />
          <Route
            path="/pengeluaran"
            element={<PrivateRoute><PengeluaranPage /></PrivateRoute>}
          />
          <Route
            path="/review"
            element={<PrivateRoute><ReviewPage /></PrivateRoute>}
          />
          <Route path="/class" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;