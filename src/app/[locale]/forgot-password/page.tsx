'use client';

import { useState } from 'react';
import styles from './forgot-password.module.css';
import { forgotPassword } from '../../services/authService';
import { useTranslations } from 'next-intl';
import { Nav } from '@/app/components/nav';
import { SideBar } from '@/app/components/side-bar';
import { Link } from '@/i18n/navigation';

export default function ForgotPasswordPage() {
  const t = useTranslations('forgot');

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setErrorMessage('');

    try {
      await forgotPassword(email);
      setMessage('Se o e-mail estiver cadastrado, enviaremos um link de redefinição.');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || 'Erro ao enviar solicitação.');
      } else {
        setErrorMessage('Erro ao enviar solicitação.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Nav />
      <div className="page-content with-sidebar">
        <SideBar />

        <div className={styles.wrapper}>
          <section className={styles.card}>
            <h1>{t('title2')}</h1>
            <p>{t('title1')}</p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <label htmlFor="email">{t('label')}</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('placeholder-email')}
                required
              />

              <button type="submit" disabled={loading || !email}>
                {loading ? 'Enviando...' : t('text-button')}
              </button>
            </form>

            <Link href="/auth" className={styles.backLink}>{t('login')}</Link>

            {message && <p className={styles.success}>{message}</p>}
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          </section>
        </div>
      </div>
    </main>
  );
}
