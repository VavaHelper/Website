"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './css/nav.module.css';

export function Nav() {
  const [showLanguages, setShowLanguages] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // 👈 aqui

  const toggleLanguages = () => {
    setShowLanguages(!showLanguages);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLanguages(false);
      }
    };

    const handleWindowBlur = () => {
      setShowLanguages(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <img src="/logo.png" alt=""/>
        <h1 style={{ color: '#FF5252', fontWeight: 'bold' }}>avaHelper</h1>
      </div>

      <div className={styles.right}>
        <div className={styles.languageSelector} ref={dropdownRef}>
          <i 
            className="bx bx-globe"
            onClick={toggleLanguages}
            style={{ color: '#ff5252', fontSize: '25px', cursor: 'pointer' }}
          ></i>

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

        <button className={styles.loginButton}>
          <h1>Login</h1>
        </button>
      </div>
    </nav>
  );
}
