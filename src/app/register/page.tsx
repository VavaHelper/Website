'use client';

import { useState } from 'react';
import { register } from '../services/authService';
import styles from './register.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
    <div className={styles.container}>
      <div className={styles.formSide}>
        <div className={styles.logo}>
          <Image src="/imgs/logoVavaHelper.svg" alt="Logo Vava Helper" width={180} height={50} />
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>REGISTER</h2>

          <input
            className={styles.pixelInput}
            type="text"
            name="login"
            placeholder="Username"
            value={form.login}
            onChange={handleChange}
            required
          />

          <input
            className={styles.pixelInput}
            type="password"
            name="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            className={styles.pixelInput}
            type="password"
            name="confirmPassword"
            placeholder="Repetir senha"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
            />
            <span>
              Concordo com as <a href="#">regras da comunidade</a>.
            </span>
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.pixelButton} disabled={loading}>
            ⭐ Criar
          </button>

          <p className={styles.loginLink}>
            Já tem uma conta? <a href="/login">Login</a>
          </p>
        </form>
      </div>

      <div className={styles.welcomeSide}>
        <div className={styles.icon}>
          <Image
            src="/imgs/logoLateralRegistro.svg"
            alt="Logo lateral Vava Helper"
            width={505}
            height={505}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
        <h2>Welcome back!</h2>
        <p>
          Log in to access your personalized Valorant strategies, lineups, and
          community content.
        </p>
      </div>
    </div>
  );
}
