import { useAuth } from '../context';
import { User, Mail, Shield, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>Profile</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: 4, fontSize: 14 }}>
          Your account settings
        </p>
      </div>

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16, background: 'var(--accent-bg)',
            display: 'grid', placeItems: 'center', border: '2px solid var(--accent)',
          }}>
            <User size={28} style={{ color: 'var(--accent)' }} />
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{user?.email?.split('@')[0]}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Free Plan</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderTop: '1px solid var(--border)' }}>
            <Mail size={18} style={{ color: 'var(--text-secondary)' }} />
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Email</div>
              <div style={{ fontSize: 14 }}>{user?.email}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderTop: '1px solid var(--border)' }}>
            <Shield size={18} style={{ color: 'var(--text-secondary)' }} />
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Account ID</div>
              <div style={{ fontSize: 12, fontFamily: 'monospace' }}>{user?.id}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Usage</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <span style={{ color: 'var(--text-secondary)' }}>Replies Generated</span>
            <span style={{ fontWeight: 600 }}>—</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <span style={{ color: 'var(--text-secondary)' }}>Favorites Saved</span>
            <span style={{ fontWeight: 600 }}>—</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <span style={{ color: 'var(--text-secondary)' }}>Member Since</span>
            <span style={{ fontWeight: 600 }}>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <button
        className="btn-secondary"
        onClick={logout}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          width: '100%', padding: '12px 24px', color: 'var(--error)',
          borderColor: 'rgba(239,68,68,0.3)',
        }}
      >
        <LogOut size={16} />
        Sign Out
      </button>
    </div>
  );
}
