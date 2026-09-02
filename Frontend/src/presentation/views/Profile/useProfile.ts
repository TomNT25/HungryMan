import { useAuth } from '../../context/AuthContext';

export const useProfile = () => {
  const { user, logout } = useAuth();

  return {
    user,
    logout
  };
};
