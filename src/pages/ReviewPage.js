import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ReviewPage.css';

const ReviewPage = () => {
  const [userData, setUserData] = useState(null);
  const [reviewTab, setReviewTab] = useState('Weekly');
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const staticData = {
      username: localStorage.getItem('username') || 'User',
      fullName: localStorage.getItem('fullName') || 'Nama Lengkap',
      transactions: savedTransactions,
    };
    setUserData(staticData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('fullName');
    localStorage.removeItem('transactions');
    navigate('/login');
  };

  if (!userData) {
    return <div className="review-page">Loading...</div>;
  }

  const weeklyExpenses = userData.transactions
    .filter((tx) => {
      const [datePart] = tx.datetime.split(' ');
      const [day, month, year] = datePart.split('/').map(Number);
      const txDate = new Date(year, month - 1, day);
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return txDate >= oneWeekAgo && tx.amount < 0;
    })
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  const monthlyExpenses = userData.transactions
    .filter((tx) => {
      const [datePart] = tx.datetime.split(' ');
      const [day, month, year] = datePart.split('/').map(Number);
      const txDate = new Date(year, month - 1, day);
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return txDate >= oneMonthAgo && tx.amount < 0;
    })
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  // Placeholder ulasan (nantinya diganti dengan machine learning)
  const weeklyReview = weeklyExpenses > 0
    ? `Minggu ini, kamu telah menghabiskan Rp ${weeklyExpenses.toLocaleString('id-ID')}. Sepertinya kamu cukup aktif berbelanja! Coba tinjau lagi pengeluaran untuk kebutuhan vs senang-senang.`
    : `Minggu ini kamu belum ada pengeluaran. Bagus sekali, mungkin saatnya mulai menabung!`;

  const monthlyReview = monthlyExpenses > 0
    ? `Bulan ini, total pengeluaranmu Rp ${monthlyExpenses.toLocaleString('id-ID')}. Pengeluaranmu cukup terkontrol, tapi mungkin ada ruang untuk lebih hemat di kategori tertentu.`
    : `Bulan ini kamu belum ada pengeluaran. Pertahankan kebiasaan baik ini!`;

  return (
    <div className="review-page">
      <header className="review-header">
        <div className="header-left">
          <Link to="/" className="back-to-home">
            <i className="fas fa-arrow-left"></i>
          </Link>
          <div className="logo">CuanCerdas</div>
        </div>
        <nav className="review-nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/pengeluaran">Pengeluaran</Link>
          <Link to="/class">Class</Link>
          <Link to="/review" className="active">Ulasan</Link>
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
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="review-content">
        <h1>Ulasan Pengeluaran Anda</h1>
        <div className="review-tabs">
          <button
            className={reviewTab === 'Weekly' ? 'active' : ''}
            onClick={() => setReviewTab('Weekly')}
          >
            Mingguan
          </button>
          <button
            className={reviewTab === 'Monthly' ? 'active' : ''}
            onClick={() => setReviewTab('Monthly')}
          >
            Bulanan
          </button>
        </div>
        <div className="review-details card">
          <h2>{reviewTab === 'Weekly' ? 'Ulasan Mingguan' : 'Ulasan Bulanan'}</h2>
          <p className="review-text">
            {reviewTab === 'Weekly' ? weeklyReview : monthlyReview}
          </p>
          <div className="expense-summary">
            <p>Total Pengeluaran: Rp {(reviewTab === 'Weekly' ? weeklyExpenses : monthlyExpenses).toLocaleString('id-ID')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;