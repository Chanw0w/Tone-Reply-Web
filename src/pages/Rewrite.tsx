import { useState } from 'react';
import { useAuth } from '../context';
import { chat } from '../api';
import { Repeat, Copy, Check } from 'lucide-react';

const styles = ['Confident', 'Witty', 'Romantic', 'Playful', 'Supportive'];

export default function RewritePage() {
  const { token } = useAuth();
  const [conversation, setConversation] = useState('');
  const [originalReply, setOriginalReply] = useState('');
  const [style, setStyle] = useState('Witty');
  const [context, setContext] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleRewrite = async () => {
    if (!conversation.trim() || !originalReply.trim()) return;
    setLoading(true);
    setError('');
    setResult('');
    try {
      const res = await chat.rewrite({
        conversation: conversation.trim(),
        original_reply: originalReply.trim(),
        style,
        context: context.trim() || undefined,
      }, token!);
      setResult(res.rewritten_reply || res.reply || res.text || '');
    } catch (err: any) {
      setError(err.message || 'Failed to rewrite');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>Rewrite Reply</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: 4, fontSize: 14 }}>
          Transform your draft into a different tone
        </p>
      </div>

      <div>
        <label className="label">Original Conversation</label>
        <textarea
          value={conversation}
          onChange={(e) => setConversation(e.target.value)}
          placeholder="The conversation context..."
          rows={3}
        />
      </div>

      <div>
        <label className="label">Your Draft Reply</label>
        <textarea
          value={originalReply}
          onChange={(e) => setOriginalReply(e.target.value)}
          placeholder="What you want to say..."
          rows={3}
        />
      </div>

      <div>
        <label className="label">Desired Style</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {styles.map((s) => (
            <button
              key={s}
              className={`chip ${style === s ? 'active' : ''}`}
              onClick={() => setStyle(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="label">Additional Context (optional)</label>
        <input
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Extra context about the relationship..."
        />
      </div>

      <button
        className="btn-primary"
        onClick={handleRewrite}
        disabled={!conversation.trim() || !originalReply.trim() || loading}
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

      {result && (
        <div className="card" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span className="label" style={{ margin: 0 }}>Rewritten Reply</span>
            <button
              className="btn-ghost"
              onClick={handleCopy}
              style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}
            >
              {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
            </button>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{result}</p>
        </div>
      )}
    </div>
  );
}
