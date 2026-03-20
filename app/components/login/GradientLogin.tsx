"use client"
import React from 'react';
import {  FcGoogle } from 'react-icons/fc'; // Agar icons nahi hain toh image tag use kar sakte hain
import './GradientLogin.css';

const GradientLogin: React.FC = () => {
  return (
    <div className="gradient-wrapper">
      <div className="circle circle-1"></div>
      <div className="circle circle-2"></div>
      
      <div className="login-box">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Please enter your details to sign in</p>
        </div>

        <form className="login-form">
          <div className="input-field">
            <input type="email" placeholder="Email" required />
          </div>

          <div className="input-field">
            <input type="password" placeholder="Password" required />
          </div>  

          <div className="extra-actions">
            <label><input type="checkbox" /> Remember me</label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="btn-primary">
            Sign In
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <button className="btn-google">
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_打%22G%22_Logo.svg" alt="google" width="20"/>
          Continue with Google
        </button>

        <p className="signup-text">
          Don't have an account? <a href="#">Sign up for free</a>
        </p>
      </div>
    </div>
  );
};

export default GradientLogin;