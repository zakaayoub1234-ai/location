import Header from "../components/Header";

const rentals = [
  { id: "#R001", customer: "Ahmed Benani", car: "Toyota Camry 2024", start: "2026-05-08", end: "2026-05-15", status: "Active", amount: "3,500 MAD" },
  { id: "#R002", customer: "Sara Lahlou", car: "Mercedes GLC 2023", start: "2026-05-07", end: "2026-05-14", status: "Active", amount: "8,400 MAD" },
  { id: "#R003", customer: "Omar Tazi", car: "Dacia Duster 2024", start: "2026-05-01", end: "2026-05-06", status: "Completed", amount: "1,800 MAD" },
  { id: "#R004", customer: "Nadia Fassi", car: "BMW X5 2024", start: "2026-05-10", end: "2026-05-17", status: "Pending", amount: "10,500 MAD" },
];

const statusColors = { Active: "#10b981", Completed: "#6b7280", Pending: "#f59e0b" };

function Rentals() {
  return (
    <div className="dashboard-content">
      <Header />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1 className="page-title">Rentals</h1>
            <p className="page-subtitle">Track all rental contracts</p>
          </div>
          <button className="btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Rental
          </button>
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Car</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {rentals.map((r) => (
                  <tr key={r.id}>
                    <td className="text-mono">{r.id}</td>
                    <td>{r.customer}</td>
                    <td>{r.car}</td>
                    <td>{r.start}</td>
                    <td>{r.end}</td>
                    <td>
                      <span className="status-badge" style={{ backgroundColor: statusColors[r.status] + "20", color: statusColors[r.status] }}>
                        {r.status}
                      </span>
                    </td>
                    <td className="text-right">{r.amount}</td>
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

export default Rentals;
