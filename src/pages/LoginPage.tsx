import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState<'player' | 'owner' | 'admin'>('player');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'player') navigate('/');
    else if (role === 'owner') navigate('/owner/dashboard');
    else navigate('/admin');
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-shape" />
      <div className="auth-card shadow-card">
        <div className="auth-logo">
          <span className="auth-logo__icon">⚽</span>
          <h1 className="auth-logo__text">TurfFlow</h1>
          <p className="auth-logo__sub">The pulse of your game starts here.</p>
        </div>

        <div className="auth-role-tabs">
          {(['player', 'owner', 'admin'] as const).map(r => (
            <button
              key={r}
              id={`role-${r}`}
              className={`auth-role-tab ${role === r ? 'auth-role-tab--active' : ''}`}
              onClick={() => setRole(r)}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="auth-field">
            <label className="label-bold" htmlFor="email">Email Address</label>
            <div className="auth-input-wrap">
              <Mail size={16} className="auth-input-icon" />
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                defaultValue="demo@turfflow.in"
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <div className="auth-field__label-row">
              <label className="label-bold" htmlFor="password">Password</label>
              <button type="button" className="auth-forgot">Forgot?</button>
            </div>
            <div className="auth-input-wrap">
              <Lock size={16} className="auth-input-icon" />
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                defaultValue="demo1234"
                required
              />
              <button type="button" className="auth-pass-toggle" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" id="login-btn" className="auth-submit-btn">
            Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        </form>

        <p className="auth-footer">
          New to the pitch? <Link to="/signup" id="goto-signup">Create an Account</Link>
        </p>

        {/* Demo shortcuts */}
        <div className="auth-demo">
          <p className="label-bold" style={{ color: 'var(--on-surface-variant)', marginBottom: '8px' }}>Quick Demo Access</p>
          <div className="auth-demo__buttons">
            <button id="demo-player" onClick={() => navigate('/')}>Player View</button>
            <button id="demo-owner" onClick={() => navigate('/owner/dashboard')}>Owner View</button>
            <button id="demo-admin" onClick={() => navigate('/admin')}>Admin View</button>
          </div>
        </div>
      </div>
    </div>
  );
}
