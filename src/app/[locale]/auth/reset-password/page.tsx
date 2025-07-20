'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { resetPassword } from '../../../services/authService';

export default function RedefinirSenha() {
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (urlToken) {
      console.log(urlToken);
      setToken(urlToken);
    } else {
      setError('Token não encontrado na URL. Verifique o link.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError('Token não disponível. Por favor, use o link enviado por e-mail.');
      return;
    }

    try {
      console.log('Enviando token:', token, 'e senha:', senha); // Log para depuração
      await resetPassword({ token, newPassword: senha });
      alert('Senha redefinida com sucesso!');
      router.push('/login');
    } catch (err: unknown) {
      let errorMessage = 'Erro ao redefinir a senha. Tente novamente.';
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      } else if (err && typeof err === 'object' && 'message' in err) {
        errorMessage = (err as { message: string }).message;
      }
      console.error('Erro capturado:', err); // Log do erro completo
      setError(errorMessage);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* NAVBAR */}
      <nav className="absolute top-0 left-0 w-full z-10 p-4">
        <div className="flex items-center gap-3">
          <Link href="/home">
            <Image
              src="/imgs/favicon.png"
              alt="avaHelper"
              width={33}
              height={21}
              className="filter brightness-0 invert"
            />
          </Link>
          <Link href="/home">
            <h1 className="text-white text-2xl font-bold">avaHelper</h1>
          </Link>
        </div>
      </nav>
      <div className="hidden lg:flex w-1/2 bg-red-500 items-center justify-center p-10 relative">
        <Image
          src="/imgs/Security On-amico.svg"
          alt="Segurança"
          width={400}
          height={400}
          className="max-w-md w-full drop-shadow-lg"
        />
        <h2 className="text-white text-xl font-bold absolute bottom-10 text-center">
          Sua segurança é prioridade
        </h2>
      </div>

      <div className="w-full lg:w-1/2 bg-black flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-6 font-[Jersey_10] text-center">
            Redefinir Senha
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white mb-1" htmlFor="senha">
                Nova Senha
              </label>
              <input
                id="senha"
                type="password"
                placeholder="Digite sua nova senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded font-bold transition duration-300"
            >
              Redefinir Senha
            </button>
          </form>

          <div className="text-center text-sm text-gray-400 mt-6">
            Lembrou da senha?{' '}
            <a href="/login" className="text-red-400 hover:underline">
              Voltar ao login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}