import { useState, useEffect, useRef } from "react";
import { api } from "../services/api";
import "./Home.css";

const BASE = import.meta.env.VITE_STORAGE_URL || "http://127.0.0.1:8000/storage";
const imgUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${BASE}/${path}`;
};

const defaultCars = [
  { id: 1, brand: "Toyota", model: "Camry", year: 2024, image: "https://images.unsplash.com/photo-1596541223130-5d31a73bb6e8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3", price_per_day: 500, fuel: "Essence", seats: 5, transmission: "Automatic", status: "available", description: "Confortable et économique, idéale pour la ville et les longs trajets." },
  { id: 2, brand: "Mercedes", model: "GLC 300", year: 2023, image: "https://images.unsplash.com/photo-1542362543-b0bb75390779?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3", price_per_day: 1200, fuel: "Diesel", seats: 5, transmission: "Automatic", status: "rented", description: "SUV de luxe avec une conduite sportive et un intérieur haut de gamme." },
  { id: 3, brand: "BMW", model: "X5", year: 2024, image: "https://images.unsplash.com/photo-1627056685852-c426372d665b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3", price_per_day: 1500, fuel: "Diesel", seats: 7, transmission: "Automatic", status: "available", description: "SUV premium avec technologie de pointe et confort absolu." },
  { id: 4, brand: "Dacia", model: "Duster", year: 2024, image: "https://images.unsplash.com/photo-1601004996489-0824b22c730e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3", price_per_day: 350, fuel: "Essence", seats: 5, transmission: "Manual", status: "maintenance", description: "Robuste et abordable, parfaite pour l'aventure." },
  { id: 5, brand: "Renault", model: "Clio", year: 2023, image: "https://images.unsplash.com/photo-1625906232306-39149021d7b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3", price_per_day: 300, fuel: "Essence", seats: 5, transmission: "Manual", status: "available", description: "Citadine agile et économique, idéale pour la ville." },
  { id: 6, brand: "Audi", model: "Q7", year: 2024, image: "https://images.unsplash.com/photo-1599427303016-cd34f07e157e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3", price_per_day: 1800, fuel: "Diesel", seats: 7, transmission: "Automatic", status: "available", description: "SUV familial de luxe avec espace et performance." },
];

function Home() {
  const [cars, setCars] = useState([]);
  const [showForm, setShowForm] = useState(null);
  const [formData, setFormData] = useState({ customer_name: "", customer_email: "", customer_phone: "", start_date: "", end_date: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [fuelFilter, setFuelFilter] = useState("");
  const [failedImages, setFailedImages] = useState(new Set());
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState("fr");
  const heroRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    api.getCars()
      .then((data) => setCars(data.cars || []))
      .catch(() => setCars(defaultCars));
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
      alert("Erreur: " + (err.message || "Failed to submit booking."));
    } finally {
      setLoading(false);
    }
  };

  const handleImgError = (id) => {
    setFailedImages((prev) => new Set([...prev, id]));
  };

  const filteredCars = cars.filter(c =>
    (c.brand.toLowerCase().includes(search.toLowerCase()) || c.model.toLowerCase().includes(search.toLowerCase())) &&
    (fuelFilter === "" || c.fuel === fuelFilter)
  );

  return (
    <div className="home-page">
      {/* ===== NAVBAR ===== */}
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-inner">
          <button className="hamburger" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
          <a href="#" className="nav-logo">
            <svg viewBox="0 0 160 40" width="140" height="35">
              <rect width="160" height="40" rx="8" fill="#D4AF37" />
              <text x="12" y="27" fontFamily="Anton, sans-serif" fontSize="20" fontWeight="700" fill="#000" letterSpacing="1">AUTO</text>
              <text x="80" y="27" fontFamily="Anton, sans-serif" fontSize="16" fontWeight="400" fill="#fff" letterSpacing="0.5">PRESTIGE</text>
            </svg>
          </a>
          <div className={`nav-links ${mobileMenu ? "open" : ""}`}>
            <a href="#cars" onClick={() => setMobileMenu(false)}>Véhicules</a>
            <a href="#about" onClick={() => setMobileMenu(false)}>À propos</a>
            <a href="#contact" onClick={() => setMobileMenu(false)}>Contact</a>
            <a href="/login" className="nav-cta" onClick={() => setMobileMenu(false)}>Dashboard</a>
          </div>
          <div className="nav-right">
            <div className="lang-select">
              <span className={`lang-opt ${lang === "fr" ? "active" : ""}`} onClick={() => setLang("fr")}>FR</span>
              <span className="lang-divider">|</span>
              <span className={`lang-opt ${lang === "ar" ? "active" : ""}`} onClick={() => setLang("ar")}>AR</span>
            </div>
            <a href="/login" className="btn-primary">Dashboard</a>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section id="home" className="hero" ref={heroRef}>
        <div className="hero-bg">
          <img
            src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=2128&auto=format&fit=crop"
            alt=""
          />
        </div>
        <div className="hero-overlay" />
        <div className="hero-overlay-2" />
        <div className="hero-overlay-3" />
        <div className="hero-content">
          <h1>Roulez<br />En Style</h1>
          <p>Des véhicules premium aux prix les plus compétitifs au Maroc. Location flexible, assurance complète et assistance 24h/24.</p>
          <div className="hero-buttons">
            <a href="#cars" className="btn-primary">
              Nos Véhicules
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </a>
            <a href="#contact" className="btn-outline">Contactez-nous</a>
          </div>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-num">200+</span>
            <span className="hero-stat-label">Véhicules</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-num">98%</span>
            <span className="hero-stat-label">Clients satisfaits</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-num">24/7</span>
            <span className="hero-stat-label">Support</span>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section id="about" className="section section-dark">
        <div className="section-header">
          <span className="section-badge">Pourquoi Nous Choisir</span>
          <h2>Service Premium<br />Meilleurs Prix</h2>
          <p>Découvrez le meilleur service de location de voitures au Maroc</p>
        </div>
        <div className="features-grid">
          <div className="holographic-card">
            <div className="holo-glow" />
            <div className="feature-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            </div>
            <h4>Assurance Complète</h4>
            <p>Une couverture complète incluse avec chaque location pour une tranquillité d'esprit totale.</p>
          </div>
          <div className="holographic-card">
            <div className="holo-glow" />
            <div className="feature-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
            </div>
            <h4>Meilleurs Prix</h4>
            <p>Tarifs compétitifs et transparents. Pas de frais cachés ni de surprises.</p>
          </div>
          <div className="holographic-card">
            <div className="holo-glow" />
            <div className="feature-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            </div>
            <h4>Support 24h/24</h4>
            <p>Une équipe d'assistance disponible en permanence pour vous aider à tout moment.</p>
          </div>
          <div className="holographic-card">
            <div className="holo-glow" />
            <div className="feature-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            </div>
            <h4>Entretien Régulier</h4>
            <p>Chaque véhicule est inspecté et nettoyé minutieusement avant chaque location.</p>
          </div>
        </div>
      </section>

      {/* ===== OUR FLEET ===== */}
      <section id="cars" className="section">
        <div className="section-header">
          <span className="section-badge">Notre Flotte</span>
          <h2>Choisissez<br />Votre Véhicule</h2>
          <p>Des citadines aux SUV de luxe, trouvez la voiture parfaite pour chaque occasion</p>
        </div>
        <div className="car-filters">
          <input type="text" className="filter-input" placeholder="Rechercher par marque ou modèle..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="filter-select" value={fuelFilter} onChange={(e) => setFuelFilter(e.target.value)}>
            <option value="">Tous carburants</option>
            <option value="Essence">Essence</option>
            <option value="Diesel">Diesel</option>
            <option value="Electrique">Électrique</option>
            <option value="Hybride">Hybride</option>
          </select>
        </div>
        <div className="cars-grid">
          {filteredCars.length === 0 && <p className="no-cars-message">{search || fuelFilter ? "Aucun véhicule ne correspond à vos filtres." : "Aucun véhicule disponible pour le moment."}</p>}
          {filteredCars.map((car) => (
            <div key={car.id} className="car-card">
              <div className="car-card-img-wrap">
                {car.image && !failedImages.has(car.id) ? (
                  <img src={imgUrl(car.image)} alt={`${car.brand} ${car.model}`} onError={() => handleImgError(car.id)} />
                ) : (
                  <div className="car-card-placeholder">{car.brand.charAt(0)}{car.model.charAt(0)}</div>
                )}
                <span className={`car-card-status ${car.status}`}>
                  {car.status === "available" ? "Disponible" : car.status === "rented" ? "Loué" : "Maintenance"}
                </span>
              </div>
              <div className="car-card-content">
                <div className="car-card-title-row">
                  <h3>{car.brand} {car.model}</h3>
                  <div className="car-card-specs">
                    <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg> {car.fuel}</span>
                    <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="6" width="18" height="12" rx="2" /><path d="M6 12h8" /></svg> {car.transmission}</span>
                  </div>
                </div>
                {car.description && <p className="car-card-desc">{car.description}</p>}
                <div className="car-card-price-row">
                  <div className="car-card-price-label">Prix par jour</div>
                  <div className="car-card-price">{car.price_per_day} MAD</div>
                </div>
                <button className="btn-primary btn-block" onClick={() => openForm(car)} disabled={car.status !== "available"}>
                  {car.status === "available" ? "Réserver maintenant" : "Indisponible"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="section section-dark">
        <div className="about-grid">
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop" alt="About Auto Prestige" />
          </div>
          <div className="about-content">
            <span className="section-badge">À Propos</span>
            <h2>Auto Prestige<br />Votre Confiance, Notre Priorité</h2>
            <p>Auto Prestige est le leader de la location de voitures premium au Maroc, dédié à fournir des solutions de mobilité fiables, abordables et pratiques pour les voyageurs et les habitants.</p>
            <div className="about-features">
              <div className="about-feature">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                <span>Agréé &amp; Certifié</span>
              </div>
              <div className="about-feature">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                <span>Assistance Routière</span>
              </div>
              <div className="about-feature">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                <span>Livraison &amp; Récupération</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section">
        <div className="section-header">
          <span className="section-badge">FAQ</span>
          <h2>Questions<br />Fréquentes</h2>
        </div>
        <div className="faq-grid">
          {[
            { q: "Quels documents sont nécessaires pour louer ?", a: "Une pièce d'identité valide (CNI ou passeport), un permis de conduire en cours de validité, et un moyen de paiement." },
            { q: "Quel est l'âge minimum pour louer ?", a: "L'âge minimum est de 21 ans avec un permis valide depuis au moins 2 ans." },
            { q: "L'assurance est-elle incluse ?", a: "Oui, une assurance complète est incluse dans tous nos contrats de location." },
            { q: "Puis-je rendre la voiture à un autre endroit ?", a: "Oui, nous proposons un service de retour dans une agence différente sur demande." },
          ].map((faq, i) => (
            <details key={i} className="faq-item">
              <summary>
                <span className="faq-q">{faq.q}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
              </summary>
              <div className="faq-a">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="section section-dark">
        <div className="section-header">
          <span className="section-badge">Contact</span>
          <h2>Restons<br />En Contact</h2>
          <p>Prêt à réserver ? Contactez-nous et nous vous mettrons en route</p>
        </div>
        <div className="contact-grid">
          <div className="holographic-card">
            <div className="holo-glow" />
            <div className="feature-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            </div>
            <h4>Téléphone</h4>
            <a href="tel:+212773295034" className="contact-link">+212 7 73-29-50-34</a>
          </div>
          <div className="holographic-card">
            <div className="holo-glow" />
            <div className="feature-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            </div>
            <h4>Email</h4>
            <a href="mailto:contact@autoprestige.ma" className="contact-link">contact@autoprestige.ma</a>
          </div>
          <div className="holographic-card">
            <div className="holo-glow" />
            <div className="feature-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
            </div>
            <h4>Adresse</h4>
            <p>Casablanca, Maroc</p>
          </div>
          <div className="holographic-card">
            <div className="holo-glow" />
            <div className="feature-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
            </div>
            <h4>WhatsApp</h4>
            <a href="https://wa.me/212773295034" target="_blank" rel="noopener noreferrer" className="contact-link">Discuter avec nous</a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-cta">
          <div className="footer-cta-inner">
            <h3>Prêt à prendre la route ?</h3>
            <p>Contactez-nous dès maintenant pour réserver votre véhicule</p>
            <a href="https://wa.me/212773295034" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Réserver via WhatsApp
            </a>
          </div>
        </div>
        <div className="footer-grid">
          <div className="footer-col">
            <svg viewBox="0 0 160 40" width="140" height="35" style={{ marginBottom: 14 }}>
              <rect width="160" height="40" rx="8" fill="#D4AF37" />
              <text x="12" y="27" fontFamily="Anton, sans-serif" fontSize="20" fontWeight="700" fill="#000" letterSpacing="1">AUTO</text>
              <text x="80" y="27" fontFamily="Anton, sans-serif" fontSize="16" fontWeight="400" fill="#fff" letterSpacing="0.5">PRESTIGE</text>
            </svg>
            <p>Location de voitures premium au Maroc. Conduisez avec style et confiance.</p>
          </div>
          <div className="footer-col">
            <h4>Liens Rapides</h4>
            <a href="#cars">Véhicules</a>
            <a href="#about">À propos</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <div className="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              <span>+212 7 73-29-50-34</span>
            </div>
            <div className="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              <span>contact@autoprestige.ma</span>
            </div>
          </div>
          <div className="footer-col">
            <h4>Suivez-nous</h4>
            <div className="footer-social">
              <a href="#" aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg></a>
              <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Auto Prestige. Tous droits réservés.</span>
        </div>
      </footer>

      {/* ===== BOOKING MODAL ===== */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowForm(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
            {submitted ? (
              <div className="modal-success">
                <div className="success-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <h3>Demande Envoyée !</h3>
                <p>Merci ! Nous avons reçu votre demande de réservation pour le {showForm.brand} {showForm.model}. Nous vous contacterons sous peu.</p>
                <button className="btn-primary" onClick={() => setShowForm(null)}>Fermer</button>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <h3>{showForm.brand} {showForm.model} {showForm.year}</h3>
                  <p className="modal-price">{showForm.price_per_day} MAD / jour</p>
                </div>
                <form className="booking-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nom complet *</label>
                      <input type="text" required value={formData.customer_name} onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })} placeholder="Votre nom" />
                    </div>
                    <div className="form-group">
                      <label>Email *</label>
                      <input type="email" required value={formData.customer_email} onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })} placeholder="email@exemple.com" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Téléphone *</label>
                      <input type="tel" required value={formData.customer_phone} onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })} placeholder="+212 6XX XXXXXX" />
                    </div>
                    <div className="form-group">
                      <label>Modèle</label>
                      <input type="text" disabled value={`${showForm.brand} ${showForm.model} ${showForm.year}`} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Date départ *</label>
                      <input type="date" required value={formData.start_date} onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Date retour *</label>
                      <input type="date" required value={formData.end_date} onChange={(e) => setFormData({ ...formData, end_date: e.target.value })} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Message (Optionnel)</label>
                    <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Demande spéciale ?" rows="3" />
                  </div>
                  <button type="submit" className="btn-primary btn-block" disabled={loading}>
                    {loading ? "Envoi en cours..." : "Envoyer la demande"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* WhatsApp Float */}
      <a href="https://wa.me/212773295034" target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}

export default Home;
