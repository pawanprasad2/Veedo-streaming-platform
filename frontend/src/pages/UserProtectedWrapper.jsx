import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';

function UserProtectedWrapper({ children }) {
  const { user, loading } = useContext(UserDataContext);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  return children;
}

export default UserProtectedWrapper;
