import React, { useState } from 'react';
import './ContactPage.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [showOverlay, setShowOverlay] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setShowOverlay(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setTimeout(() => {
        setShowOverlay(false);
      }, 3000);
    }, 500);
  };

  return (
    <div className="contact-page">
      <header className="contact-header">
        <h1>Hubungi Kami</h1>
        <p>Kami siap membantu Anda! Silakan hubungi kami melalui form di bawah ini atau melalui informasi kontak lainnya.</p>
      </header>

      <div className="contact-content">
        <section className="contact-form-section">
          <h2>Kirim Pesan</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Nama Lengkap</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama Anda"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan email Anda"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Nomor Telepon</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Masukkan nomor telepon Anda"
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subjek</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Masukkan subjek pesan"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Pesan</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tulis pesan Anda di sini"
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              Kirim Pesan
            </button>
          </form>
        </section>

        <section className="contact-info-section">
          <h2>Informasi Kontak</h2>
          <div className="contact-info">
            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <p>Jl. Keuangan No. 123, Jakarta, Indonesia</p>
            </div>
            <div className="info-item">
              <FaPhone className="info-icon" />
              <p>+62 21 1234 5678</p>
            </div>
            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <p>support@cuancerdas.com</p>
            </div>
            <div className="info-item">
              <p><strong>Jam Operasional:</strong> Senin - Jumat, 09:00 - 17:00 WIB</p>
            </div>
          </div>

          <div className="social-media">
            <h3>Ikuti Kami</h3>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </section>

        <section className="contact-map-section">
          <h2>Lokasi Kami</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.305056785478!2d106.82214631476992!3d-6.223456995495614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%2C%20Indonesia!5e0!3m2!1sen!2sid!4v1696931234567!5m2!1sen!2sid"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Lokasi CuanCerdas"
            ></iframe>
          </div>
        </section>

        <section className="contact-faq-section">
          <h2>Pertanyaan Umum</h2>
          <div className="faq-item">
            <h3>Bagaimana cara menghubungi tim support?</h3>
            <p>Anda dapat menghubungi kami melalui form di atas, email, atau nomor telepon yang tertera.</p>
          </div>
          <div className="faq-item">
            <h3>Apakah saya bisa mengunjungi kantor secara langsung?</h3>
            <p>Tentu! Silakan kunjungi kami di alamat yang tertera pada jam operasional.</p>
          </div>
          <div className="faq-item">
            <h3>Berapa lama balasan dari tim support?</h3>
            <p>Kami akan membalas pesan Anda dalam waktu 1-2 hari kerja.</p>
          </div>
        </section>
      </div>

      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>Pesan Anda Sudah Dikirim!</h2>
            <p>Terima kasih telah menghubungi kami. Tim kami akan segera merespons pesan Anda.</p>
            <div className="checkmark">
              <svg viewBox="0 0 52 52">
                <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
