import { useState } from 'react';
import { useAuth } from '../context';
import { chat } from '../api';
import { Repeat, Copy, Check } from 'lucide-react';

interface ToneVariation {
  tone: string;
  text: string;
}

export default function RewritePage() {
  const { token } = useAuth();
  const [text, setText] = useState('');
  const [results, setResults] = useState<ToneVariation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleRewrite = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError('');
    setResults([]);
    try {
      const res = await chat.rewrite({ text: text.trim() }, token!);
      const variations: ToneVariation[] = Object.entries(res).map(([tone, text]) => ({
        tone: tone.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        text: text as string,
      }));
      setResults(variations);
    } catch (err: any) {
      setError(err.message || 'Failed to rewrite');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>Rewrite Reply</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: 4, fontSize: 14 }}>
          Transform your draft into different tones
        </p>
      </div>

      <div>
        <label className="label">Your Draft Reply</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What you want to say..."
          rows={4}
        />
      </div>

      <button
        className="btn-primary"
        onClick={handleRewrite}
        disabled={!text.trim() || loading}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 24px' }}
      >
        <Repeat size={18} />
        {loading ? 'Rewriting...' : 'Rewrite'}
      </button>

      {error && (
        <div style={{ color: 'var(--error)', fontSize: 13, padding: '12px 16px', background: 'rgba(239,68,68,0.1)', borderRadius: 8 }}>
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span className="label">Tone Variations</span>
          {results.map((opt, idx) => (
            <div key={idx} className="card" style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>{opt.tone}</span>
                <button
                  className="btn-ghost"
                  onClick={() => handleCopy(opt.text, idx)}
                  style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}
                >
                  {copiedIdx === idx ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                </button>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.6, margin: 0 }}>{opt.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
