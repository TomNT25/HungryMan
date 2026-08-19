import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Utensils, ShoppingCart, User, LogOut, LogIn } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-content glass-panel">
        <Link to="/" className="nav-logo">
          <div className="logo-icon-bg">
            <Utensils size={22} className="logo-icon" />
          </div>
          <span className="logo-text">
            Hungry<span className="accent-text">Man</span>
          </span>
        </Link>

        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <Link to="/cart" className="nav-cart-btn">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="cart-badge badge btn-primary">{totalItems}</span>
                )}
              </Link>

              <Link to="/profile" className="nav-profile-link">
                <div className="avatar-placeholder">
                  <User size={16} />
                </div>
                <div className="user-info-text">
                  <span className="username">{user?.username}</span>
                  <span className="user-role">{user?.roles[0]}</span>
                </div>
              </Link>

              <button onClick={handleLogout} className="btn-logout" title="Sign Out">
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary btn-login-nav">
              <LogIn size={16} />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>

      <style>{`
        .navbar-container {
          position: sticky;
          top: 0;
          z-index: 1000;
          padding: 16px 24px;
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
        }

        .navbar-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 24px;
          border-radius: 20px;
          background: rgba(15, 20, 31, 0.7);
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon-bg {
          background: var(--accent-gradient);
          padding: 8px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-icon {
          color: #0c0f16;
        }

        .logo-text {
          font-family: 'Outfit', sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .accent-text {
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .nav-cart-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--glass-border);
          transition: all var(--transition-fast);
        }

        .nav-cart-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 95, 109, 0.2);
          transform: translateY(-1px);
        }

        .cart-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          min-width: 20px;
          height: 20px;
          font-size: 0.7rem;
          box-shadow: 0 4px 10px rgba(255, 95, 109, 0.4);
        }

        .nav-profile-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 12px 6px 6px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 14px;
        }

        .nav-profile-link:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 195, 113, 0.2);
        }

        .avatar-placeholder {
          background: var(--bg-tertiary);
          color: var(--accent-secondary);
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 195, 113, 0.1);
        }

        .user-info-text {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .username {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .user-role {
          font-size: 0.7rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .btn-logout {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 8px;
          border-radius: 10px;
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
        }

        .btn-logout:hover {
          color: var(--error);
          background: rgba(239, 68, 68, 0.08);
        }

        .btn-login-nav {
          padding: 8px 18px;
          font-size: 0.85rem;
          border-radius: 10px;
        }

        @media (max-width: 600px) {
          .user-info-text {
            display: none;
          }
          .nav-profile-link {
            padding: 6px;
          }
        }
      `}</style>
    </nav>
  );
};
