import { useState } from 'react';
import { useAuth } from '../context';
import { chat } from '../api';
import { Sparkles, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

const goals = [
  'Flirt', 'Comfort', 'Support', 'Apologize', 'Celebrate',
  'Resolve Conflict', 'Express Love', 'Be Playful', 'Be Witty',
  'Be Confident', 'Be Mysterious', 'Be Direct', 'Show Interest',
  'Make Plans', 'Be Romantic', 'Be Supportive', 'Be Honest',
];

const lengths = ['Short', 'Medium', 'Long'];

interface GeneratedOption {
  style: string;
  text: string;
}

export default function GeneratePage() {
  const { token } = useAuth();
  const [conversation, setConversation] = useState('');
  const [goal, setGoal] = useState('Flirt');
  const [length, setLength] = useState('Medium');
  const [results, setResults] = useState<GeneratedOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleGenerate = async () => {
    if (!conversation.trim()) return;
    setLoading(true);
    setError('');
    setResults([]);
    try {
      const res = await chat.generate({
        conversation_text: conversation.trim(),
        goal,
        length,
      }, token!);
      setResults(res.options || []);
    } catch (err: any) {
      setError(err.message || 'Failed to generate');
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
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>Generate Reply</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: 4, fontSize: 14 }}>
          Paste a conversation and get the perfect response
        </p>
      </div>

      <div>
        <label className="label">Conversation</label>
        <textarea
          value={conversation}
          onChange={(e) => setConversation(e.target.value)}
          placeholder="Paste the message or conversation you're responding to..."
          rows={4}
        />
      </div>

      <div>
        <label className="label">Goal</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {goals.map((g) => (
            <button
              key={g}
              className={`chip ${goal === g ? 'active' : ''}`}
              onClick={() => setGoal(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <button
        className="btn-ghost"
        onClick={() => setShowAdvanced(!showAdvanced)}
        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}
      >
        Advanced options {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {showAdvanced && (
        <div>
          <label className="label">Length</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {lengths.map((l) => (
              <button
                key={l}
                className={`chip ${length === l ? 'active' : ''}`}
                onClick={() => setLength(l)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        className="btn-primary"
        onClick={handleGenerate}
        disabled={!conversation.trim() || loading}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 24px' }}
      >
        <Sparkles size={18} />
        {loading ? 'Generating...' : 'Generate Reply'}
      </button>

      {error && (
        <div style={{ color: 'var(--error)', fontSize: 13, padding: '12px 16px', background: 'rgba(239,68,68,0.1)', borderRadius: 8 }}>
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span className="label">Generated Options</span>
          {results.map((opt, idx) => (
            <div key={idx} className="card" style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>{opt.style}</span>
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
