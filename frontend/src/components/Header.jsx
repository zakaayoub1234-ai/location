function Header() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <header className="header">
      <div className="header-search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input type="text" placeholder="Search..." className="search-input" />
      </div>

      <div className="header-actions">
        <button className="header-btn notification-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="badge">3</span>
        </button>

        <div className="user-profile">
          <div className="avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="user-info">
            <span className="user-name">{user.name || "User"}</span>
            <span className="user-role">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
