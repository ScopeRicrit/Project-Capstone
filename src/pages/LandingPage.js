import React from 'react';
import CountUp from 'react-countup';
import coinImage from '../assets/coin.png';
import articleImage from '../assets/article.jpg';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Tingkatkan Literasi Finansial Anda Bersama CuanCerdas!</h1>
          <p>
            Platform edukasi finansial yang mengajak Anda menguasai keuangan
            dengan cerdas.
          </p>
          <button
            className="cta-button"
            onClick={() => (window.location.href = '/login')}
          >
            Mulai sekarang
          </button>
        </div>
        <div className="hero-image">
          <img src={coinImage} alt="coins" />
        </div>
      </section>

      {/* Fitur Unggulan */}
      <section className="features-section">
        <div className="features-content">
          <h2>CuanCerdas: Sahabat Finansial Generasi Muda</h2>
          <p>
            Selamat datang di CuanCerdas, platform edukasi keuangan yang
            dirancang untuk remaja. Kami membantu Anda mengelola keuangan dengan
            tips interaktif dan analisis cerdas berbasis data.
          </p>
          <div className="stats">
            <div className="stat-card">
              <h3>
                <CountUp start={0} end={50} duration={2.5} suffix="+" />
              </h3>
              <p>Artikel Keuangan</p>
            </div>
            <div className="stat-card">
              <h3>
                <CountUp start={0} end={130} duration={2.5} suffix="+" />
              </h3>
              <p>Pengguna Aktif</p>
            </div>
            <div className="stat-card">
              <h3>
                <CountUp start={0} end={400} duration={2.5} suffix="+" />
              </h3>
              <p>Ulasan Positif</p>
            </div>
          </div>
        </div>
        <div className="features-image">
          <img src={articleImage} alt="Ilustrasi Keuangan" />
        </div>
      </section>

      {/* Keunggulan */}
      <section className="advantages-section">
        <h2>
          CuanCerdas memberikan Financial Anda dengan metode dan langkah yang
          unik, mudah
        </h2>
        <div className="advantages">
          <div className="advantage-card">
            <img
              src="https://via.placeholder.com/50"
              alt="Ikon Keunggulan 1"
            />
            <h3>Meningkatkan literasi keuangan</h3>
            <p>
              Memberikan informasi terkait literasi keuangan yang sesuai dengan
              kebutuhan Anda
            </p>
          </div>
          <div className="advantage-card">
            <img
              src="https://via.placeholder.com/50"
              alt="Ikon Keunggulan 2"
            />
            <h3>Menawarkan berbagai macam fitur</h3>
            <p>
              Menyediakan fitur seperti artikel keuangan interaktif, kalkulator
              keuangan, dan lainnya
            </p>
          </div>
          <div className="advantage-card">
            <img
              src="https://via.placeholder.com/50"
              alt="Ikon Keunggulan 3"
            />
            <h3>Mudah digunakan</h3>
            <p>
              Antarmuka yang ramah pengguna, cocok untuk remaja dan pemula dalam
              literasi keuangan
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;