const customers = [
  { id: 1, name: "Ahmed Benani", email: "ahmed@example.com", phone: "06 12 34 56 78", rentals: 5, total: "12,500 MAD" },
  { id: 2, name: "Sara Lahlou", email: "sara@example.com", phone: "06 98 76 54 32", rentals: 3, total: "8,400 MAD" },
  { id: 3, name: "Omar Tazi", email: "omar@example.com", phone: "06 55 44 33 22", rentals: 8, total: "21,000 MAD" },
  { id: 4, name: "Nadia Fassi", email: "nadia@example.com", phone: "06 11 22 33 44", rentals: 2, total: "5,500 MAD" },
  { id: 5, name: "Youssef Idrissi", email: "youssef@example.com", phone: "06 77 88 99 00", rentals: 1, total: "1,200 MAD" },
];

function Customers() {
  return (
    <main className="main-content">
        <div className="page-header">
          <div>
            <h1 className="page-title">Customers</h1>
            <p className="page-subtitle">Manage your customer base</p>
          </div>
          <button className="btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Customer
          </button>
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Rentals</th>
                  <th>Total Spent</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id}>
                    <td><div className="customer-name">{c.name}</div></td>
                    <td>{c.email}</td>
                    <td>{c.phone}</td>
                    <td>{c.rentals}</td>
                    <td className="text-right">{c.total}</td>
                    <td>
                      <div className="action-btns">
                        <button className="icon-btn" title="Edit">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
  );
}

export default Customers;
