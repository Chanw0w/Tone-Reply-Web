const API_BASE = import.meta.env.VITE_API_URL || 'https://tone-reply-api.onrender.com';

interface ApiOptions {
  method?: string;
  body?: any;
  token?: string;
}

async function apiFetch<T = any>(path: string, options: ApiOptions = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (options.token) {
    headers['Authorization'] = `Bearer ${options.token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || data.error || 'Request failed');
  }
  return data;
}

export const auth = {
  register: (email: string, password: string) =>
    apiFetch('/api/auth/register', { method: 'POST', body: { email, password } }),
  login: (email: string, password: string) =>
    apiFetch('/api/auth/login', { method: 'POST', body: { email, password } }),
  me: (token: string) =>
    apiFetch('/api/auth/me', { token }),
};

export interface Preset {
  id: string;
  name: string;
  goal: string;
  style: string;
  length: string;
  created_at: string;
}

export interface Favorite {
  id: string;
  original_conversation: string;
  reply_text: string;
  style_label: string;
  created_at: string;
}

export const chat = {
  analyze: (conversation_text: string, token: string) =>
    apiFetch('/api/chat/analyze', { method: 'POST', body: { conversation_text }, token }),

  generate: (params: {
    conversation_text: string;
    goal: string;
    length: string;
  }, token: string) =>
    apiFetch('/api/chat/generate', { method: 'POST', body: params, token }),

  rewrite: (params: {
    text: string;
  }, token: string) =>
    apiFetch('/api/chat/rewrite', { method: 'POST', body: params, token }),

  getPresets: (token: string) =>
    apiFetch('/api/chat/presets', { token }),

  createPreset: (preset: { name: string; goal: string; style: string; length: string }, token: string) =>
    apiFetch('/api/chat/presets', { method: 'POST', body: preset, token }),

  deletePreset: (id: string, token: string) =>
    apiFetch(`/api/chat/presets/${id}`, { method: 'DELETE', token }),

  getFavorites: (token: string) =>
    apiFetch('/api/chat/favorites', { token }),

  createFavorite: (fav: { original_conversation: string; reply_text: string; style_label: string }, token: string) =>
    apiFetch('/api/chat/favorites', { method: 'POST', body: fav, token }),

  deleteFavorite: (id: string, token: string) =>
    apiFetch(`/api/chat/favorites/${id}`, { method: 'DELETE', token }),
};
