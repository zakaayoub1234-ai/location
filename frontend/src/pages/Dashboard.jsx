import { useState, useEffect } from "react";
import Header from "../components/Header";
import { api } from "../services/api";

const API_URL = import.meta.env.VITE_API_URL || "";

function StatCard({ title, value, subtitle, icon, gradient }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: gradient + "20", color: "#D4AF37" }}>
        {icon}
      </div>
      <div className="stat-info">
        <span className="stat-title">{title}</span>
        <span className="stat-value">{value}</span>
        {subtitle && <span className="stat-change positive">{subtitle}</span>}
      </div>
    </div>
  );
}

const statusColors = {
  pending: { bg: "rgba(245,158,11,0.15)", color: "#f59e0b" },
  confirmed: { bg: "rgba(16,185,129,0.15)", color: "#10b981" },
  cancelled: { bg: "rgba(239,68,68,0.15)", color: "#ef4444" },
  Active: "rgba(16,185,129,0.15)",
  Completed: "rgba(107,114,128,0.15)",
  Pending: "rgba(245,158,11,0.15)",
};

function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ cars: 0, bookings: 0, pending: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [carsRes, bookingsRes] = await Promise.all([
        api.getCars(),
        api.getBookings().catch(() => ({ bookings: [] })),
      ]);
      const cars = carsRes.cars || [];
      const bookings = bookingsRes.bookings || [];
      const pendingCount = bookings.filter((b) => b.status === "pending").length;
      const totalRevenue = cars.reduce((sum, c) => sum + (parseFloat(c.price_per_day) || 0), 0);
      setStats({ cars: cars.length, bookings: bookings.length, pending: pendingCount, revenue: totalRevenue });
    } catch {} finally {
      setLoading(false);
    }
  };

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
        </div>

        <div className="stats-grid">
          <StatCard
            title="Total Cars"
            value={loading ? "—" : stats.cars}
            subtitle="In fleet"
            gradient="linear-gradient(135deg, #D4AF37, #B8962E)"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10l-1.3-3.2A2 2 0 0 0 12.8 6H9.2a2 2 0 0 0-1.8 1.1L6 10s-3.3.6-4.5 1.1A2 2 0 0 0 0 13v3c0 .6.4 1 1 1h2" />
                <circle cx="6" cy="17" r="2" /><circle cx="18" cy="17" r="2" />
              </svg>
            }
          />
          <StatCard
            title="Total Bookings"
            value={loading ? "—" : stats.bookings}
            subtitle="All time"
            gradient="linear-gradient(135deg, #D4AF37, #B8962E)"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            }
          />
          <StatCard
            title="Pending"
            value={loading ? "—" : stats.pending}
            subtitle="Awaiting action"
            gradient="linear-gradient(135deg, #D4AF37, #B8962E)"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
            }
          />
          <StatCard
            title="Revenue/ Day"
            value={loading ? "—" : stats.revenue.toLocaleString() + " MAD"}
            subtitle="Total daily rate"
            gradient="linear-gradient(135deg, #D4AF37, #B8962E)"
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
              <h2>Quick Actions</h2>
            </div>
            <div className="actions-list">
              <button className="action-item" onClick={() => window.location.href = "/cars"}>
                <div className="action-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
                <div className="action-info">
                  <span className="action-title">Add New Car</span>
                  <span className="action-desc">Register a new vehicle to the fleet</span>
                </div>
              </button>
              <button className="action-item" onClick={() => window.location.href = "/orders"}>
                <div className="action-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" />
                    <polyline points="17 11 19 13 23 9" />
                  </svg>
                </div>
                <div className="action-info">
                  <span className="action-title">Manage Orders</span>
                  <span className="action-desc">Review and confirm booking requests</span>
                </div>
              </button>
              <button className="action-item" onClick={() => window.location.href = "/rentals"}>
                <div className="action-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div className="action-info">
                  <span className="action-title">View Rentals</span>
                  <span className="action-desc">Track active and past rentals</span>
                </div>
              </button>
              <button className="action-item" onClick={() => window.location.href = "/invoices"}>
                <div className="action-icon">
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

          <div className="card quick-actions">
            <div className="card-header">
              <h2>System Info</h2>
            </div>
            <div className="actions-list">
              <div className="action-item" style={{ cursor: "default" }}>
                <div className="action-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="action-info">
                  <span className="action-title">Backend Status</span>
                  <span className="action-desc" style={{ color: "#10b981" }}>● Online</span>
                </div>
              </div>
              <div className="action-item" style={{ cursor: "default" }}>
                <div className="action-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div className="action-info">
                  <span className="action-title">Admin Version</span>
                  <span className="action-desc">v2.0 — Premium Dark Theme</span>
                </div>
              </div>
              <div className="action-item" style={{ cursor: "default" }}>
                <div className="action-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div className="action-info">
                  <span className="action-title">Welcome</span>
                  <span className="action-desc">{user?.name || "Admin User"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
