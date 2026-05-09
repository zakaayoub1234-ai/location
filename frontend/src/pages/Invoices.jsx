const invoices = [
  { id: "#INV-001", customer: "Ahmed Benani", rental: "#R001", date: "2026-05-08", status: "Paid", amount: "3,500 MAD" },
  { id: "#INV-002", customer: "Sara Lahlou", rental: "#R002", date: "2026-05-07", status: "Unpaid", amount: "8,400 MAD" },
  { id: "#INV-003", customer: "Omar Tazi", rental: "#R003", date: "2026-05-06", status: "Paid", amount: "1,800 MAD" },
  { id: "#INV-004", customer: "Nadia Fassi", rental: "#R004", date: "2026-05-10", status: "Pending", amount: "10,500 MAD" },
];

const statusColors = { Paid: "#10b981", Unpaid: "#ef4444", Pending: "#f59e0b" };

function Invoices() {
  return (
    <main className="main-content">
        <div className="page-header">
          <div>
            <h1 className="page-title">Invoices</h1>
            <p className="page-subtitle">Manage billing and payments</p>
          </div>
          <button className="btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Invoice
          </button>
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Customer</th>
                  <th>Rental</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td className="text-mono">{inv.id}</td>
                    <td>{inv.customer}</td>
                    <td>{inv.rental}</td>
                    <td>{inv.date}</td>
                    <td>
                      <span className="status-badge" style={{ backgroundColor: statusColors[inv.status] + "20", color: statusColors[inv.status] }}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="text-right">{inv.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
  );
}

export default Invoices;
