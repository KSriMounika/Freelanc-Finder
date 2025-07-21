import React, { useState } from 'react'
import '../styles/authenticate.css'
import Login from '../components/Login'
import Register from '../components/Register'
import { useNavigate } from 'react-router-dom'
import { FaRocket, FaArrowLeft } from 'react-icons/fa'

const Authenticate = () => {
  const [authType, setAuthType] = useState('login');
  const navigate = useNavigate();

  return (
    <div className="AuthenticatePage">
      <div className="auth-navbar">
        <div className="auth-brand" onClick={() => navigate('/')}>
          <FaRocket className="brand-icon" />
          <h3>FreeLancer</h3>
        </div>
        <button className="back-btn" onClick={() => navigate('/')}>
          <FaArrowLeft />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="auth-container">
        <div className="auth-content">
          <div className="auth-header">
            <h2>{authType === 'login' ? 'Welcome Back' : 'Join FreeLancer'}</h2>
            <p>
              {authType === 'login' 
                ? 'Sign in to access your account and continue your freelance journey'
                : 'Create your account and start your freelance career today'
              }
            </p>
          </div>

          <div className="auth-tabs">
            <button 
              className={`auth-tab ${authType === 'login' ? 'active' : ''}`}
              onClick={() => setAuthType('login')}
            >
              Sign In
            </button>
            <button 
              className={`auth-tab ${authType === 'register' ? 'active' : ''}`}
              onClick={() => setAuthType('register')}
            >
              Sign Up
            </button>
          </div>

          {authType === 'login' ? (
            <Login setAuthType={setAuthType} />
          ) : (
            <Register setAuthType={setAuthType} />
          )}
        </div>

        <div className="auth-visual">
          <div className="visual-content">
            <h3>Your Gateway to Success</h3>
            <p>Join thousands of freelancers and clients who trust FreeLancer for their projects</p>
            <div className="visual-stats">
              <div className="stat">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Active Freelancers</span>
              </div>
              <div className="stat">
                <span className="stat-number">100K+</span>
                <span className="stat-label">Completed Projects</span>
              </div>
              <div className="stat">
                <span className="stat-number">95%</span>
                <span className="stat-label">Satisfaction Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Authenticate