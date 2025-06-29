'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function RedefinirSenha() {
  const [senha, setSenha] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isMounted) return;

    alert('Senha redefinida com sucesso!');
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen">
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
