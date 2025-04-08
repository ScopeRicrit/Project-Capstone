import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateUsername = (value) => {
    const usernameRegex = /^[A-Za-z0-9]{1,16}$/; // Hanya huruf dan angka, max 16 karakter
    return usernameRegex.test(value);
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 16) {
      setUsername(value);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !fullName || !password) {
      setError('Harap isi semua kolom.');
      return;
    }

    if (!validateUsername(username)) {
      setError('Username hanya boleh berisi huruf dan angka (tanpa spasi atau simbol), maksimal 16 karakter.');
      return;
    }

    try {
      const response = await fetch('https://your-backend-api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, fullName, password }),
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('fullName', fullName);
        navigate('/dashboard');
      } else {
        setError('Pendaftaran gagal. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      localStorage.setItem('fullName', fullName);
      navigate('/dashboard');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Sign Up for CuanCerdas</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleRegister} className="register-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
              maxLength={16} // Batas maksimal di input
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="fullName">Nama Lengkap</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
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
          <button type="submit" className="register-button">
            Sign Up
          </button>
          <p className="signin-link">
            Sudah punya akun? <Link to="/login">Sign In</Link>
          </p>
          <Link to="/" className="back-button">
            Kembali ke Halaman Utama
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;