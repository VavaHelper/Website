'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  login,
  register,
  forgotPassword,
  resetPassword
} from '../../services/authService';
import {
  getAllAgents,
  getAgentByName,
  getAgentWithSkills
} from '../../services/agentService';

export default function TestServicesPage() {
  const [result, setResult] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  async function handleLogin() {
    try {
      const token = await login('admin', '123');
      setResult(token);
    } catch (e) {
      setResult(e.message);
    }
  }

  async function handleRegister() {
    try {
      const res = await register({ login: 'gabriel.alves.varella@gmail.com', password: 'Teste@123' });
      setResult(res);
    } catch (e) {
      setResult(e.message);
    }
  }

  async function handleForgotPassword() {
    try {
      const res = await forgotPassword('gabriel.varella1327@hotmail.com');
      console.log('Resposta:', res);
      setResult(res);
    } catch (e) {
      console.error('Erro:', e.message);
      setResult(e.message);
    }
  }

  async function handleResetPassword() {
    if (!token) {
      setResult('Token não encontrado na URL');
      return;
    }

    try {
      const res = await resetPassword({
        token,
        newPassword
      });
      setResult('Senha redefinida com sucesso!');
    } catch (e) {
      setResult(e.message);
    }
  }

  async function handleGetAgents() {
    try {
      const agents = await getAllAgents();
      setResult(agents);
    } catch (e) {
      setResult(e.message);
    }
  }

  async function handleGetAgentByName() {
    try {
      const agent = await getAgentByName('Sova');
      setResult(agent);
    } catch (e) {
      setResult(e.message);
    }
  }

  async function handleGetAgentWithSkills() {
    try {
      const agentSkills = await getAgentWithSkills('Sova');
      setResult(agentSkills);
    } catch (e) {
      setResult(e.message);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🔧 Teste de Serviços</h1>

      <button onClick={handleLogin} style={btnStyle}>Testar Login</button>
      <button onClick={handleRegister} style={btnStyle}>Testar Registro</button>
      <button onClick={handleForgotPassword} style={btnStyle}>Testar Forgot Password</button>
      <button onClick={handleGetAgents} style={btnStyle}>Listar Todos Agentes</button>
      <button onClick={handleGetAgentByName} style={btnStyle}>Buscar Agente por Nome</button>
      <button onClick={handleGetAgentWithSkills} style={btnStyle}>Agente + Habilidades</button>

      {token && (
        <div style={{ marginTop: 20 }}>
          <h3>🔐 Redefinir Senha</h3>
          <input
            type="password"
            placeholder="Nova senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ padding: 5, marginRight: 10 }}
          />
          <button onClick={handleResetPassword} style={btnStyle}>Enviar Nova Senha</button>
        </div>
      )}

      <h2>🧾 Resultado:</h2>
      <pre style={{ background: '#111', color: '#0f0', padding: 10 }}>
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
}

const btnStyle = {
  background: '#000',
  color: '#0f0',
  padding: 5,
  marginRight: 10,
  marginBottom: 10
};
