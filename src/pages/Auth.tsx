import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context';

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let idx = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (idx <= text.length) {
          setDisplayed(text.slice(0, idx));
          idx++;
        } else {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 1000);
        }
      }, 50);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span>
      {displayed}
      {showCursor && <span style={{ animation: 'blink-cursor 0.8s step-end infinite', color: 'var(--accent)', fontWeight: 300 }}>|</span>}
    </span>
  );
}

export default function AuthPage() {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'grid', placeItems: 'center', minHeight: '100vh', padding: 24,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Floating gradient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 1 }}
      >
        {/* Hero */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: 40 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: 'spring', damping: 15 }}
        >
          {/* Logo */}
          <motion.div
            style={{
              width: 64, height: 64, borderRadius: 18,
              background: 'var(--gradient)',
              display: 'grid', placeItems: 'center',
              fontWeight: 900, fontSize: 22, color: 'white',
              margin: '0 auto 20px',
              animation: 'pulse-glow 3s ease-in-out infinite',
            }}
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            TR
          </motion.div>

          {/* 3D Title */}
          <h1 className="text-3d" style={{
            fontSize: 36, fontWeight: 900, letterSpacing: -1,
            lineHeight: 1.1,
          }}>
            Tone-Reply
          </h1>

          {/* Typewriter tagline */}
          <p style={{
            color: 'var(--text-secondary)', marginTop: 12, fontSize: 16,
            minHeight: 24,
          }}>
            <TypewriterText text="Craft the perfect reply, every time" delay={600} />
          </p>
        </motion.div>

        {/* Glass form card */}
        <motion.div
          className="glass"
          style={{ padding: 32 }}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', damping: 18 }}
        >
          <motion.form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
            animate={shake ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, type: 'spring', damping: 20 }}
            >
              <label className="label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, type: 'spring', damping: 20 }}
            >
              <label className="label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                required
                minLength={6}
              />
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    color: 'var(--error)', fontSize: 13, padding: '10px 14px',
                    background: 'rgba(239,68,68,0.1)', borderRadius: 10,
                    border: '1px solid rgba(239,68,68,0.2)',
                  }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              className="btn-gradient"
              disabled={loading}
              style={{ width: '100%', padding: '14px 24px', marginTop: 4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, type: 'spring', damping: 15 }}
            >
              <span>{loading ? 'Please wait...' : isLogin ? 'Sign in' : 'Create account'}</span>
            </motion.button>
          </motion.form>
        </motion.div>

        {/* Toggle link */}
        <motion.p
          style={{
            textAlign: 'center', marginTop: 24, fontSize: 14,
            color: 'var(--text-secondary)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <motion.button
            className="btn-ghost gradient-text"
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            style={{ fontSize: 14, fontWeight: 700, background: 'none', border: 'none' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </motion.button>
        </motion.p>
      </motion.div>
    </div>
  );
}
