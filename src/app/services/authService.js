const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(username, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login: username, password })
  });

  let data;
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.message || 'Erro no login');
  }

  if (!data.token) {
    throw new Error('Resposta inválida do servidor: token não encontrado');
  }

  localStorage.setItem('token', data.token);
  return data.token;
}


export async function register({ login, password }) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password })
  });

  const text = await response.text();
  let data;

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text }; // se não for JSON, coloque a mensagem crua aqui
  }

  if (!response.ok) {
    throw new Error(data.message || 'Erro ao registrar usuário');
  }

  return data;
}

export async function forgotPassword(email) {
  const response = await fetch(`${API_URL}/auth/forgot-password?email=${encodeURIComponent(email)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
    // Nenhum body necessário!
  });

  const text = await response.text();
  console.log('Status da resposta:', response.status);
  console.log('Texto da resposta:', text);

  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text };
  }

  if (!response.ok) {

    if (response.status === 403) {
    throw new Error('Já foi enviado um link de redefinição. Verifique seu e-mail.');
    }
    
    throw new Error(data.message || `Erro ${response.status}: ao solicitar redefinição de senha`);
  }

  return data;
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
