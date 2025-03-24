import React from 'react';
import './AboutPage.css';

// Impor foto (sesuaikan path sesuai lokasi file)
import financialAppImage from '../assets/financial-app-illustration.jpg';
import teenSavingImage from '../assets/teen-saving-money.jpg';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Header Section dengan Garis-Garis */}
      <section className="about-header">
        <div className="header-content">
          <h1>Tentang CuanCerdas</h1>
          <p>Sahabat Finansial untuk Generasi Muda</p>
        </div>
        <div className="header-lines">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path
              d="M0,0 L1440,100 M0,20 L1440,120 M0,40 L1440,140 M0,60 L1440,160"
              stroke="#EFFFFB"
              strokeWidth="2"
              fill="none"
              opacity="0.3"
            />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h2>Apa itu CuanCerdas?</h2>
          <p>
            CuanCerdas adalah platform edukasi finansial yang dirancang khusus
            untuk remaja. Kami percaya bahwa literasi finansial adalah keterampilan
            penting yang harus dimiliki sejak dini. Dengan pendekatan yang interaktif
            dan mudah dipahami, CuanCerdas membantu remaja memahami cara mengelola
            keuangan, mulai dari menabung, berinvestasi, hingga merencanakan masa
            depan finansial mereka.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-content">
          <h2>Tujuan Kami</h2>
          <p>
            Tujuan utama CuanCerdas adalah meningkatkan literasi finansial di kalangan
            remaja Indonesia. Kami ingin menciptakan generasi yang cerdas secara
            finansial, mampu membuat keputusan keuangan yang bijak, dan siap menghadapi
            tantangan ekonomi di masa depan. Melalui artikel interaktif, kalkulator
            keuangan, dan tips harian, kami berupaya membuat pembelajaran keuangan
            menjadi menyenangkan dan relevan bagi remaja.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us-section">
        <h2>Mengapa Memilih CuanCerdas?</h2>
        <div className="why-choose-us-cards">
          <div className="why-card">
            <h3>Dirancang untuk Remaja</h3>
            <p>
              Konten kami dibuat dengan bahasa yang sederhana dan desain yang menarik,
              sehingga mudah dipahami oleh remaja berusia 13-18 tahun.
            </p>
          </div>
          <div className="why-card">
            <h3>Fitur Interaktif</h3>
            <p>
              Kami menyediakan fitur seperti artikel keuangan interaktif, kalkulator
              untuk perencanaan keuangan, dan kuis untuk menguji pengetahuan finansial Anda.
            </p>
          </div>
          <div className="why-card">
            <h3>Komunitas yang Mendukung</h3>
            <p>
              Bergabunglah dengan komunitas CuanCerdas untuk berbagi pengalaman,
              bertanya, dan belajar bersama remaja lain yang juga ingin cerdas secara
              finansial.
            </p>
          </div>
        </div>
      </section>

      {/* Financial Apps Section dengan Grid */}
      <section className="financial-apps-section">
        <div className="article-grid">
          <div className="article-image-container">
            <img src={financialAppImage} alt="Ilustrasi Aplikasi Finansial" className="article-image" />
          </div>
          <div className="article-content">
            <h2>Aplikasi Finansial untuk Meningkatkan Literasi Keuangan Remaja</h2>
            <p>
              Di era digital, belajar literasi keuangan menjadi lebih mudah berkat berbagai aplikasi finansial yang dirancang untuk remaja. Aplikasi-aplikasi ini membantu remaja memahami dan mengelola keuangan dengan lebih baik, sekaligus mendukung misi CuanCerdas dalam meningkatkan literasi keuangan. Dengan memanfaatkan teknologi, kamu bisa belajar keuangan kapan saja dan di mana saja, sehingga lebih siap menghadapi tantangan finansial di masa depan.
            </p>
            <div className="article-points">
              <div className="point-card">
                <h3>Greenlight</h3>
                <p>Kartu debit untuk remaja dengan fitur edukasi seperti kuis literasi keuangan.</p>
              </div>
              <div className="point-card">
                <h3>MoneySKILL</h3>
                <p>Kursus online gratis dengan simulasi pengelolaan keuangan.</p>
              </div>
              <div className="point-card">
                <h3>Bumper</h3>
                <p>Aplikasi investasi untuk remaja dengan panduan pasar saham.</p>
              </div>
              <div className="point-card">
                <h3>Hands on Banking</h3>
                <p>Modul edukasi keuangan dari Wells Fargo untuk remaja.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Literacy Importance Section dengan Grid */}
      <section className="literacy-importance-section">
        <div className="article-grid reverse">
          <div className="article-content">
            <h2>Mengapa Literasi Keuangan Penting untuk Remaja dan Bagaimana Memulainya</h2>
            <p>
              Literasi keuangan adalah keterampilan penting bagi remaja di era modern. Menurut Forbes, remaja yang memiliki literasi keuangan yang baik cenderung membuat keputusan finansial yang bijak. Dengan memulai langkah kecil seperti membuat anggaran, menabung secara rutin, dan memanfaatkan teknologi, remaja dapat membangun kebiasaan keuangan yang sehat sejak dini. CuanCerdas hadir untuk mendampingi perjalanan ini dengan konten edukasi yang relevan dan mudah dipahami.
            </p>
            <div className="article-points">
              <div className="point-card">
                <h3>Membangun Kebiasaan Keuangan yang Baik</h3>
                <p>Membuat anggaran sederhana untuk membedakan kebutuhan dan keinginan.</p>
              </div>
              <div className="point-card">
                <h3>Mempersiapkan Masa Depan</h3>
                <p>Menabung untuk tujuan jangka panjang seperti pendidikan atau keadaan darurat.</p>
              </div>
              <div className="point-card">
                <h3>Memahami Peran Teknologi</h3>
                <p>Menggunakan aplikasi dan simulasi untuk belajar keuangan secara interaktif.</p>
              </div>
            </div>
          </div>
          <div className="article-image-container">
            <img src={teenSavingImage} alt="Remaja Menabung" className="article-image" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;