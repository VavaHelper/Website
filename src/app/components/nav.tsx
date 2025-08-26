'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './css/nav.module.css';
import Image from 'next/image';
import { getCurrentUser, logout as serviceLogout, User } from '../services/auth';
import { useRouter } from 'next/navigation';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { LanguageSelector } from './languageSelector';

function parseJwt(token?: string): Record<string, any> | null {
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.warn('parseJwt falhou', e);
    return null;
  }
}

export function Nav() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const toggleUserMenu = () => setShowUserMenu(prev => !prev);

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      if (!mounted) return;
      const token = typeof window !== 'undefined' && (localStorage.getItem('token') || sessionStorage.getItem('token'));
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const u = await getCurrentUser();
        if (u) {
          if (!mounted) return;
          setUser(u);
          return;
        }
      } catch (e) {
        console.debug('Nav: getCurrentUser erro, vai usar decode', e);
      }

      const payload = parseJwt(token);
      if (payload) {
        const nameFromToken = payload.name || payload.username || payload.email || payload.sub || 'Usuário';
        if (!mounted) return;
        setUser({ id: String(payload.sub ?? 'me'), name: nameFromToken });
      } else {
        if (!mounted) return;
        setUser({ id: 'me', name: 'Usuário' });
      }
    };

    loadUser();

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    const handleStorageEvent = () => loadUser();
    const handleAuthChanged = () => loadUser();

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('storage', handleStorageEvent);
    window.addEventListener('authChanged', handleAuthChanged as EventListener);

    return () => {
      mounted = false;
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('storage', handleStorageEvent);
      window.removeEventListener('authChanged', handleAuthChanged as EventListener);
    };
  }, []);

  const handleLogout = () => {
    try {
      try { serviceLogout(); } catch (e) { console.warn('serviceLogout erro', e); }
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    } catch (e) {
      console.warn('Erro limpando storage no logout', e);
    }

    setUser(null);
    window.dispatchEvent(new Event('authChanged'));
    router.replace('/home');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Image src="/imgs/favicon.png" alt="avaHelper" width={56} height={21} />
        <h1 style={{ color: '#FF5252', fontWeight: 'bold', fontSize: '20px' }}>
          avaHelper
        </h1>
      </div>

      <div className={styles.right} ref={dropdownRef}>
        {/* Componente de idiomas separado */}
        <LanguageSelector />

        {!user && (
          <button
            className={styles.loginButton}
            onClick={() => router.push('/login')}
            style={{ marginRight: 8 }}
          >
            <h1>Login</h1>
          </button>
        )}

        {user && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={toggleUserMenu}
              title="Menu do usuário"
              aria-label="Menu do usuário"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                padding: 6,
              }}
            >
              <FaUserCircle style={{ fontSize: 22, color: '#333' }} />
            </button>

            <button
              onClick={handleLogout}
              title="Logout"
              aria-label="Logout"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                padding: 6,
              }}
            >
              <FaSignOutAlt style={{ fontSize: 18, color: '#FF5252' }} />
            </button>

            {showUserMenu && (
              <ul className={styles.userDropdown} style={{ position: 'absolute', right: 16 }}>
                <li onClick={() => { setShowUserMenu(false); router.push('/profile'); }}>Perfil</li>
                <li onClick={() => { setShowUserMenu(false); router.push('/settings'); }}>Configurações</li>
              </ul>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
