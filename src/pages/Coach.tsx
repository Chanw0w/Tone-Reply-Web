import { useState } from 'react';
import { useAuth } from '../context';
import { chat } from '../api';
import { GraduationCap, Lightbulb } from 'lucide-react';

const topics = [
  { id: 'first-date', label: 'First Date Tips', icon: '咖啡' },
  { id: 'texting', label: 'Texting Strategy', icon: '💬' },
  { id: 'conflict', label: 'Conflict Resolution', icon: '🕊️' },
  { id: 'intimacy', label: 'Building Intimacy', icon: '❤️' },
  { id: 'boundaries', label: 'Setting Boundaries', icon: '🛡️' },
  { id: 'reconciliation', label: 'Making Up', icon: '🤝' },
];

export default function CoachPage() {
  const { token } = useAuth();
  const [selectedTopic, setSelectedTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError('');
    setAdvice('');
    try {
      const res = await chat.generate({
        conversation_text: `Coach question: ${question.trim()}`,
        goal: 'Be Supportive',
        length: 'Long',
      }, token!);
      const firstOption = res.options?.[0];
      setAdvice(firstOption?.text || res.reply || res.text || '');
    } catch (err: any) {
      setError(err.message || 'Failed to get advice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>Relationship Coach</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: 4, fontSize: 14 }}>
          Get personalized advice on navigating conversations
        </p>
      </div>

      <div>
        <label className="label">Choose a Topic</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
          {topics.map((topic) => (
            <button
              key={topic.id}
              className={`card ${selectedTopic === topic.id ? 'active' : ''}`}
              onClick={() => setSelectedTopic(selectedTopic === topic.id ? '' : topic.id)}
              style={{
                textAlign: 'left', cursor: 'pointer',
                borderColor: selectedTopic === topic.id ? 'var(--accent)' : undefined,
                background: selectedTopic === topic.id ? 'var(--accent-bg)' : undefined,
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>{topic.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{topic.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="label">Your Question</label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What do you need help with? Describe the situation..."
          rows={4}
        />
      </div>

      <button
        className="btn-primary"
        onClick={handleAsk}
        disabled={!question.trim() || loading}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 24px' }}
      >
        <GraduationCap size={18} />
        {loading ? 'Thinking...' : 'Get Advice'}
      </button>

      {error && (
        <div style={{ color: 'var(--error)', fontSize: 13, padding: '12px 16px', background: 'rgba(239,68,68,0.1)', borderRadius: 8 }}>
          {error}
        </div>
      )}

      {advice && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Lightbulb size={18} style={{ color: 'var(--accent)' }} />
            <span className="label" style={{ margin: 0 }}>Coach's Advice</span>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{advice}</p>
        </div>
      )}
    </div>
  );
}
