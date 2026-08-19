import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { KeyRound, Mail, AlertCircle, ShieldAlert } from 'lucide-react';

export const LoginView: React.FC = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // If already authenticated, redirect to destination
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card glass-panel animate-fade-in">
        <div className="login-header">
          <div className="key-icon-bg">
            <KeyRound size={28} className="key-icon" />
          </div>
          <h2>Welcome Back</h2>
          <p>Sign in to access the HungryMan food delivery catalog</p>
        </div>

        {error && (
          <div className="login-error-banner">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                className="input-field"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="input-with-icon">
              <KeyRound size={18} className="input-icon" />
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-submit"
            disabled={isLoading}
          >
            {isLoading ? <div className="spinner"></div> : 'Sign In'}
          </button>
        </form>

        <div className="bypass-tip-box">
          <div className="tip-header">
            <ShieldAlert size={14} />
            <span>Developer bypass / Test Mode</span>
          </div>
          <p>
            If the backend services are not running, you can log in locally using:
          </p>
          <div className="credentials-row">
            <code>admin@hungryman.com</code> / <code>password123</code>
          </div>
        </div>
      </div>

      <style>{`
        .login-page-container {
          min-height: calc(100vh - 120px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .login-card {
          width: 100%;
          max-width: 440px;
          padding: 40px 32px;
          background: rgba(15, 20, 31, 0.7);
        }

        .login-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .key-icon-bg {
          background: var(--accent-gradient);
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          box-shadow: 0 8px 24px rgba(255, 95, 109, 0.2);
        }

        .key-icon {
          color: #0c0f16;
        }

        .login-header h2 {
          font-size: 1.8rem;
          margin-bottom: 8px;
        }

        .login-header p {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .login-error-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: var(--error);
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 0.85rem;
          margin-bottom: 24px;
          line-height: 1.4;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 32px;
        }

        .input-with-icon {
          position: relative;
        }

        .input-with-icon .input-field {
          padding-left: 46px;
          width: 100%;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .btn-submit {
          margin-top: 8px;
          height: 48px;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .bypass-tip-box {
          background: rgba(255, 195, 113, 0.04);
          border: 1px solid rgba(255, 195, 113, 0.15);
          border-radius: 12px;
          padding: 16px;
        }

        .tip-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--accent-secondary);
          text-transform: uppercase;
          letter-spacing: 0.02em;
          margin-bottom: 6px;
        }

        .bypass-tip-box p {
          font-size: 0.78rem;
          color: var(--text-secondary);
          margin-bottom: 10px;
        }

        .credentials-row {
          font-size: 0.82rem;
          color: var(--text-primary);
          background: rgba(0, 0, 0, 0.2);
          padding: 6px 10px;
          border-radius: 6px;
          display: inline-block;
          border: 1px solid rgba(255, 255, 255, 0.03);
        }

        .credentials-row code {
          font-weight: 700;
          color: var(--accent-primary);
        }
      `}</style>
    </div>
  );
};
