import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { AdminPage } from '../features/admin/AdminPage';
import { AuthPage } from '../features/auth/AuthPage';
import { CategoriesPage } from '../features/content/CategoriesPage';
import { ContentDetailPage } from '../features/content/ContentDetailPage';
import { HomePage } from '../features/content/HomePage';
import { SavedPage } from '../features/profile/SavedPage';
import { RequestsPage } from '../features/requests/RequestsPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/content/:contentId" element={<ContentDetailPage />} />
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
