import React from 'react';
import { Mail, Lock, Chrome, ArrowRight, Github } from 'lucide-react';
import './PremiumLogin.css';

const PremiumLogin: React.FC = () => {
  return (
    <div className="premium-wrapper">
      {/* Background Animated Blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      
      <div className="login-card">
        <div className="brand-logo">
          <div className="logo-icon">V</div>
          <span>VELVET UI</span>
        </div>

        <div className="header-section">
          <h1>Experience Elegance</h1>
          <p>Securely sign in to your dashboard</p>
        </div>

        <form className="form-container" onSubmit={(e) => e.preventDefault()}>
          <div className="floating-input">
            <input type="email" placeholder=" " id="email" required />
            <label htmlFor="email">Email Address</label>
            <Mail className="input-icon" size={18} />
          </div>  

          <div className="floating-input">
            <input type="password" placeholder=" " id="pw" required />
            <label htmlFor="pw">Password</label>
            <Lock className="input-icon" size={18} />
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Remember me
            </label>
            <a href="#" className="forgot-link">Forgot?</a>
          </div>

          <button type="submit" className="main-btn">
            <span>Sign In</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="separator">
          <span>Or connect with</span>
        </div>

        <div className="social-grid">
          <button className="social-btn">
            <Chrome size={20} />
            <span>Google</span>
          </button>
          <button className="social-btn">
            <Github size={20} />
            <span>Github</span>
          </button>
        </div>

        <p className="signup-prompt">
          New here? <a href="#">Create an elite account</a>
        </p>
      </div>
    </div>
  );
};

export default PremiumLogin;