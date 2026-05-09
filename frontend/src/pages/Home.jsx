import { useState, useEffect } from "react";
import { api } from "../services/api";

const imgUrl = (path) => path ? `http://127.0.0.1:8000/storage/${path}` : null;

function Home() {
  const [cars, setCars] = useState([]);
  const [showForm, setShowForm] = useState(null);
  const [formData, setFormData] = useState({ customer_name: "", customer_email: "", customer_phone: "", start_date: "", end_date: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [fuelFilter, setFuelFilter] = useState("");

  useEffect(() => {
    api.getCars().then((data) => setCars(data.cars || [])).catch(() => {});
  }, []);

  const openForm = (car) => {
    setShowForm(car);
    setSubmitted(false);
    setFormData({ customer_name: "", customer_email: "", customer_phone: "", start_date: "", end_date: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.submitBooking({ ...formData, car_model: `${showForm.brand} ${showForm.model} ${showForm.year}` });
      setSubmitted(true);
    } catch (err) {
      alert("Erreur: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="navbar-inner">
          <a href="#" className="nav-brand">
            <svg viewBox="0 0 50 50" width="36" height="36">
              <rect width="50" height="50" rx="12" fill="#D4AF37" />
              <path d="M14 35V20l11-8 11 8v15H14z" fill="#1A1A1A" />
              <circle cx="25" cy="28" r="2" fill="#D4AF37" />
            </svg>
            <span className="nav-brand-text">CarRental</span>
          </a>
          <div className="nav-links">
            <a href="#cars">Vehicles</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href="/login" className="nav-cta">Dashboard</a>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Rent the Perfect Car for Your Journey</h1>
          <p>Choose from our premium fleet of vehicles at the best prices in Morocco. Flexible rental periods, comprehensive insurance, and 24/7 support.</p>
          <div className="hero-buttons">
            <a href="#cars" className="btn-gold">Browse Our Fleet</a>
            <a href="#contact" className="btn-outline">Contact Us</a>
          </div>
        </div>
      </section>

      <section id="cars" className="section">
        <div className="section-header">
          <span className="section-badge">Our Fleet</span>
          <h2>Choose Your Vehicle</h2>
          <p>From city cars to luxury SUVs, find the perfect ride for any occasion</p>
        </div>
        <div className="car-filters">
          <input type="text" className="filter-input" placeholder="Search by brand..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="filter-select" value={fuelFilter} onChange={(e) => setFuelFilter(e.target.value)}>
            <option value="">All Fuel Types</option>
            <option value="Essence">Essence</option>
            <option value="Diesel">Diesel</option>
            <option value="Electrique">Electrique</option>
            <option value="Hybride">Hybride</option>
          </select>
        </div>
        <div className="cars-grid-custom">
          {cars.filter(c => c.brand.toLowerCase().includes(search.toLowerCase()) && (fuelFilter === "" || c.fuel === fuelFilter)).length === 0 &&
            <p style={{ textAlign: "center", color: "var(--gray-400)", gridColumn: "1 / -1", padding: "60px 0" }}>
              {search || fuelFilter ? "No cars match your filters." : "No cars available at the moment."}
            </p>
          }
          {cars.filter(c => c.brand.toLowerCase().includes(search.toLowerCase()) && (fuelFilter === "" || c.fuel === fuelFilter)).map((car) => (
            <div key={car.id} className="car-card-custom">
              <div className="car-card-img-wrap">
                {car.image ? (
                  <img src={imgUrl(car.image)} alt={car.brand} className="car-card-img" />
                ) : (
                  <div className="car-card-placeholder">{car.brand.charAt(0)}{car.model.charAt(0)}</div>
                )}
                <span className="car-card-status" data-status={car.status}>
                  {car.status === "available" ? "Available" : car.status === "rented" ? "Rented" : "Maintenance"}
                </span>
              </div>
              <div className="car-card-content">
                <h3>{car.brand} {car.model}</h3>
                <div className="car-card-meta">
                  <span>{car.year}</span>
                  <span>{car.fuel}</span>
                  <span>{car.seats} seats</span>
                  <span>{car.transmission}</span>
                </div>
                <p className="car-card-desc">{car.description || "Premium vehicle in excellent condition, ready for your journey."}</p>
                <div className="car-card-bottom">
                  <span className="car-card-price">{car.price_per_day} MAD <small>/ day</small></span>
                  <button className="btn-gold btn-sm" onClick={() => openForm(car)} disabled={car.status !== "available"}>
                    {car.status === "available" ? "Rent Now" : "Unavailable"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="section section-dark">
        <div className="section-header">
          <span className="section-badge">Why Choose Us</span>
          <h2>Premium Service, Best Prices</h2>
          <p>Experience the highest standard of car rental service in Morocco</p>
        </div>
        <div className="features-custom">
          <div className="feature-custom">
            <div className="feature-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" width="28" height="28">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h4>Fully Insured</h4>
            <p>Comprehensive insurance included with every rental for complete peace of mind.</p>
          </div>
          <div className="feature-custom">
            <div className="feature-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" width="28" height="28">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <h4>Best Prices</h4>
            <p>Competitive rates with transparent pricing. No hidden fees or surprise charges.</p>
          </div>
          <div className="feature-custom">
            <div className="feature-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" width="28" height="28">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h4>24/7 Support</h4>
            <p>Round-the-clock customer support team ready to assist you at any time.</p>
          </div>
          <div className="feature-custom">
            <div className="feature-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" width="28" height="28">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h4>Well Maintained</h4>
            <p>Every vehicle is thoroughly inspected and cleaned before each rental.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="section-header">
          <span className="section-badge">Contact</span>
          <h2>Get In Touch</h2>
          <p>Ready to rent? Reach out to us and we'll get you on the road</p>
        </div>
        <div className="contact-custom">
          <div className="contact-item">
            <div className="contact-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" width="24" height="24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h4>Address</h4>
            <p>123 Rue de la Liberté, Casablanca, Morocco</p>
          </div>
          <div className="contact-item">
            <div className="contact-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" width="24" height="24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <h4>Phone</h4>
            <p><a href="tel:+212773295034" style={{color:"inherit",textDecoration:"none"}}>+212 7 73-29-50-34</a></p>
          </div>
          <div className="contact-item">
            <div className="contact-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" width="24" height="24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <h4>Email</h4>
            <p><a href="mailto:zakaayoub1234@gmail.com" style={{color:"inherit",textDecoration:"none"}}>zakaayoub1234@gmail.com</a></p>
          </div>
          <div className="contact-item">
            <div className="contact-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" width="24" height="24">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <h4>WhatsApp</h4>
            <p><a href="https://wa.me/212773295034" target="_blank" rel="noopener noreferrer" style={{color:"inherit",textDecoration:"none"}}>+212 7 73-29-50-34</a></p>
          </div>
        </div>
      </section>

      <a href="https://wa.me/212773295034" target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="Contact us on WhatsApp">
        <svg viewBox="0 0 24 24" fill="#fff" width="28" height="28"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <svg viewBox="0 0 50 50" width="28" height="28">
              <rect width="50" height="50" rx="12" fill="#D4AF37" />
              <path d="M14 35V20l11-8 11 8v15H14z" fill="#1A1A1A" />
              <circle cx="25" cy="28" r="2" fill="#D4AF37" />
            </svg>
            <span>CarRental</span>
          </div>
          <p>&copy; 2026 CarRental ERP. All rights reserved.</p>
        </div>
      </footer>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowForm(null)}>✕</button>
            {submitted ? (
              <div className="modal-success">
                <div className="success-icon">✓</div>
                <h3>Request Sent!</h3>
                <p>Your booking request for <strong>{showForm.brand} {showForm.model}</strong> has been submitted. We'll contact you shortly to confirm.</p>
                <button className="btn-gold" onClick={() => setShowForm(null)}>Done</button>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <h3>Book: {showForm.brand} {showForm.model}</h3>
                  <p className="modal-price">{showForm.price_per_day} MAD / day</p>
                </div>
                <form className="booking-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input type="text" required value={formData.customer_name} onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })} placeholder="Your name" />
                    </div>
                    <div className="form-group">
                      <label>Email *</label>
                      <input type="email" required value={formData.customer_email} onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })} placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone *</label>
                      <input type="tel" required value={formData.customer_phone} onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })} placeholder="06 XX XX XX XX" />
                    </div>
                    <div className="form-group">
                      <label>Car</label>
                      <input type="text" value={`${showForm.brand} ${showForm.model} ${showForm.year}`} disabled />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Start Date *</label>
                      <input type="date" required value={formData.start_date} onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>End Date *</label>
                      <input type="date" required value={formData.end_date} onChange={(e) => setFormData({ ...formData, end_date: e.target.value })} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Message (optional)</label>
                    <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Any special requests..." rows="3" />
                  </div>
                  <button type="submit" className="btn-gold" disabled={loading} style={{ width: "100%", justifyContent: "center" }}>
                    {loading ? "Sending..." : "Submit Request"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
