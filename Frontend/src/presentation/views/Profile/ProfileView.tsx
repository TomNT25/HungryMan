import React from 'react';
import { useProfile } from './useProfile';
import styles from './ProfileView.module.css';
import { User, ShieldCheck, Mail, Calendar, MapPin, Phone, UserCheck } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { user, logout } = useProfile();

  return (
    <div className={styles.profilePageContainer}>
      <div className={styles.profileWrapper}>
        <div className={`${styles.profileCardHeader} glass-panel animate-fade-in`}>
          <div className={styles.profileAvatarLarge}>
            <User size={48} />
          </div>
          <div className={styles.profileSummary}>
            <h1>{user?.username || 'HungryMan Member'}</h1>
            <div className={styles.rolesList}>
              {user?.roles.map((role) => (
                <span key={role} className={`${styles.roleChip} badge`}>
                  <ShieldCheck size={12} />
                  <span>{role}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.profileDetailsGrid}>
          <div className={`${styles.detailsCard} glass-panel animate-fade-in`}>
            <h2>Account Details</h2>
            <div className={styles.detailsList}>
              <div className={styles.detailItem}>
                <div className={styles.detailIcon}><Mail size={18} /></div>
                <div className={styles.detailInfo}>
                  <span className={styles.detailLabel}>Email Address</span>
                  <span className={styles.detailValue}>{user?.email || 'admin@hungryman.com'}</span>
                </div>
              </div>
              <div className={styles.detailItem}>
                <div className={styles.detailIcon}><UserCheck size={18} /></div>
                <div className={styles.detailInfo}>
                  <span className={styles.detailLabel}>Username / Display Code</span>
                  <span className={styles.detailValue}>{user?.username ? user.username.toLowerCase().replace(/\s+/g, '_') : 'admin_user'}</span>
                </div>
              </div>
              <div className={styles.detailItem}>
                <div className={styles.detailIcon}><Calendar size={18} /></div>
                <div className={styles.detailInfo}>
                  <span className={styles.detailLabel}>Member Since</span>
                  <span className={styles.detailValue}>August 2026</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.detailsCard} glass-panel animate-fade-in`}>
            <h2>Contact & Delivery Settings</h2>
            <div className={styles.detailsList}>
              <div className={styles.detailItem}>
                <div className={styles.detailIcon}><Phone size={18} /></div>
                <div className={styles.detailInfo}>
                  <span className={styles.detailLabel}>Phone Number</span>
                  <span className={styles.detailValue}>+1 (555) 329-9238</span>
                </div>
              </div>
              <div className={styles.detailItem}>
                <div className={styles.detailIcon}><MapPin size={18} /></div>
                <div className={styles.detailInfo}>
                  <span className={styles.detailLabel}>Delivery Address</span>
                  <span className={styles.detailValue}>482 Gourmet Blvd, Food District, CA 90210</span>
                </div>
              </div>
            </div>
            
            <button onClick={logout} className={`btn btn-primary ${styles.btnLogoutProfile}`}>
              Sign Out Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
