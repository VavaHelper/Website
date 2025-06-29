export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface User {
  id: string;
  name: string; //por enquanto vai puxar nada
  // adicione outros campos que quiser
  // TODO: (BACKEND) -> Adicionar no BD uma nova coluna com criação de username aleatório
}
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Chama endpoint register.
*/
export async function register(data: RegisterData): Promise<void> {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    // ler corpo de erro, se tiver
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || 'Falha no registro');
  }

  // Se chegou até aqui, deu registro OK (201). Agora loga:
  await login({ email: data.email, password: data.password } as LoginCredentials);
}


/**
 * Chama endpoint login e salva token no localStorage.
*/
export async function login(creds: LoginCredentials): Promise<LoginResponse> {
  const res = await fetch('${API_URL}/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creds),
  });
  if (!res.ok) throw new Error('Falha no login');
  const data: LoginResponse = await res.json();
  localStorage.setItem('token', data.token);
  return data;
}


/**
 * Remove o token, efetua logout.
*/
export function logout() {
  localStorage.removeItem('token');
}


/**
 * Busca os dados do usuário logado, ou retorna null se não houver token.
 * TODO: (BACKEND) -> Desenvolver esse Endpoint de validação de Token
*/
export async function getCurrentUser(): Promise<User | null> {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const res = await fetch('${API_URL}/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    //token expirado: limpar
    logout();
    return null;
  }
  const user: User = await res.json();
  return user;
}