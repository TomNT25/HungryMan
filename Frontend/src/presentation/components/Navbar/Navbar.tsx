import React from 'react';
import { Link } from 'react-router-dom';
import { useNavbar } from './useNavbar';
import styles from './Navbar.module.css';
import { Utensils, ShoppingCart, User, LogOut, LogIn } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, totalItems, handleLogout } = useNavbar();

  return (
    <nav className={styles.navbarContainer}>
      <div className={`${styles.navbarContent} glass-panel`}>
        <Link to="/" className={styles.navLogo}>
          <div className={styles.logoIconBg}>
            <Utensils size={22} className={styles.logoIcon} />
          </div>
          <span className={styles.logoText}>
            Hungry<span className={styles.accentText}>Man</span>
          </span>
        </Link>

        <div className={styles.navActions}>
          {isAuthenticated ? (
            <>
              <Link to="/cart" className={styles.navCartBtn}>
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className={`${styles.cartBadge} badge btn-primary`}>{totalItems}</span>
                )}
              </Link>

              <Link to="/profile" className={styles.navProfileLink}>
                <div className={styles.avatarPlaceholder}>
                  <User size={16} />
                </div>
                <div className={styles.userInfoText}>
                  <span className={styles.username}>{user?.username}</span>
                  <span className={styles.userRole}>{user?.roles[0]}</span>
                </div>
              </Link>

              <button onClick={handleLogout} className={styles.btnLogout} title="Sign Out">
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <Link to="/login" className={`btn btn-primary ${styles.btnLoginNav}`}>
              <LogIn size={16} />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
