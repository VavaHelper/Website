'use client';

import { useState } from 'react';
import { register } from '../services/authService';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    login: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (!form.agree) {
      setError('Você deve concordar com as regras da comunidade');
      return;
    }

    try {
      setLoading(true);
      await register({ login: form.login, password: form.password });
      router.push('/login');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro desconhecido ao registrar.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full lg:w-1/2 bg-black flex flex-col items-center justify-center p-8 relative">
        <div className="absolute top-4 left-4">
          <Image src="/imgs/logoVavaHelper.svg" alt="Logo Vava Helper" width={180} height={50} />
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 mt-10">
          <h2 className="text-2xl font-bold text-white text-center">REGISTER</h2>

          <input
            type="text"
            name="login"
            placeholder="Username"
            value={form.login}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Repetir senha"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <label className="flex items-center text-white text-sm">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              className="mr-2"
            />
            <span>
              Concordo com as{' '}
              <a href="#" className="text-red-400 underline">regras da comunidade</a>.
            </span>
          </label>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded font-bold transition duration-300 disabled:opacity-50"
            disabled={loading}
          >
            ⭐ Criar
          </button>

          <p className="text-center text-sm text-gray-400">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-red-400 hover:underline">Login</Link>
          </p>
        </form>
      </div>

      {/* Lado com imagem e texto */}
      <div className="hidden lg:flex w-1/2 bg-red-500 items-center justify-center text-white text-center p-6">
        <div className="flex flex-col items-center text-center gap-2">
          <Image
            src="/imgs/logoLateralRegistro2.svg"
            alt="Logo lateral Vava Helper"
            width={250}
            height={250}
          />
          <h2 className="text-2xl font-bold mt-[-10px]">Welcome back!</h2>
          <p className="text-sm max-w-sm">
            Log in to access your personalized Valorant strategies, lineups, and community content.
          </p>
        </div>
      </div>
    </div>
  );
}
