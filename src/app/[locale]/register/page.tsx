'use client';

import { useState } from 'react';
import { register } from '../../services/authService';
import { useRouter } from 'next/navigation';
import styles from "./register.module.css";
import Image from 'next/image';
import Link from 'next/link';
import { HiCheck } from 'react-icons/hi';

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
    <div className={styles.body}>
      <div className="flex min-h-screen">
        <div className="w-full lg:w-1/2 bg-black flex flex-col items-center justify-center p-8 relative">
          <div className="absolute top-4 left-4">
            <Image src="/imgs/logoVavaHelper.svg" alt="Logo Vava Helper" width={180} height={50} />
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto mt-10 bg-black bg-opacity-80 p-6 rounded-lg space-y-5"
          >
            <h2 className="text-1xl font-bold text-white text-center">REGISTER</h2>

            {/* E‑mail */}
            <div className="space-y-1">
              <label htmlFor="login" className="block text-white text-sm">
                E‑mail <span className="text-red-500">*</span>
              </label>
              <input
                id="login"
                type="email"
                name="login"
                placeholder=""
                value={form.login}
                onChange={handleChange}
                required
                className="w-full p-2 bg-transparent placeholder-gray-500 text-white border border-red-500 rounded focus:ring-0 focus:outline-none"
              />
            </div>

            {/* Senha */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-white text-sm">
                Senha <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder=""
                value={form.password}
                onChange={handleChange}
                required
                className="w-full p-2 bg-transparent placeholder-gray-500 text-white border border-red-500 rounded focus:ring-0 focus:outline-none"
              />
            </div>

            {/* Confirmar senha */}
            <div className="space-y-1 relative">
              <label htmlFor="confirmPassword" className="block text-white text-sm">
                Repetir senha <span className="text-red-500">*</span>
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder=""
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full p-2 bg-transparent placeholder-gray-500 text-white border border-red-500 rounded focus:ring-0 focus:outline-none"
              />
              {form.confirmPassword && form.password === form.confirmPassword && (
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-red-500 rounded-full p-1">
                  <HiCheck className="h-4 w-4 text-white" />
                </span>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-white text-sm">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                    className="custom-checkbox mr-1"
                  />
                Concordo com as{' '}<a className="text-red-500 text-sm hover:underline"> regras da comunidade.</a>
              </label>
              
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition duration-200 disabled:opacity-50"
              disabled={loading}
            >
              ★ Criar
            </button>

            <p className="text-left text-sm text-white">
              Já tem uma conta?{' '}
              <Link href="/login" className="text-red-500 hover:underline ">
                Login
              </Link>
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
    </div>
  );
}
