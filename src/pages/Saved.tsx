import { useState, useEffect } from 'react';
import { useAuth } from '../context';
import { chat } from '../api';
import type { Favorite, Preset } from '../api';
import { Bookmark, Trash2, Star, Clock } from 'lucide-react';

export default function SavedPage() {
  const { token } = useAuth();
  const [tab, setTab] = useState<'favorites' | 'presets'>('favorites');
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [presets, setPresets] = useState<Preset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [favs, pres] = await Promise.all([
        chat.getFavorites(token!),
        chat.getPresets(token!),
      ]);
      setFavorites(favs);
      setPresets(pres);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteFavorite = async (id: string) => {
    try {
      await chat.deleteFavorite(id, token!);
      setFavorites(favorites.filter(f => f.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const deletePreset = async (id: string) => {
    try {
      await chat.deletePreset(id, token!);
      setPresets(presets.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const copyReply = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>Saved</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: 4, fontSize: 14 }}>
          Your favorite replies and custom presets
        </p>
      </div>

      <div style={{ display: 'flex', gap: 4, background: 'var(--surface)', borderRadius: 10, padding: 4 }}>
        <button
          className="btn-ghost"
          onClick={() => setTab('favorites')}
          style={{
            flex: 1, borderRadius: 8, padding: '10px 16px',
            background: tab === 'favorites' ? 'var(--surface-2)' : 'transparent',
            color: tab === 'favorites' ? 'var(--text)' : 'var(--text-secondary)',
          }}
        >
          <Bookmark size={16} style={{ marginRight: 6, verticalAlign: -3 }} />
          Favorites ({favorites.length})
        </button>
        <button
          className="btn-ghost"
          onClick={() => setTab('presets')}
          style={{
            flex: 1, borderRadius: 8, padding: '10px 16px',
            background: tab === 'presets' ? 'var(--surface-2)' : 'transparent',
            color: tab === 'presets' ? 'var(--text)' : 'var(--text-secondary)',
          }}
        >
          <Star size={16} style={{ marginRight: 6, verticalAlign: -3 }} />
          Presets ({presets.length})
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>Loading...</div>
      ) : tab === 'favorites' ? (
        favorites.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>
            <Bookmark size={40} style={{ opacity: 0.3, marginBottom: 12 }} />
            <p>No favorites yet. Save a reply from the Generate tab.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {favorites.map((fav) => (
              <div key={fav.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
                  <span className="chip" style={{ fontSize: 11, padding: '3px 10px' }}>{fav.style_label}</span>
                  <button
                    className="btn-ghost"
                    onClick={() => deleteFavorite(fav.id)}
                    style={{ padding: 4 }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, fontStyle: 'italic' }}>
                  "{fav.original_conversation}"
                </p>
                <p
                  style={{ fontSize: 14, lineHeight: 1.5, cursor: 'pointer' }}
                  onClick={() => copyReply(fav.reply_text)}
                  title="Click to copy"
                >
                  {fav.reply_text}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8, fontSize: 11, color: 'var(--text-secondary)' }}>
                  <Clock size={12} />
                  {new Date(fav.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )
      ) : presets.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>
          <Star size={40} style={{ opacity: 0.3, marginBottom: 12 }} />
          <p>No presets yet. Create one from the Generate tab.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {presets.map((preset) => (
            <div key={preset.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{preset.name}</div>
                <div style={{ display: 'flex', gap: 6, fontSize: 12, color: 'var(--text-secondary)' }}>
                  <span className="chip" style={{ fontSize: 11, padding: '2px 8px' }}>{preset.goal}</span>
                  <span className="chip" style={{ fontSize: 11, padding: '2px 8px' }}>{preset.style}</span>
                  <span className="chip" style={{ fontSize: 11, padding: '2px 8px' }}>{preset.length}</span>
                </div>
              </div>
              <button className="btn-ghost" onClick={() => deletePreset(preset.id)} style={{ padding: 4 }}>
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
