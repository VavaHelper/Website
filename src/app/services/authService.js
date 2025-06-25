const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(username, password) {
  const basicAuth = btoa(`${username}:${password}`);
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basicAuth}`,
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro no login');

  localStorage.setItem('token', data.token);
  return data.token;
}

export async function register({ login, password }) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password })
  });

  if (!response.ok) throw new Error('Erro ao registrar usuário');
  return response.json();
}

export async function forgotPassword(email) {
  const response = await fetch(`${API_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });

  if (!response.ok) throw new Error('Erro ao solicitar redefinição de senha');
  return response.json();
}

export async function resetPassword({ token, newPassword }) {
  const response = await fetch(`${API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword })
  });

  if (!response.ok) throw new Error('Erro ao redefinir senha');
  return response.json();
}
