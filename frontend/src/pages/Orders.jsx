import { useState, useEffect } from "react";
import Header from "../components/Header";
import { api } from "../services/api";

const statusColors = {
  pending: { bg: "#f59e0b20", color: "#f59e0b" },
  confirmed: { bg: "#10b98120", color: "#10b981" },
  cancelled: { bg: "#ef444420", color: "#ef4444" },
};

const statusLabels = { pending: "Pending", confirmed: "Confirmed", cancelled: "Cancelled" };

function Orders() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getBookings()
      .then((data) => setBookings(data.bookings || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.updateBooking(id, status);
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="dashboard-content">
      <Header />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1 className="page-title">Booking Requests</h1>
            <p className="page-subtitle">Manage incoming customer booking requests</p>
          </div>
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Car</th>
                  <th>Period</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="8" style={{ textAlign: "center", padding: 40, color: "var(--gray-400)" }}>Loading...</td></tr>
                ) : bookings.length === 0 ? (
                  <tr><td colSpan="8" style={{ textAlign: "center", padding: 40, color: "var(--gray-400)" }}>No booking requests yet</td></tr>
                ) : bookings.map((b) => (
                  <tr key={b.id}>
                    <td className="text-mono">{new Date(b.created_at).toLocaleDateString()}</td>
                    <td>
                      <div className="customer-name">{b.customer_name}</div>
                    </td>
                    <td>
                      <div className="contact-info">
                        <div>{b.customer_email}</div>
                        <div className="text-mono" style={{ fontSize: "0.8rem" }}>{b.customer_phone}</div>
                      </div>
                    </td>
                    <td>{b.car_model}</td>
                    <td>
                      <div className="period-info">
                        <span>{new Date(b.start_date).toLocaleDateString()}</span>
                        <span style={{ color: "var(--gray-400)" }}> → </span>
                        <span>{new Date(b.end_date).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td style={{ maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.message || "—"}</td>
                    <td>
                      <span className="status-badge" style={{
                        backgroundColor: statusColors[b.status]?.bg || "#6b728020",
                        color: statusColors[b.status]?.color || "#6b7280",
                      }}>
                        {statusLabels[b.status] || b.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-btns">
                        {b.status === "pending" && (
                          <>
                            <button className="icon-btn" style={{ color: "#10b981" }} title="Confirm" onClick={() => updateStatus(b.id, "confirmed")}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </button>
                            <button className="icon-btn" style={{ color: "#ef4444" }} title="Cancel" onClick={() => updateStatus(b.id, "cancelled")}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Orders;
