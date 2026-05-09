import { useState, useEffect } from "react";
import Header from "../components/Header";

function StatCard({ title, value, change, icon, color }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ backgroundColor: color + "15", color }}>
        {icon}
      </div>
      <div className="stat-info">
        <span className="stat-title">{title}</span>
        <span className="stat-value">{value}</span>
        <span className="stat-change" style={{ color: change >= 0 ? "#10b981" : "#ef4444" }}>
          {change >= 0 ? "+" : ""}{change}% vs last month
        </span>
      </div>
    </div>
  );
}

const recentRentals = [
  { id: "#R001", customer: "Ahmed Benani", car: "Toyota Camry 2024", date: "2026-05-08", status: "Active", amount: "2,500 MAD" },
  { id: "#R002", customer: "Sara Lahlou", car: "Mercedes GLC 2023", date: "2026-05-07", status: "Active", amount: "4,200 MAD" },
  { id: "#R003", customer: "Omar Tazi", car: "Dacia Duster 2024", date: "2026-05-06", status: "Completed", amount: "1,800 MAD" },
  { id: "#R004", customer: "Nadia Fassi", car: "BMW X5 2024", date: "2026-05-05", status: "Pending", amount: "5,500 MAD" },
  { id: "#R005", customer: "Youssef Idrissi", car: "Renault Clio 2023", date: "2026-05-04", status: "Completed", amount: "1,200 MAD" },
];

const statusColors = {
  Active: "#10b981",
  Completed: "#6b7280",
  Pending: "#f59e0b",
};

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <div className="dashboard-content">
      <Header />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">
              Welcome back, {user?.name || "User"}! Here's what's happening today.
            </p>
          </div>
          <button className="btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Rental
          </button>
        </div>

        <div className="stats-grid">
          <StatCard
            title="Total Cars"
            value="24"
            change={12}
            color="#4F46E5"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10l-1.3-3.2A2 2 0 0 0 12.8 6H9.2a2 2 0 0 0-1.8 1.1L6 10s-3.3.6-4.5 1.1A2 2 0 0 0 0 13v3c0 .6.4 1 1 1h2" />
                <circle cx="6" cy="17" r="2" /><circle cx="18" cy="17" r="2" />
              </svg>
            }
          />
          <StatCard
            title="Active Rentals"
            value="18"
            change={8}
            color="#059669"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            }
          />
          <StatCard
            title="Total Customers"
            value="156"
            change={-3}
            color="#D97706"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
          />
          <StatCard
            title="Revenue"
            value="184,500 MAD"
            change={23}
            color="#0891B2"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            }
          />
        </div>

        <div className="dashboard-grid">
          <div className="card recent-rentals">
            <div className="card-header">
              <h2>Recent Rentals</h2>
              <button className="btn-ghost">View All</button>
            </div>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Car</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRentals.map((rental) => (
                    <tr key={rental.id}>
                      <td className="text-mono">{rental.id}</td>
                      <td>{rental.customer}</td>
                      <td>{rental.car}</td>
                      <td>{rental.date}</td>
                      <td>
                        <span className="status-badge" style={{ backgroundColor: statusColors[rental.status] + "20", color: statusColors[rental.status] }}>
                          {rental.status}
                        </span>
                      </td>
                      <td className="text-right">{rental.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card quick-actions">
            <div className="card-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="actions-list">
              <button className="action-item">
                <div className="action-icon" style={{ backgroundColor: "#4F46E520", color: "#4F46E5" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10l-1.3-3.2A2 2 0 0 0 12.8 6H9.2a2 2 0 0 0-1.8 1.1L6 10s-3.3.6-4.5 1.1A2 2 0 0 0 0 13v3c0 .6.4 1 1 1h2" />
                    <circle cx="6" cy="17" r="2" /><circle cx="18" cy="17" r="2" />
                  </svg>
                </div>
                <div className="action-info">
                  <span className="action-title">Add New Car</span>
                  <span className="action-desc">Register a new vehicle to the fleet</span>
                </div>
              </button>
              <button className="action-item">
                <div className="action-icon" style={{ backgroundColor: "#05966920", color: "#059669" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" />
                    <polyline points="17 11 19 13 23 9" />
                  </svg>
                </div>
                <div className="action-info">
                  <span className="action-title">New Customer</span>
                  <span className="action-desc">Add a customer to the system</span>
                </div>
              </button>
              <button className="action-item">
                <div className="action-icon" style={{ backgroundColor: "#D9770620", color: "#D97706" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div className="action-info">
                  <span className="action-title">Create Rental</span>
                  <span className="action-desc">Start a new car rental contract</span>
                </div>
              </button>
              <button className="action-item">
                <div className="action-icon" style={{ backgroundColor: "#0891B220", color: "#0891B2" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className="action-info">
                  <span className="action-title">Generate Invoice</span>
                  <span className="action-desc">Create an invoice for a rental</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
