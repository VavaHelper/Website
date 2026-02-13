'use client';

import { useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { login, register } from '../../services/authService';

export default function AuthPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const isLogin = mode === 'login';

  const title = useMemo(() => (isLogin ? 'Entrar na conta' : 'Criar conta'), [isLogin]);

  const locale = useMemo(() => {
    const first = pathname?.split('/').filter(Boolean)[0];
    return first || 'pt';
  }, [pathname]);

  const withLocale = (path: string) => `/${locale}${path.startsWith('/') ? path : `/${path}`}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    setMessage('');
    setLoading(true);
    try {
      if (isLogin) {
        const remember = (form.elements.namedItem('remember') as HTMLInputElement | null)?.checked ?? true;
        const token = await login(email, password);
        if (remember) localStorage.setItem('token', token);
        else sessionStorage.setItem('token', token);
        window.dispatchEvent(new Event('authChanged'));
        router.replace(withLocale('/community'));
        return;
      }

      const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value;
      const agree = (form.elements.namedItem('agree') as HTMLInputElement).checked;
      if (password !== confirmPassword) throw new Error('As senhas não coincidem.');
      if (!agree) throw new Error('Você precisa aceitar os termos para continuar.');

      await register({ login: email, password });
      setMessage('Conta criada com sucesso! Agora faça login.');
      setMode('login');
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : 'Erro inesperado.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-[#0b0b0f] text-white grid lg:grid-cols-2">
      <aside className="hidden lg:flex items-center justify-center border-r border-white/10 p-8">
        <div className="max-w-md space-y-6">
          <Image src="/imgs/login_no_background.png" alt="Vava Helper" width={560} height={420} className="w-full h-auto" />
          <h1 className="text-3xl font-semibold">VavaHelper</h1>
          <p className="text-white/70">Acesse conteúdo da comunidade com UX otimizada e acesso progressivo.</p>
        </div>
      </aside>

      <main className="flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#11141b] p-6 md:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <Link href={withLocale('/home')} className="inline-flex items-center gap-2 text-white/80 hover:text-white">
              <Image src="/imgs/favicon.png" alt="logo" width={26} height={26} />
              <span className="font-semibold">VavaHelper</span>
            </Link>
            <div className="inline-flex rounded-lg bg-black/30 p-1">
              <button onClick={() => setMode('login')} className={`px-3 py-1.5 text-sm rounded-md ${isLogin ? 'bg-red-500 text-white' : 'text-white/70'}`}>Entrar</button>
              <button onClick={() => setMode('register')} className={`px-3 py-1.5 text-sm rounded-md ${!isLogin ? 'bg-red-500 text-white' : 'text-white/70'}`}>Cadastrar</button>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-5">{title}</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-white/80">E-mail</label>
              <input name="email" type="email" required className="mt-1 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 outline-none focus:border-red-500" />
            </div>
            <div>
              <label className="text-sm text-white/80">Senha</label>
              <input name="password" type="password" required className="mt-1 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 outline-none focus:border-red-500" />
            </div>

            {!isLogin && (
              <>
                <div>
                  <label className="text-sm text-white/80">Confirmar senha</label>
                  <input name="confirmPassword" type="password" required className="mt-1 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 outline-none focus:border-red-500" />
                </div>
                <label className="flex items-center gap-2 text-sm text-white/80">
                  <input name="agree" type="checkbox" className="accent-red-500" /> Aceito os termos da comunidade
                </label>
              </>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-white/80"><input name="remember" type="checkbox" className="accent-red-500" defaultChecked /> Lembrar-me</label>
                <Link href={withLocale('/forgot-password')} className="text-sm text-red-400 hover:text-red-300">Esqueci a senha</Link>
              </div>
            )}

            {message && <p className="text-sm text-red-300">{message}</p>}

            <button disabled={loading} className="w-full rounded-lg bg-red-500 px-4 py-2.5 font-medium hover:bg-red-600 disabled:opacity-60">
              {loading ? 'Processando...' : isLogin ? 'Entrar' : 'Criar conta'}
            </button>
          </form>
        </div>
      </main>
    </section>
  );
}
