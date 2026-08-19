import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, ShieldCheck, Mail, Calendar, MapPin, Phone, UserCheck } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="profile-page-container">
      <div className="profile-wrapper max-width-layout">
        <div className="profile-card-header glass-panel animate-fade-in">
          <div className="profile-avatar-large">
            <User size={48} />
          </div>
          <div className="profile-summary">
            <h1>{user?.username || 'HungryMan Member'}</h1>
            <div className="roles-list">
              {user?.roles.map((role) => (
                <span key={role} className="role-chip badge">
                  <ShieldCheck size={12} />
                  <span>{role}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="profile-details-grid">
          {/* Account Details */}
          <div className="details-card glass-panel animate-fade-in">
            <h2>Account Details</h2>
            <div className="details-list">
              <div className="detail-item">
                <div className="detail-icon"><Mail size={18} /></div>
                <div className="detail-info">
                  <span className="detail-label">Email Address</span>
                  <span className="detail-value">{user?.email || 'admin@hungryman.com'}</span>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-icon"><UserCheck size={18} /></div>
                <div className="detail-info">
                  <span className="detail-label">Username / Display Code</span>
                  <span className="detail-value">{user?.username ? user.username.toLowerCase().replace(' ', '_') : 'admin_user'}</span>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-icon"><Calendar size={18} /></div>
                <div className="detail-info">
                  <span className="detail-label">Member Since</span>
                  <span className="detail-value">August 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="details-card glass-panel animate-fade-in">
            <h2>Contact & Delivery Settings</h2>
            <div className="details-list">
              <div className="detail-item">
                <div className="detail-icon"><Phone size={18} /></div>
                <div className="detail-info">
                  <span className="detail-label">Phone Number</span>
                  <span className="detail-value">+1 (555) 329-9238</span>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-icon"><MapPin size={18} /></div>
                <div className="detail-info">
                  <span className="detail-label">Delivery Address</span>
                  <span className="detail-value">482 Gourmet Blvd, Food District, CA 90210</span>
                </div>
              </div>
            </div>
            
            <button onClick={logout} className="btn btn-primary btn-logout-profile">
              Sign Out Account
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .profile-page-container {
          padding: 40px 24px;
          min-height: calc(100vh - 120px);
        }

        .profile-wrapper {
          max-width: 900px;
          margin: 0 auto;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .profile-card-header {
          display: flex;
          align-items: center;
          padding: 32px;
          background: rgba(15, 20, 31, 0.55);
          gap: 24px;
        }

        .profile-avatar-large {
          width: 96px;
          height: 96px;
          border-radius: 24px;
          background: var(--accent-gradient);
          color: #0c0f16;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 12px 32px rgba(255, 95, 109, 0.25);
          border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .profile-summary h1 {
          font-size: 2.2rem;
          margin-bottom: 8px;
        }

        .roles-list {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .role-chip {
          background: rgba(255, 195, 113, 0.08);
          border: 1px solid rgba(255, 195, 113, 0.2);
          color: var(--accent-secondary);
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
        }

        .profile-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        .details-card {
          padding: 32px;
          background: rgba(15, 20, 31, 0.4);
        }

        .details-card h2 {
          font-size: 1.25rem;
          margin-bottom: 24px;
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 10px;
        }

        .details-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .detail-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .detail-icon {
          color: var(--accent-primary);
          background: rgba(255, 95, 109, 0.06);
          padding: 10px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 95, 109, 0.1);
        }

        .detail-info {
          display: flex;
          flex-direction: column;
        }

        .detail-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .detail-value {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-top: 2px;
        }

        .btn-logout-profile {
          width: 100%;
          margin-top: 32px;
          height: 44px;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .profile-card-header {
            flex-direction: column;
            text-align: center;
            padding: 24px;
          }
          .profile-avatar-large {
            width: 80px;
            height: 80px;
          }
          .profile-details-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
