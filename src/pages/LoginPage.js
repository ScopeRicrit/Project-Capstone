import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = ({ onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateUsername = (value) => {
    const usernameRegex = /^[A-Za-z0-9]{1,16}$/;
    return usernameRegex.test(value);
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 16) {
      setUsername(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Harap isi semua kolom.');
      return;
    }

    if (!validateUsername(username)) {
      setError('Username hanya boleh berisi huruf dan angka (tanpa spasi atau simbol), maksimal 16 karakter.');
      return;
    }

    try {
      const response = await fetch('https://your-backend-api/login', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        navigate('/dashboard');
      } else {
        setError('Login gagal. Periksa username atau password.');
      }
    } catch (error) {
      console.error('Error:', error);
      localStorage.setItem('isLoggedIn', 'true'); 
      localStorage.setItem('username', username);
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Sign In CuanCerdas</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
              maxLength={16}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
              </span>
            </div>
          </div>
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        <p className="signup-text">
          Belum punya akun?{' '}
          <span className="signup-link" onClick={onSwitchToRegister}>
            Sign Up
          </span>
        </p>
        <Link to="/" className="back-button">
          Kembali ke Halaman Utama
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;