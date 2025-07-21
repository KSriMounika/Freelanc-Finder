import React, { useContext, useEffect, useState } from 'react'
import '../styles/navbar.css'
import { useNavigate } from 'react-router-dom'
import { GeneralContext } from '../context/GeneralContext';
import { FaRocket, FaUser, FaBell, FaSearch, FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const userId = localStorage.getItem('userId');
  const usertype = localStorage.getItem('usertype');
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const { logout } = useContext(GeneralContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {usertype === 'freelancer' && (
        <div className="navbar">
          <div className="nav-brand">
            <FaRocket className="brand-icon" />
            <h3>FreeLancer</h3>
          </div>

          <div className="nav-search">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search projects..." />
          </div>

          <div className="nav-options">
            <div className="nav-item" onClick={() => handleNavigation('/freelancer')}>
              <span>Dashboard</span>
            </div>
            <div className="nav-item" onClick={() => handleNavigation('/all-projects')}>
              <span>All Projects</span>
            </div>
            <div className="nav-item" onClick={() => handleNavigation('/my-projects')}>
              <span>My Projects</span>
            </div>
            <div className="nav-item" onClick={() => handleNavigation('/myApplications')}>
              <span>Applications</span>
            </div>
          </div>

          <div className="nav-user">
            <div className="notification-icon">
              <FaBell />
              <span className="notification-badge">3</span>
            </div>
            <div className="user-profile">
              <FaUser />
              <span>{username}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>

          {isMobileMenuOpen && (
            <div className="mobile-menu">
              <div className="mobile-nav-item" onClick={() => handleNavigation('/freelancer')}>
                Dashboard
              </div>
              <div className="mobile-nav-item" onClick={() => handleNavigation('/all-projects')}>
                All Projects
              </div>
              <div className="mobile-nav-item" onClick={() => handleNavigation('/my-projects')}>
                My Projects
              </div>
              <div className="mobile-nav-item" onClick={() => handleNavigation('/myApplications')}>
                Applications
              </div>
              <div className="mobile-nav-item" onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      )}

      {usertype === 'client' && (
        <div className="navbar">
          <div className="nav-brand">
            <FaRocket className="brand-icon" />
            <h3>FreeLancer</h3>
          </div>

          <div className="nav-search">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search freelancers..." />
          </div>

          <div className="nav-options">
            <div className="nav-item" onClick={() => handleNavigation('/client')}>
              <span>Dashboard</span>
            </div>
            <div className="nav-item" onClick={() => handleNavigation('/new-project')}>
              <span>New Project</span>
            </div>
            <div className="nav-item" onClick={() => handleNavigation('/project-applications')}>
              <span>Applications</span>
            </div>
          </div>

          <div className="nav-user">
            <div className="notification-icon">
              <FaBell />
              <span className="notification-badge">2</span>
            </div>
            <div className="user-profile">
              <FaUser />
              <span>{username}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>

          {isMobileMenuOpen && (
            <div className="mobile-menu">
              <div className="mobile-nav-item" onClick={() => handleNavigation('/client')}>
                Dashboard
              </div>
              <div className="mobile-nav-item" onClick={() => handleNavigation('/new-project')}>
                New Project
              </div>
              <div className="mobile-nav-item" onClick={() => handleNavigation('/project-applications')}>
                Applications
              </div>
              <div className="mobile-nav-item" onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      )}

      {usertype === 'admin' && (
        <div className="navbar">
          <div className="nav-brand">
            <FaRocket className="brand-icon" />
            <h3>FreeLancer Admin</h3>
          </div>

          <div className="nav-options">
            <div className="nav-item" onClick={() => handleNavigation('/admin')}>
              <span>Home</span>
            </div>
            <div className="nav-item" onClick={() => handleNavigation('/all-users')}>
              <span>All Users</span>
            </div>
            <div className="nav-item" onClick={() => handleNavigation('/admin-projects')}>
              <span>Projects</span>
            </div>
            <div className="nav-item" onClick={() => handleNavigation('/admin-applications')}>
              <span>Applications</span>
            </div>
          </div>

          <div className="nav-user">
            <div className="notification-icon">
              <FaBell />
              <span className="notification-badge">5</span>
            </div>
            <div className="user-profile">
              <FaUser />
              <span>{username}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>

          {isMobileMenuOpen && (
            <div className="mobile-menu">
              <div className="mobile-nav-item" onClick={() => handleNavigation('/admin')}>
                Home
              </div>
              <div className="mobile-nav-item" onClick={() => handleNavigation('/all-users')}>
                All Users
              </div>
              <div className="mobile-nav-item" onClick={() => handleNavigation('/admin-projects')}>
                Projects
              </div>
              <div className="mobile-nav-item" onClick={() => handleNavigation('/admin-applications')}>
                Applications
              </div>
              <div className="mobile-nav-item" onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Navbar