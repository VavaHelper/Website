'use client';
import Link from "next/link";
import styles from "./login.module.css";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../services/authService';

export default function Login() {
  const [result, setResult] = useState<string | null>(null);
  const t = useTranslations('login');
  const router = useRouter();

  // Se já tiver token (local ou session), redireciona direto pra /community
  useEffect(() => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token) {
        router.replace('/community');
      }
    } catch (e) {
      // se storage estiver bloqueado por algum motivo, apenas não redireciona
      console.warn('Erro acessando storage:', e);
    }
  }, [router]);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;
    const remember = (form.remember as HTMLInputElement).checked; // precisa ter name="remember" no input

    try {
      const token = await login(email, password);
      // armazena token conforme 'remember'
      if (remember) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }

      setResult('Login realizado com sucesso!');
      // redireciona para /community (replace evita que o usuário volte para /login com o botão voltar)
      router.replace('/community');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setResult(`Erro: ${err.message}`);
      } else {
        setResult("Erro desconhecido no login");
      }
    }
  }

  return (
    <div className={styles.global}>
      <div className={styles.screen1}>
        <div className={styles.logoWrapper}>
          <Link href={'/home'}>
            <Image
              src="/imgs/favicon.png"
              alt="avaHelper"
              width={50}
              height={21}
              className="filter brightness-0 invert"
            />
          </Link>
          <Link href={'/home'}>
            <h1 className={styles.logoTitle}>avaHelper</h1>
          </Link>
        </div>
        <div className={styles.imagemContainer}>
          <Image
            src="/imgs/login_no_background.png"
            alt="login"
            width={500}
            height={400}
            className={styles.backgroundImg}
          />
        </div>
      </div>

      <div className={styles.screen2}>
        <div className={styles.headerLogo}>
          <Link href={'/home'}>
            <Image
              src="/imgs/favicon.png"
              alt="avaHelper"
              width={50}
              height={21}
              className="filter brightness-0 invert"
            />
          </Link>
        </div>
        
        <h2 className={styles.title}>{t('title1')}</h2>

        <form className={styles.form} onSubmit={handleLogin}>
          <label htmlFor="email" className={styles.label}>{t('email')}</label>
          <input type="email" id="email" name="email" required className={styles.input} />

          <label htmlFor="password" className={styles.label}>{t('senha')}</label>
          <input type="password" id="password" name="password" required className={styles.input} />
          
          <div className={styles.rememberContainer}>
            <label htmlFor="remember" className={styles.rememberLabel}>
              <input type="checkbox" id="remember" name="remember" className={styles.rememberCheckbox} />
              {t("remenber")}
            </label>
            <Link href={'/forgot-password'} className={styles.forgotLink}>
                {t("forgotPassword")}
            </Link>
          </div>

          <button type="submit" className={styles.submitButton}>★ Entrar</button>
        </form>

        {result && (
          <p className={`${styles.result} ${result.startsWith("Erro") ? 'error' : ''}`} role="alert" aria-live="polite">
            {result}
          </p>
        )}

        <div className={styles.register}>
          <h1>
            {t("register")} 
            <Link href={'/register'} className={'text-[#FF5252]'}>
                {t("registerLink")}
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
}
