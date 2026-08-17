import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from './context';
import { MessageSquare, Repeat, GraduationCap, Bookmark, User } from 'lucide-react';

const tabs = [
  { to: '/', icon: MessageSquare, label: 'Generate' },
  { to: '/rewrite', icon: Repeat, label: 'Rewrite' },
  { to: '/coach', icon: GraduationCap, label: 'Coach' },
  { to: '/saved', icon: Bookmark, label: 'Saved' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export default function Layout() {
  const { logout } = useAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 24px', borderBottom: '1px solid var(--border)',
        background: 'var(--surface)', position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, background: 'var(--accent)',
            display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 14, color: 'white',
          }}>TR</div>
          <span style={{ fontWeight: 700, fontSize: 18 }}>Tone-Reply</span>
        </div>
        <button className="btn-ghost" onClick={logout}>Sign out</button>
      </header>

      <main style={{ flex: 1, padding: '24px', maxWidth: 640, margin: '0 auto', width: '100%' }}>
        <Outlet />
      </main>

      <nav style={{
        display: 'flex', justifyContent: 'center', gap: 4,
        padding: '8px 16px 12px', borderTop: '1px solid var(--border)',
        background: 'var(--surface)', position: 'sticky', bottom: 0,
      }}>
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            style={({ isActive }) => ({
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              padding: '8px 16px', borderRadius: 12, fontSize: 11, fontWeight: 600,
              textDecoration: 'none', transition: 'all 0.2s',
              background: isActive ? 'var(--accent-bg)' : 'transparent',
              color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
            })}
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
