function Header() {
  return (
    <header className="social-header">
      <div className="logo">SocialApp</div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#friends">Friends</a>
        <a href="#messages">Messages</a>
      </nav>
      <div className="user-actions">
        <button className="notifications-btn">
          <span>🔔</span>
        </button>
        <button className="profile-btn">
          <img src="profile-pic.jpg" alt="Profile" />
        </button>
      </div>
    </header>
  );
}

export default Header;
