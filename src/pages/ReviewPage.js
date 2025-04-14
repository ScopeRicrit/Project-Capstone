// src/pages/ReviewPage.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import './ReviewPage.css';

const ReviewPage = () => {
  const [selectedReview, setSelectedReview] = useState(null); // State untuk ulasan individu (overlay)
  const [selectedMonthOverlay, setSelectedMonthOverlay] = useState(null); // State untuk overlay histori bulanan
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false); // State untuk dropdown logout
  const [userData, setUserData] = useState({ username: '' }); // State untuk data pengguna
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUserData({ username: storedUsername });
    } else {
      navigate('/accounts');
    }
  }, [navigate]);

  // Mengunci scroll saat overlay aktif
  useEffect(() => {
    if (selectedReview || selectedMonthOverlay) {
      document.body.style.overflow = 'hidden'; // Kunci scroll halaman utama
    } else {
      document.body.style.overflow = 'auto'; // Lepas kunci saat overlay ditutup
    }

    // Cleanup saat komponen unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedReview, selectedMonthOverlay]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('fullName');
    navigate('/accounts');
  };

  const handleReviewClick = (review) => {
    setSelectedReview(review);
    setSelectedMonthOverlay(null); // Tutup overlay bulan jika ada
  };

  const handleMonthClick = (month) => {
    setSelectedMonthOverlay(month);
    setSelectedReview(null); // Tutup overlay ulasan individu jika ada
  };

  const handleCloseOverlay = () => {
    setSelectedReview(null);
    setSelectedMonthOverlay(null);
  };

  // Data placeholder untuk ulasan mingguan (April 2025)
  const weeklyReviews = [
    {
      week: 'Minggu 1 - April 2025',
      summary: 'Pengeluaran terkontrol, tabungan naik 5%.',
      full: 'Pengeluaran minggu ini sangat terkontrol dengan total Rp 500.000 dari pemasukan Rp 2.500.000. Rincian: Rp 200.000 untuk makanan, Rp 150.000 untuk transportasi, Rp 100.000 untuk kebutuhan rumah tangga, dan Rp 50.000 untuk hiburan. Tabungan meningkat 5% (Rp 125.000) dibandingkan minggu lalu karena pengeluaran hanya 20% dari pemasukan. Pola hemat ini baik, terutama pada pengurangan belanja impulsif.',
    },
    {
      week: 'Minggu 2 - April 2025',
      summary: 'Pengeluaran naik 15%, perlu hemat.',
      full: 'Pengeluaran minggu ini naik menjadi Rp 875.000 dari pemasukan Rp 2.500.000 (35%). Rincian: Rp 250.000 untuk makanan, Rp 200.000 untuk transportasi, Rp 300.000 untuk perbaikan elektronik mendadak, dan Rp 125.000 untuk hiburan. Pemasukan stabil, tapi tabungan hanya bertambah Rp 50.000. Pengeluaran meningkat 15% dari minggu sebelumnya. Saran: Kurangi pengeluaran hiburan untuk menjaga tabungan.',
    },
    {
      week: 'Minggu 3 - April 2025',
      summary: 'Pemasukan naik 10%, keuangan sehat.',
      full: 'Pemasukan minggu ini naik 10% menjadi Rp 2.750.000 berkat bonus Rp 250.000. Pengeluaran Rp 600.000 (22%), dengan rincian: Rp 200.000 untuk makanan, Rp 150.000 untuk transportasi, Rp 150.000 untuk tagihan, dan Rp 100.000 untuk hiburan. Tabungan bertambah Rp 150.000. Keuangan sehat karena pengeluaran terkendali di bawah 25%, meskipun ada sedikit peningkatan pada hiburan.',
    },
    {
      week: 'Minggu 4 - April 2025',
      summary: 'Pengeluaran melonjak 30%, evaluasi perlu.',
      full: 'Pengeluaran melonjak menjadi Rp 1.200.000 dari pemasukan Rp 2.500.000 (48%). Rincian: Rp 300.000 untuk makanan, Rp 250.000 untuk transportasi, Rp 500.000 untuk libur panjang (akomodasi dan tiket), dan Rp 150.000 untuk hiburan. Tabungan hanya bertambah Rp 25.000 karena lonjakan 30% dari minggu sebelumnya. Evaluasi diperlukan untuk anggaran liburan agar tidak mengganggu tabungan bulan depan.',
    },
  ];

  // Data placeholder untuk rekap bulanan (April 2025)
  const monthlyRecap = {
    month: 'April 2025',
    summary: 'Pengeluaran rata-rata 22,5%, tabungan naik 3%.',
    full: 'Bulan April 2025 menunjukkan pengeluaran rata-rata 22,5% dari pemasukan total Rp 10.250.000, yaitu Rp 3.175.000. Rincian bulanan: Rp 950.000 untuk makanan, Rp 750.000 untuk transportasi, Rp 800.000 untuk kebutuhan mendadak (perbaikan dan liburan), Rp 425.000 untuk hiburan, dan Rp 250.000 untuk tagihan. Pemasukan naik 5% (Rp 500.000) dari bulan lalu berkat bonus. Tabungan bertambah 3% (Rp 300.000). Lonjakan di minggu ke-4 perlu diperhatikan untuk perencanaan bulan depan.',
  };

  // Data placeholder untuk histori bulanan dan mingguan
  const monthlyHistory = [
    {
      month: 'Maret 2025',
      summary: 'Pengeluaran 20%, tabungan naik 4%.',
      full: 'Pengeluaran Maret rata-rata 20% dari pemasukan Rp 10.000.000, yaitu Rp 2.000.000. Rincian: Rp 800.000 untuk makanan, Rp 600.000 untuk transportasi, Rp 400.000 untuk kebutuhan rumah tangga, dan Rp 200.000 untuk hiburan. Tabungan naik 4% (Rp 400.000) karena pola hemat yang konsisten. Tidak ada pengeluaran besar, menjadikan bulan ini sangat baik secara finansial.',
      weeks: [
        { week: 'Minggu 1 - Maret 2025', summary: 'Pengeluaran 18%, hemat.', full: 'Pengeluaran Rp 450.000 dari Rp 2.500.000 (18%). Rincian: Rp 200.000 makanan, Rp 150.000 transportasi, Rp 100.000 kebutuhan rumah. Tabungan naik Rp 150.000 karena hemat pada hiburan.' },
        { week: 'Minggu 2 - Maret 2025', summary: 'Tabungan naik 2%.', full: 'Pengeluaran Rp 500.000 (20%). Rincian: Rp 200.000 makanan, Rp 150.000 transportasi, Rp 150.000 tagihan. Tabungan bertambah Rp 50.000, stabil tanpa pengeluaran besar.' },
        { week: 'Minggu 3 - Maret 2025', summary: 'Pemasukan naik 5%.', full: 'Pemasukan Rp 2.625.000 (naik 5% dari Rp 125.000 sampingan). Pengeluaran Rp 475.000 (19%): Rp 200.000 makanan, Rp 125.000 transportasi, Rp 150.000 tagihan. Tabungan naik Rp 100.000.' },
        { week: 'Minggu 4 - Maret 2025', summary: 'Pengeluaran 22%.', full: 'Pengeluaran Rp 550.000 (22%). Rincian: Rp 200.000 makanan, Rp 175.000 transportasi, Rp 175.000 kebutuhan rumah. Tabungan bertambah Rp 75.000, masih aman.' },
      ],
    },
    {
      month: 'Februari 2025',
      summary: 'Pengeluaran 25%, lonjakan akhir bulan.',
      full: 'Pengeluaran rata-rata 25% dari pemasukan Rp 11.200.000, yaitu Rp 2.800.000. Rincian: Rp 900.000 makanan, Rp 700.000 transportasi, Rp 800.000 perbaikan kendaraan (minggu 4), Rp 400.000 hiburan. Lonjakan di akhir bulan memengaruhi tabungan, yang hanya naik Rp 200.000. Total pemasukan stabil, tapi perlu perhatian pada pengeluaran mendadak.',
      weeks: [
        { week: 'Minggu 1 - Februari 2025', summary: 'Pengeluaran 20%.', full: 'Pengeluaran Rp 560.000 dari Rp 2.800.000 (20%). Rincian: Rp 225.000 makanan, Rp 175.000 transportasi, Rp 160.000 tagihan. Tabungan naik Rp 100.000, keuangan stabil.' },
        { week: 'Minggu 2 - Februari 2025', summary: 'Pemasukan stabil.', full: 'Pengeluaran Rp 588.000 (21%). Rincian: Rp 225.000 makanan, Rp 175.000 transportasi, Rp 188.000 hiburan. Tabungan bertambah Rp 75.000, stabil.' },
        { week: 'Minggu 3 - Februari 2025', summary: 'Pengeluaran naik 10%.', full: 'Pengeluaran Rp 644.000 (23%). Rincian: Rp 225.000 makanan, Rp 175.000 transportasi, Rp 244.000 kesehatan. Tabungan naik Rp 50.000, ada peningkatan kecil.' },
        { week: 'Minggu 4 - Februari 2025', summary: 'Lonjakan 35%.', full: 'Pengeluaran Rp 980.000 (35%). Rincian: Rp 225.000 makanan, Rp 175.000 transportasi, Rp 500.000 perbaikan kendaraan, Rp 80.000 hiburan. Tabungan hanya naik Rp 25.000 karena lonjakan.' },
      ],
    },
  ];

  return (
    <div className="review-page">
      {/* Header Dashboard */}
      <header className="dashboard-header">
        <div className="header-left">
          <Link to="/" className="back-to-home">
            <i className="fas fa-arrow-left"></i>
          </Link>
          <div className="logo">CuanCerdas</div>
        </div>
        <nav className="dashboard-nav">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/pengeluaran" className="nav-link">Pengeluaran</Link>
          <Link to="/class" className="nav-link">Class</Link>
          <Link to="/review" className="nav-link active">Ulasan</Link>
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

      {/* Konten Review */}
      <div className="review-container">
        <h2>Ulasan Keuangan</h2>

        {/* Bagian Weekly Reviews */}
        <section className="weekly-reviews">
          <h3>Ulasan Mingguan - April 2025</h3>
          <div className="weekly-grid">
            {weeklyReviews.map((review, index) => (
              <div
                key={index}
                className="review-card"
                onClick={() => handleReviewClick(review)}
              >
                <h4>{review.week}</h4>
                <p>{review.summary}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bagian Monthly Recap */}
        <section className="monthly-recap">
          <h3>Rekap Bulanan - {monthlyRecap.month}</h3>
          <div
            className="recap-card"
            onClick={() => handleReviewClick(monthlyRecap)}
          >
            <p>{monthlyRecap.summary}</p>
          </div>
        </section>

        {/* Bagian Monthly History */}
        <section className="monthly-history">
          <h3>Histori Bulanan</h3>
          <div className="history-grid">
            {monthlyHistory.map((history, index) => (
              <div key={index} className="history-card">
                <div
                  className="history-header"
                  onClick={() => handleMonthClick(history)}
                >
                  <h4>{history.month}</h4>
                  <p>Lihat Detail Mingguan</p>
                </div>
                <p>{history.summary}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Overlay untuk Detail Ulasan Individu */}
      {selectedReview && (
        <div className="review-overlay">
          <div className="overlay-content">
            <button className="close-button" onClick={handleCloseOverlay}>
              <span>X</span>
            </button>
            <h3>{selectedReview.week || selectedReview.month}</h3>
            <p>{selectedReview.full}</p>
          </div>
        </div>
      )}

      {/* Overlay untuk Histori Bulanan */}
      {selectedMonthOverlay && (
        <div className="review-overlay">
          <div className="overlay-content">
            <button className="close-button" onClick={handleCloseOverlay}>
              <span>X</span>
            </button>
            <h3>Detail Mingguan - {selectedMonthOverlay.month}</h3>
            <div className="month-weeks-overlay">
              {selectedMonthOverlay.weeks.map((week, idx) => (
                <div
                  key={idx}
                  className="week-item"
                  onClick={() => handleReviewClick(week)}
                >
                  <h5>{week.week}</h5>
                  <p>{week.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewPage;