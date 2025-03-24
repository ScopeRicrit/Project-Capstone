import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './DashboardPage.css';

ChartJS.register(ArcElement, Tooltip, Legend);

// Data statis (akan diganti dengan data dari backend)
const staticData = {
  username: localStorage.getItem('username') || 'User',
  mainBalance: 68789.56,
  accountNumber: 'BB 1240 7793 7446 0002 0648',
  linkedAccounts: [
    { name: 'Santander', balance: 12220.65 },
    { name: 'Citybank', balance: 25070.65 },
    { name: 'Citi', balance: 570.00 },
    { name: 'Deutsche Bank', balance: 2680.50 },
    { name: 'Credit Agricole', balance: 2680.50 },
  ],
  transactions: [
    { date: '20.10', name: 'Starbucks Cafe', category: 'Food', amount: -15.00 },
    { date: '20.10', name: 'White Oxford Street 47', category: 'Clothes', amount: -260.40 },
    { date: '20.05', name: 'Spotify Premium', category: 'Entertainment', amount: -10.00 },
    { date: '19.05', name: 'Google Inc.', category: 'Salary', amount: 9500.00 },
    { date: '18.05', name: 'Allergies pl 2.0', category: 'Bills', amount: -29.40 },
    { date: '18.05', name: 'Super-Pharm Warsaw', category: 'Pharmacy', amount: -84.00 },
    { date: '18.05', name: 'Carrefour Express', category: 'Food', amount: -45.79 },
  ],
  expenses: [
    { category: 'Food', amount: 8400 },
    { category: 'Clothes', amount: 2600 },
    { category: 'Entertainment', amount: 1200 },
    { category: 'Health', amount: 1800 },
    { category: 'Bills', amount: 2200 },
    { category: 'Other', amount: 1500 },
  ],
};

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [expenseTab, setExpenseTab] = useState('Daily');

  useEffect(() => {
    // Simulasi fetch data dari backend
    const fetchData = async () => {
      try {
        const response = await fetch('/api/user/dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          setUserData(staticData);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setUserData(staticData);
      }
    };
    fetchData();
  }, []);

  if (!userData) {
    return <div className="dashboard-page">Loading...</div>;
  }

  // Hitung total pengeluaran dari transaksi (hanya transaksi negatif)
  const totalPengeluaran = userData.transactions
    .filter((transaction) => transaction.amount < 0) // Ambil transaksi negatif (pengeluaran)
    .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

  // Data untuk grafik donat
  const chartData = {
    labels: userData.expenses.map((exp) => exp.category),
    datasets: [
      {
        data: userData.expenses.map((exp) => exp.amount),
        backgroundColor: [
          '#FF6B6B', // Food
          '#FF9F40', // Clothes
          '#4ECDC4', // Entertainment
          '#45B7D1', // Health
          '#96CEB4', // Bills
          '#D4A5A5', // Other
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <Link to="/" className="back-to-home">
            <i className="fas fa-arrow-left"></i>
          </Link>
          <div className="logo">CuanCerdas</div>
        </div>
        <nav className="dashboard-nav">
          <a href="#" className="active">My account</a>
          <a href="#">Transactions</a>
          <a href="#">Cards</a>
          <a href="#">Offers</a>
        </nav>
        <div className="user-profile">
          <span>{userData.username}</span>
          <div className="profile-icon">
            <i className="fas fa-user-circle"></i>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Grid Layout */}
        <div className="dashboard-grid">
          {/* Total Pengeluaran (sebelumnya Main Balance) */}
          <div className="main-balance card">
            <h2>Total Pengeluaran</h2>
            <h1>Rp {totalPengeluaran.toLocaleString('id-ID')}</h1>
            <p className="account-number">{userData.accountNumber}</p>
            <div className="balance-actions">
              {/* Hanya tombol Link accounts yang tersisa */}
              <button className="action-button secondary">Link accounts</button>
            </div>
          </div>

          {/* Define Standing Orders */}
          <div className="standing-orders card">
            <h2>Define standing orders</h2>
            <p>We help you to: Define your recurring payments, and learn to care of regular transactions.</p>
            <button className="action-button">Define standing order</button>
          </div>

          {/* Linked Accounts */}
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

          {/* Latest Transactions */}
          <div className="transactions card">
            <h2>Latest transactions</h2>
            <table>
              <tbody>
                {userData.transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.date}</td>
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
            <button className="see-more">See more</button>
          </div>

          {/* All Expenses */}
          <div className="expenses card">
            <h2>All expenses</h2>
            <div className="expense-tabs">
              <button
                className={expenseTab === 'Daily' ? 'active' : ''}
                onClick={() => setExpenseTab('Daily')}
              >
                Daily
              </button>
              <button
                className={expenseTab === 'Weekly' ? 'active' : ''}
                onClick={() => setExpenseTab('Weekly')}
              >
                Weekly
              </button>
              <button
                className={expenseTab === 'Monthly' ? 'active' : ''}
                onClick={() => setExpenseTab('Monthly')}
              >
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
      </div>
    </div>
  );
};

export default DashboardPage;