'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { forgotPassword } from '../services/authService';

export default function RedefinirSenha() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isMounted) return;

    setResult(null);
    setError(null);

    try {
      await forgotPassword(email); 
      setResult('Link de redefinição enviado com sucesso. Verifique seu e-mail!');
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Erro inesperado');
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex w-1/2 bg-red-500 items-center justify-center p-10 relative">
        <Image
          src="/imgs/email.svg"
          alt="E-mail"
          width={400}
          height={400}
          className="max-w-md w-full drop-shadow-lg"
        />
        <h2 className="text-white text-xl font-bold absolute bottom-10 text-center">
          Envio de recuperação de senhor por e-mail 
        </h2>
      </div>

      <div className="w-full lg:w-1/2 bg-black flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-6 font-[Jersey_10] text-center">
            Informe seu e-mail de cadastrado
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white mb-1" htmlFor="email">
                Informe seu e-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded font-bold transition duration-300"
            >Enviar E-mail</button>

            {result && (
              <div className="text-green-400 font-medium text-sm text-center">{result}</div>
            )}
            {error && (
              <div className="text-red-400 font-medium text-sm text-center">{error}</div>
            )}
          </form>

          <div className="text-center text-sm text-gray-400 mt-6">
            Lembrou da senha?{' '}<a href="/login" className="text-red-400 hover:underline">Voltar ao login</a>
          </div>
        </div>
      </div>
    </div>
  );
}
