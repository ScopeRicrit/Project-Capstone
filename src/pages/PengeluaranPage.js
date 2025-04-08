import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './PengeluaranPage.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const PengeluaranPage = () => {
  const [userData, setUserData] = useState(null);
  const [expenseTab, setExpenseTab] = useState('Daily');
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
  const navigate = useNavigate();

  const [newExpense, setNewExpense] = useState({
    category: 'Kebutuhan',
    name: '',
    amount: '',
    description: '',
  });

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const staticData = {
      username: localStorage.getItem('username') || 'User',
      fullName: localStorage.getItem('fullName') || 'Nama Lengkap',
      mainBalance: 68789.56,
      linkedAccounts: [
        { name: 'Santander', balance: 12220.65 },
        { name: 'Citybank', balance: 25070.65 },
        { name: 'Citi', balance: 570.00 },
        { name: 'Deutsche Bank', balance: 2680.50 },
        { name: 'Credit Agricole', balance: 2680.50 },
      ],
      transactions: savedTransactions,
      expenses: [
        { category: 'Darurat', amount: savedTransactions.filter(t => t.category === 'Darurat').reduce((sum, t) => sum + Math.abs(t.amount), 0) },
        { category: 'Kebutuhan', amount: savedTransactions.filter(t => t.category === 'Kebutuhan').reduce((sum, t) => sum + Math.abs(t.amount), 0) },
        { category: 'Senang-senang', amount: savedTransactions.filter(t => t.category === 'Senang-senang').reduce((sum, t) => sum + Math.abs(t.amount), 0) },
      ],
    };
    setUserData(staticData);
  }, []);

  useEffect(() => {
    if (showExpenseForm || showSuccessPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showExpenseForm, showSuccessPopup]);

  const formatNumber = (value) => {
    const numericValue = value.replace(/\D/g, '');
    const cappedValue = Math.min(parseInt(numericValue || 0), 100000000);
    return cappedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'amount') {
      const formattedValue = formatNumber(value);
      setNewExpense((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setNewExpense((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmitExpense = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const datetimeStr = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes().toString().padStart(2, '0')}`;

    const amountValue = parseFloat(newExpense.amount.replace(/\./g, ''));

    if (isNaN(amountValue) || amountValue <= 0) {
      alert('Masukkan harga yang valid.');
      return;
    }

    const newTransaction = {
      datetime: datetimeStr,
      name: newExpense.name,
      category: newExpense.category,
      amount: -amountValue,
      description: newExpense.description,
    };

    const updatedTransactions = [newTransaction, ...userData.transactions];
    const updatedExpenses = userData.expenses.map((exp) => {
      if (exp.category === newExpense.category) {
        return { ...exp, amount: exp.amount + amountValue };
      }
      return exp;
    });

    setUserData({
      ...userData,
      transactions: updatedTransactions,
      expenses: updatedExpenses,
    });

    // Simpan ke localStorage
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

    setNewExpense({ category: 'Kebutuhan', name: '', amount: '', description: '' });
    setShowExpenseForm(false);
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('fullName');
    localStorage.removeItem('transactions'); 
    navigate('/login');
  };

  if (!userData) {
    return <div className="pengeluaran-page">Loading...</div>;
  }

  const totalPengeluaran = userData.transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

  const chartData = {
    labels: userData.expenses.map((exp) => exp.category),
    datasets: [
      {
        data: userData.expenses.map((exp) => exp.amount),
        backgroundColor: ['#FF6B6B', '#FF9F40', '#4ECDC4'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    cutout: '70%',
    plugins: { legend: { display: false } },
  };

  return (
    <div className="pengeluaran-page">
      <header className="pengeluaran-header">
        <div className="header-left">
          <Link to="/" className="back-to-home">
            <i className="fas fa-arrow-left"></i>
          </Link>
          <div className="logo">CuanCerdas</div>
        </div>
        <nav className="pengeluaran-nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/pengeluaran" className="active">Pengeluaran</Link>
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
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="pengeluaran-content">
        <div className="pengeluaran-grid">
          <div className="main-balance card">
            <h2>Total Pengeluaran</h2>
            <h1>Rp {totalPengeluaran.toLocaleString('id-ID')}</h1>
            <p className="full-name">{userData.fullName}</p>
            <div className="balance-actions">
              <button
                className="action-button secondary"
                onClick={() => setShowExpenseForm(true)}
              >
                Tambah Pengeluaran
              </button>
            </div>
          </div>

          <div className="standing-orders card">
            <h2>Define standing orders</h2>
            <p>We help you to: Define your recurring payments, and learn to care of regular transactions.</p>
            <button className="action-button">Define standing order</button>
          </div>

          <div className="linked-accounts card">
            <div className="linked-accounts-grid">
              {userData.linkedAccounts.map((account, index) => (
                <div key={index} className="account-item">
                  <span className="account-name">{account.name}</span>
                  <span className="account-balance">Rp {account.balance.toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="transactions card">
            <h2>Pengeluaran Terakhir</h2>
            <div className="transactions-table-wrapper">
              <table>
                <tbody>
                  {userData.transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td>{transaction.datetime}</td>
                      <td>{transaction.name}</td>
                      <td>
                        <span className={`category ${transaction.category.toLowerCase()}`}>
                          {transaction.category}
                        </span>
                      </td>
                      <td className={transaction.amount > 0 ? 'positive' : 'negative'}>
                        {transaction.amount > 0 ? '+' : ''}Rp {Math.abs(transaction.amount).toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="expenses card">
            <h2>All Expenses</h2>
            <div className="expense-tabs">
              <button className={expenseTab === 'Daily' ? 'active' : ''} onClick={() => setExpenseTab('Daily')}>
                Daily
              </button>
              <button className={expenseTab === 'Weekly' ? 'active' : ''} onClick={() => setExpenseTab('Weekly')}>
                Weekly
              </button>
              <button className={expenseTab === 'Monthly' ? 'active' : ''} onClick={() => setExpenseTab('Monthly')}>
                Monthly
              </button>
            </div>
            <div className="expense-content">
              <div className="chart-container">
                <Doughnut data={chartData} options={chartOptions} />
                <div className="chart-center">
                  <span>Rp {userData.expenses.reduce((sum, exp) => sum + exp.amount, 0).toLocaleString('id-ID')}</span>
                </div>
              </div>
              <div className="expense-legend">
                {userData.expenses.map((exp, index) => (
                  <div key={index} className="legend-item">
                    <span
                      className="legend-color"
                      style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}
                    ></span>
                    <span>{exp.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {showExpenseForm && (
          <div className={`expense-form-overlay ${showExpenseForm ? 'slide-in' : ''}`}>
            <div className="expense-form">
              <h2>Tambah Pengeluaran Baru</h2>
              <form onSubmit={handleSubmitExpense}>
                <div className="form-group">
                  <label>Kategori</label>
                  <select name="category" value={newExpense.category} onChange={handleInputChange}>
                    <option value="Darurat">Darurat</option>
                    <option value="Kebutuhan">Kebutuhan</option>
                    <option value="Senang-senang">Senang-senang</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Nama pengeluaran</label>
                  <input
                    type="text"
                    name="name"
                    value={newExpense.name}
                    onChange={handleInputChange}
                    placeholder="Masukkan pengeluaran"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Nominal</label>
                  <input
                    type="text"
                    name="amount"
                    value={newExpense.amount}
                    onChange={handleInputChange}
                    placeholder="Masukkan nominal yang kamu keluarkan"
                    maxLength="11"
                    inputMode="numeric"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Deskripsi</label>
                  <textarea
                    name="description"
                    value={newExpense.description}
                    onChange={handleInputChange}
                    placeholder="Tambahkan deskripsi (opsional)"
                    rows="3"
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="submit-button">Submit</button>
                  <button type="button" className="cancel-button" onClick={() => setShowExpenseForm(false)}>
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showSuccessPopup && (
          <div className={`success-popup-overlay ${showSuccessPopup ? 'slide-in' : ''}`}>
            <div className="success-popup">
              <div className="success-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <h3>Submit Berhasil!</h3>
              <p>Pengeluaran Anda telah ditambahkan ke daftar.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PengeluaranPage;