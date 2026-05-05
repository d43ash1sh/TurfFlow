import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import { Eye, EyeOff, Lock, Mail, User, Phone } from 'lucide-react';

export default function SignupPage() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState<'player' | 'owner'>('player');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-shape" />
      <div className="auth-card shadow-card">
        <div className="auth-logo">
          <span className="auth-logo__icon">⚽</span>
          <h1 className="auth-logo__text">TurfFlow</h1>
          <p className="auth-logo__sub">Join the community. Book your first slot today.</p>
        </div>

        <div className="auth-role-tabs" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {(['player', 'owner'] as const).map(r => (
            <button
              key={r}
              id={`signup-role-${r}`}
              className={`auth-role-tab ${role === r ? 'auth-role-tab--active' : ''}`}
              onClick={() => setRole(r)}
            >
              {r === 'player' ? '🏃 Player' : '🏟️ Turf Owner'}
            </button>
          ))}
        </div>

        <form className="auth-form" onSubmit={handleSignup}>
          <div className="auth-field">
            <label className="label-bold" htmlFor="signup-name">Full Name</label>
            <div className="auth-input-wrap">
              <User size={16} className="auth-input-icon" />
              <input id="signup-name" type="text" placeholder="Your full name" required />
            </div>
          </div>

          <div className="auth-field">
            <label className="label-bold" htmlFor="signup-email">Email Address</label>
            <div className="auth-input-wrap">
              <Mail size={16} className="auth-input-icon" />
              <input id="signup-email" type="email" placeholder="you@example.com" required />
            </div>
          </div>

          <div className="auth-field">
            <label className="label-bold" htmlFor="signup-phone">Phone Number</label>
            <div className="auth-input-wrap">
              <Phone size={16} className="auth-input-icon" />
              <input id="signup-phone" type="tel" placeholder="+91 98765 43210" required />
            </div>
          </div>

          <div className="auth-field">
            <label className="label-bold" htmlFor="signup-password">Password</label>
            <div className="auth-input-wrap">
              <Lock size={16} className="auth-input-icon" />
              <input
                id="signup-password"
                type={showPass ? 'text' : 'password'}
                placeholder="Create a strong password"
                required
              />
              <button type="button" className="auth-pass-toggle" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {role === 'owner' && (
            <div className="auth-field">
              <label className="label-bold" htmlFor="signup-turf">Turf / Business Name</label>
              <div className="auth-input-wrap">
                <span style={{ padding: '0 8px', color: 'var(--on-surface-variant)' }}>🏟️</span>
                <input id="signup-turf" type="text" placeholder="e.g. Goal Arena Turf" required />
              </div>
            </div>
          )}

          <button type="submit" id="signup-btn" className="auth-submit-btn">
            Create Account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login" id="goto-login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
