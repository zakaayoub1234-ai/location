import { useState, useEffect } from "react";
import Header from "../components/Header";
import { api } from "../services/api";

const statusColors = {
  available: { bg: "#10b98120", color: "#10b981" },
  rented: { bg: "#f59e0b20", color: "#f59e0b" },
  maintenance: { bg: "#ef444420", color: "#ef4444" },
};

const statusLabels = { available: "Available", rented: "Rented", maintenance: "Maintenance" };

function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ brand: "", model: "", year: "", plate: "", fuel: "Essence", transmission: "Manual", seats: 5, price_per_day: "", description: "", status: "available" });
  const [image, setImage] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const data = await api.getCars();
      setCars(data.cars || []);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ brand: "", model: "", year: "", plate: "", fuel: "Essence", transmission: "Manual", seats: 5, price_per_day: "", description: "", status: "available" });
    setImage(null);
    setShowForm(true);
  };

  const openEdit = (car) => {
    setEditing(car);
    setForm({ brand: car.brand, model: car.model, year: car.year, plate: car.plate, fuel: car.fuel, transmission: car.transmission, seats: car.seats, price_per_day: car.price_per_day, description: car.description || "", status: car.status });
    setImage(null);
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append("image", image);

      if (editing) await api.updateCar(editing.id, fd);
      else await api.createCar(fd);

      setShowForm(false);
      load();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this car?")) return;
    try {
      await api.deleteCar(id);
      load();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL || "http://127.0.0.1:8000/storage";
  const imgUrl = (path) => path ? `${STORAGE_URL}/${path}` : null;

  return (
    <div className="dashboard-content">
      <Header />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1 className="page-title">Cars</h1>
            <p className="page-subtitle">Manage your fleet of vehicles</p>
          </div>
          <button className="btn-primary" onClick={openAdd}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Car
          </button>
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Car</th>
                  <th>Plate</th>
                  <th>Year</th>
                  <th>Fuel</th>
                  <th>Price/Day</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="7" style={{ textAlign: "center", padding: 40, color: "var(--gray-400)" }}>Loading...</td></tr>
                ) : cars.length === 0 ? (
                  <tr><td colSpan="7" style={{ textAlign: "center", padding: 40, color: "var(--gray-400)" }}>No cars yet. Add your first car!</td></tr>
                ) : cars.map((car) => (
                  <tr key={car.id}>
                    <td>
                      <div className="car-cell">
                        <div className="car-avatar" style={car.image ? { background: "none", padding: 0 } : {}}>
                          {car.image ? <img src={imgUrl(car.image)} alt={car.brand} className="car-thumb" /> : car.brand.charAt(0) + car.model.charAt(0)}
                        </div>
                        <div>
                          <div className="car-name">{car.brand} {car.model}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-mono">{car.plate}</td>
                    <td>{car.year}</td>
                    <td>{car.fuel}</td>
                    <td className="text-right">{car.price_per_day} MAD</td>
                    <td>
                      <span className="status-badge" style={{ backgroundColor: statusColors[car.status]?.bg, color: statusColors[car.status]?.color }}>
                        {statusLabels[car.status] || car.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="icon-btn" title="Edit" onClick={() => openEdit(car)}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button className="icon-btn" title="Delete" onClick={() => handleDelete(car.id)}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                            <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
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

      {/* Add/Edit Car Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowForm(false)}>✕</button>
            <div className="modal-header">
              <h3>{editing ? "Edit Car" : "Add New Car"}</h3>
            </div>
            <form className="booking-form" onSubmit={handleSave}>
              <div className="form-row">
                <div className="form-group">
                  <label>Brand *</label>
                  <input type="text" required value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} placeholder="e.g. Toyota" />
                </div>
                <div className="form-group">
                  <label>Model *</label>
                  <input type="text" required value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} placeholder="e.g. Camry" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Year *</label>
                  <input type="number" required min="2000" max="2030" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Plate *</label>
                  <input type="text" required value={form.plate} onChange={(e) => setForm({ ...form, plate: e.target.value })} placeholder="e.g. 1234-A-1" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Fuel *</label>
                  <select value={form.fuel} onChange={(e) => setForm({ ...form, fuel: e.target.value })}>
                    <option>Essence</option>
                    <option>Diesel</option>
                    <option>Electrique</option>
                    <option>Hybride</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Transmission</label>
                  <select value={form.transmission} onChange={(e) => setForm({ ...form, transmission: e.target.value })}>
                    <option>Manual</option>
                    <option>Automatic</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Seats *</label>
                  <input type="number" required min="1" max="20" value={form.seats} onChange={(e) => setForm({ ...form, seats: parseInt(e.target.value) })} />
                </div>
                <div className="form-group">
                  <label>Price per Day (MAD) *</label>
                  <input type="number" required min="0" step="0.01" value={form.price_per_day} onChange={(e) => setForm({ ...form, price_per_day: e.target.value })} placeholder="e.g. 500" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    <option value="available">Available</option>
                    <option value="rented">Rented</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Image</label>
                  <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                  {editing?.image && !image && <small style={{ color: "var(--gray-400)" }}>Current image will be kept</small>}
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Car description..." rows="3" />
              </div>
              <button type="submit" className="btn-primary" disabled={saving} style={{ width: "100%", justifyContent: "center" }}>
                {saving ? "Saving..." : (editing ? "Update Car" : "Add Car")}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cars;
