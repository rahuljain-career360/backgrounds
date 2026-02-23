import React from 'react';
import { Mail, Lock, Chrome } from 'lucide-react';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  return (
    <div className="login-container">
      <div className="glass-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Enter your credentials to access your account</p>
        </div>

        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input type="email" placeholder="Email Address" required />
          </div>

          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input type="password" placeholder="Password" required />
          </div>

          <div className="forgot-pw">
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <div className="divider">
          <span>or continue with</span>
        </div>

        <button className="google-btn">
          <Chrome size={20} className="google-icon" />
          Sign in with Google
        </button>

        <p className="footer-text">
          Don't have an account? <a href="#">Create Account</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;