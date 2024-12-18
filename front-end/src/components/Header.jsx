import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [path]);

  function logOut() {
    localStorage.removeItem("token");
    navigate("/");
    setIsDropdownOpen(false);
  }

  return (
    <header className="social-header">
      <div className="logo">SocialApp</div>
      {isLoggedIn && (
        <>
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
            <div className="profile-menu" ref={dropdownRef}>
              <button className="profile-btn" onClick={toggleDropdown}>
                <FontAwesomeIcon size="lg" icon={faUser} />
              </button>

              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <ul>
                    <li onClick={() => alert("Viewing Profile")}>Profile</li>
                    <li onClick={() => alert("Settings")}>Settings</li>
                    <li onClick={logOut}>Log Out</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
