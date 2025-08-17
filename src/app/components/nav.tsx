'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './css/nav.module.css';
import Image from 'next/image';
import { getCurrentUser, logout, User } from '../services/auth';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { FaGlobe } from 'react-icons/fa';
import { language } from '../../../constants/language';

export function Nav() {
  const [showLanguages, setShowLanguages] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const pathname = usePathname(); // <-- Hook deve estar aqui
  
  const toggleLanguages = () => {
    setShowLanguages(prev => !prev);
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(prev => !prev);
    setShowLanguages(false);
  };

  useEffect(() => {
    getCurrentUser().then(u => setUser(u));

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowLanguages(false);
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const supportedLocales = language;

  const changeLocale = (locale: string) => {
    
    const segments = pathname.split('/').filter(Boolean);
    
    // Garante que a primeira parte é um locale suportado e remove
    const isLocale = supportedLocales.includes(segments[0]);
    const restOfPath = isLocale ? segments.slice(1) : segments;
    
    // Cria nova URL corretamente
    const newPath = `/${locale}/${restOfPath.join('/')}`;
    
    router.replace(newPath); 
  }; 

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Image
          src="/imgs/favicon.png"
          alt="avaHelper"
          width={56}
          height={21}
        />
        <h1 style={{ color: '#FF5252', fontWeight: 'bold', fontSize: '20px' }}>
          avaHelper
        </h1>
      </div>

      <div className={styles.right} ref={dropdownRef}>
        {user ? (
          <div className={styles.userMenu}>
            <span
              onClick={toggleUserMenu}
              style={{ cursor: 'pointer', fontWeight: 500 }}
            >
              👤 {user.name}
            </span>
            {showUserMenu && (
              <ul className={styles.userDropdown}>
                <li onClick={handleLogout}>Logout</li>
                <li onClick={() => (window.location.href = '/profile')}>Perfil</li>
                <li onClick={() => (window.location.href = '/settings')}>Configurações</li>
              </ul>
            )}
          </div>
        ) : (
          <>
            <div className={styles.languageSelector}>
              <FaGlobe
                onClick={toggleLanguages}
                style={{ color: '#ff5252', fontSize: '22px', cursor: 'pointer' }}
              />
              {showLanguages && (
                <ul className={styles.languageDropdown} style={{ fontSize: '15px' }}>
                  <li onClick={() => changeLocale('en')}>🇺🇸 English</li>
                  <li onClick={() => changeLocale('pt')}>🇧🇷 Português</li>
                  <li onClick={() => changeLocale('es')}>🇪🇸 Español</li>
                  <li onClick={() => changeLocale('fr')}>🇫🇷 Français</li>
                  <li onClick={() => changeLocale('de')}>🇩🇪 Deutsch</li>
                  <li onClick={() => changeLocale('it')}>🇮🇹 Italiano</li>
                  <li onClick={() => changeLocale('zh')}>🇨🇳 中文</li>
                  <li onClick={() => changeLocale('ja')}>🇯🇵 日本語</li>
                  <li onClick={() => changeLocale('ko')}>🇰🇷 한국어</li>
                </ul>
              )}
            </div>
            <button
              className={styles.loginButton}
              onClick={() => (window.location.href = '/login')}
            >
              <h1>Login</h1>
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
