import React from 'react';
import { useLogin } from './useLogin';
import styles from './LoginView.module.css';
import { KeyRound, Mail, AlertCircle, ShieldAlert } from 'lucide-react';

export const LoginView: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleSubmit
  } = useLogin();

  return (
    <div className={styles.loginPageContainer}>
      <div className={`${styles.loginCard} glass-panel animate-fade-in`}>
        <div className={styles.loginHeader}>
          <div className={styles.keyIconBg}>
            <KeyRound size={28} className={styles.keyIcon} />
          </div>
          <h2>Welcome Back</h2>
          <p>Sign in to access the HungryMan food delivery catalog</p>
        </div>

        {error && (
          <div className={styles.loginErrorBanner}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <div className={styles.inputWithIcon}>
              <Mail size={18} className={styles.inputIcon} />
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
            <div className={styles.inputWithIcon}>
              <KeyRound size={18} className={styles.inputIcon} />
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
            className={`btn btn-primary ${styles.btnSubmit}`}
            disabled={isLoading}
          >
            {isLoading ? <div className={styles.spinner}></div> : 'Sign In'}
          </button>
        </form>

        <div className={styles.bypassTipBox}>
          <div className={styles.tipHeader}>
            <ShieldAlert size={14} />
            <span>Developer bypass / Test Mode</span>
          </div>
          <p>
            If the backend services are not running, you can log in locally using:
          </p>
          <div className={styles.credentialsRow}>
            <code>admin@hungryman.com</code> / <code>password123</code>
          </div>
        </div>
      </div>
    </div>
  );
};
