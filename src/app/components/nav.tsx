"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './css/nav.module.css';
import Image from 'next/image';
import { getCurrentUser, logout, User } from '../services/auth';

export function Nav() {
  const [showLanguages, setShowLanguages] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Toggle language dropdown
  const toggleLanguages = () => {
    setShowLanguages(prev => !prev);
    setShowUserMenu(false);
  };

  // Toggle user menu dropdown
  const toggleUserMenu = () => {
    setShowUserMenu(prev => !prev);
    setShowLanguages(false);
  };

  useEffect(() => {
    // Carrega usuário logado (se houver token)
    getCurrentUser().then(u => setUser(u));

    // Fecha dropdowns ao clicar fora
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
    // opcional: redirecionar
    // window.location.href = '/';
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Image
          src="/imgs/favicon.png"
          alt="avaHelper"
          width={33}
          height={21}
        />
        <h1 style={{ color: '#FF5252', fontWeight: 'bold', fontSize: '20px' }}>
          avaHelper
        </h1>
      </div>

      <div className={styles.right} ref={dropdownRef}>
        {/* Se usuário logado */}
        {user ? (
          <div className={styles.userMenu}>
            <span
              onClick={toggleUserMenu}
              style={{ cursor: 'pointer', fontWeight: 500 }}
            >
              {/* Falta Realizar o "TODO:" */}
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
            {/* Se não estiver logado, mostra seleção de idioma e botão de login */}
            <div className={styles.languageSelector}>
              <i
                className="bx bx-globe"
                onClick={toggleLanguages}
                style={{ color: '#ff5252', fontSize: '22px', cursor: 'pointer' }}
              />
              {showLanguages && (
                <ul className={styles.languageDropdown} style={{ fontSize: '15px' }}>
                  <li>🇺🇸 English</li>
                  <li>🇧🇷 Português</li>
                  <li>🇪🇸 Español</li>
                  <li>🇫🇷 Français</li>
                  <li>🇩🇪 Deutsch</li>
                  <li>🇮🇹 Italiano</li>
                  <li>🇨🇳 中文</li>
                  <li>🇯🇵 日本語</li>
                  <li>🇰🇷 한국어</li>
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
