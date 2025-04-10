import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DashboardPage.css';
import { FaChartLine, FaClock, FaLightbulb, FaSignOutAlt} from 'react-icons/fa';

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [todayExpense, setTodayExpense] = useState(0);
  const [weeklyExpense, setWeeklyExpense] = useState(0);
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const staticData = {
      username: localStorage.getItem('username') || 'User',
      fullName: localStorage.getItem('fullName') || 'Nama Lengkap',
      transactions: savedTransactions,
      isNewUser: !localStorage.getItem('hasProgress'),
    };
    setUserData(staticData);

    const currentDate = new Date();
    const todayStr = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    const todayTotal = savedTransactions
      .filter((tx) => tx.datetime.startsWith(todayStr) && tx.amount < 0)
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    setTodayExpense(todayTotal);

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(currentDate.getDate() - 7);
    const weeklyTotal = savedTransactions
      .filter((tx) => {
        const [datePart] = tx.datetime.split(' ');
        const [day, month, year] = datePart.split('/').map(Number);
        const txDate = new Date(year, month - 1, day);
        return txDate >= oneWeekAgo && tx.amount < 0;
      })
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    setWeeklyExpense(weeklyTotal);

    if (!staticData.isNewUser) {
      localStorage.setItem('hasProgress', 'true');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('fullName');
    localStorage.removeItem('hasProgress');
    localStorage.removeItem('transactions');
    navigate('/accounts');
  };

  const handleViewDetails = () => {
    navigate('/pengeluaran');
  };

  if (!userData) {
    return (
      <div className="loading-overlay">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h3 className="loading-text">Memuat CuanCerdas...</h3>
        </div>
      </div>
    );
  }

  const classRecommendations = [
    { title: 'Dasar-Dasar Menabung', duration: '1 Jam', level: 'Pemula', progress: userData.isNewUser ? 0 : 60 },
    { title: 'Investasi untuk Remaja', duration: '2 Jam', level: 'Menengah', progress: userData.isNewUser ? 0 : 30 },
    { title: 'Mengelola Uang Jajan', duration: '45 Menit', level: 'Pemula', progress: userData.isNewUser ? 0 : 80 },
  ];

  const additionalRecommendations = userData.isNewUser
    ? [
        { title: 'Memahami Budgeting', duration: '1.5 Jam', level: 'Pemula', progress: 0 },
        { title: 'Pengenalan Saham', duration: '2.5 Jam', level: 'Menengah', progress: 0 },
        { title: 'Menabung untuk Liburan', duration: '1 Jam', level: 'Pemula', progress: 0 },
      ]
    : [
        { title: 'Strategi Investasi Lanjutan', duration: '3 Jam', level: 'Lanjutan', progress: 0 },
        { title: 'Mengatur Keuangan Keluarga', duration: '2 Jam', level: 'Menengah', progress: 0 },
      ];

  const recentActivities = userData.transactions
    .filter((tx) => tx.amount < 0)
    .slice(0, 6)
    .map((tx) => ({
      date: tx.datetime.split(' ')[0],
      action: `Menambahkan pengeluaran: ${tx.name}`,
    }));

  const dailyTip = "Cobalah menyisihkan 10% dari uang jajanmu setiap hari untuk tabungan masa depan!";

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="header-left">
          <Link to="/" className="back-to-home">
            <i className="fas fa-arrow-left"></i>
          </Link>
          <div className="logo">CuanCerdas</div>
        </div>
        <nav className="dashboard-nav">
          <Link to="/dashboard" className="active">Dashboard</Link>
          <Link to="/pengeluaran">Pengeluaran</Link>
          <Link to="/class">Class</Link>
          <Link to="/review">Ulasan</Link>
        </nav>
        <div
          className="user-profile"
          onMouseEnter={() => setShowLogoutDropdown(true)}
          onMouseLeave={() => setShowLogoutDropdown(false)}
        >
          <span>{userData.username}</span>
          <div className="profile-icon">
            <i className="fas fa-user-circle"></i>
          </div>
          {showLogoutDropdown && (
            <div className="logout-dropdown">
              <button onClick={handleLogout} className="logout-button">
              <FaSignOutAlt className="logout-icon" />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="dashboard-content">
        <section className="welcome-section">
          <div className="welcome-text">
            <h1>Halo, {userData.fullName}!</h1>
            <p>Kelola keuanganmu dengan cerdas dan raih masa depan yang lebih baik.</p>
          </div>
          <div className="welcome-graphic">
            <FaChartLine size={60} color="#ffffff" />
          </div>
        </section>

        <div className="dashboard-grid">
          <div className="academy-section card floating-card">
            <h2><FaClock /> Akademi Keuangan</h2>
            <div className="class-list">
              {classRecommendations.map((cls, index) => (
                <div key={index} className="class-item">
                  <div className="class-info">
                    <h3>{cls.title}</h3>
                    <p>{cls.duration} • {cls.level}</p>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: `${cls.progress}%` }}></div>
                    </div>
                  </div>
                  <button className="class-button">{cls.progress > 0 ? 'Lanjutkan' : 'Mulai'}</button>
                </div>
              ))}
            </div>
            <div className="additional-recommendations">
              <h3>Rekomendasi Lain</h3>
              {additionalRecommendations.map((cls, index) => (
                <div key={index} className="class-item additional-item">
                  <div className="class-info">
                    <h3>{cls.title}</h3>
                    <p>{cls.duration} • {cls.level}</p>
                  </div>
                  <button className="class-button">Mulai</button>
                </div>
              ))}
            </div>
          </div>

          <div className="stats-section card floating-card">
            <h2><FaChartLine /> Ringkasan Keuangan</h2>
            <div className="stats-item">
              <p>Hari Ini</p>
              <span className="stats-value">Rp {todayExpense.toLocaleString('id-ID')}</span>
            </div>
            <div className="stats-item">
              <p>Minggu Ini</p>
              <span className="stats-value">Rp {weeklyExpense.toLocaleString('id-ID')}</span>
            </div>
            <button className="view-details-btn" onClick={handleViewDetails}>
              Lihat Detail
            </button>
          </div>

          <div className="activity-section card floating-card">
            <h2><FaClock /> Aktivitas Terbaru</h2>
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <p>{activity.date}</p>
                  <p>{activity.action}</p>
                </div>
              ))
            ) : (
              <p>Belum ada aktivitas terbaru.</p>
            )}
          </div>

          <div className="tips-section card floating-card">
            <h2><FaLightbulb /> Tips Harian</h2>
            <p className="daily-tip">{dailyTip}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;