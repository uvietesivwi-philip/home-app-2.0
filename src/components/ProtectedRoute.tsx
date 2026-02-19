import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <div className="center">Loading secure workspace…</div>;
  if (!user) return <Navigate to="/auth" replace />;

  return <Outlet />;
}
