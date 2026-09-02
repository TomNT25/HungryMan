import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './presentation/context/AuthContext';
import { CartProvider } from './presentation/context/CartContext';
import { Navbar } from './presentation/components/Navbar';
import { LoginView } from './presentation/views/LoginView';
import { DashboardView } from './presentation/views/DashboardView';
import { CartView } from './presentation/views/CartView';
import { ProfileView } from './presentation/views/ProfileView';

// Route Guard for authenticated paths
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="global-spinner-container">
        <div className="spinner"></div>
        <style>{`
          .global-spinner-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background-color: var(--bg-primary);
          }
          .spinner {
            width: 32px;
            height: 32px;
            border: 3px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            border-top-color: var(--accent-primary);
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="app-container">
      {/* Navbar is only displayed when authenticated */}
      {isAuthenticated && <Navbar />}
      
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<LoginView />} />
          
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <DashboardView />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <CartView />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfileView />
              </ProtectedRoute>
            } 
          />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <style>{`
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
