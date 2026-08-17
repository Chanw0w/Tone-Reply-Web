import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context';
import Layout from './Layout';
import AuthPage from './pages/Auth';
import GeneratePage from './pages/Generate';
import RewritePage from './pages/Rewrite';
import CoachPage from './pages/Coach';
import SavedPage from './pages/Saved';
import ProfilePage from './pages/Profile';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading" style={{ display: 'grid', placeItems: 'center', height: '100vh', fontSize: 18 }}>Loading...</div>;
  if (!user) return <Navigate to="/auth" />;
  return <>{children}</>;
}

function AppRoutes() {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ display: 'grid', placeItems: 'center', height: '100vh', fontSize: 18 }}>Loading...</div>;

  return (
    <Routes>
      <Route path="/auth" element={user ? <Navigate to="/" /> : <AuthPage />} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<GeneratePage />} />
        <Route path="rewrite" element={<RewritePage />} />
        <Route path="coach" element={<CoachPage />} />
        <Route path="saved" element={<SavedPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
