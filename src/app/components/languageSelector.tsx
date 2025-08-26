'use client';

import { useState, useRef, useEffect } from 'react';
import { FaGlobe } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';
import { language } from '../../../constants/language';
import styles from './css/nav.module.css';

export function LanguageSelector() {
  const [showLanguages, setShowLanguages] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const supportedLocales = language;

  const toggleLanguages = () => setShowLanguages(prev => !prev);

  const changeLocale = (locale: string) => {
    const segments = pathname.split('/').filter(Boolean);
    const isLocale = supportedLocales.includes(segments[0]);
    const restOfPath = isLocale ? segments.slice(1) : segments;
    const newPath = `/${locale}/${restOfPath.join('/')}`;
    router.replace(newPath);
    setShowLanguages(false);
  };

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLanguages(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.languageSelector} style={{ marginRight: 12 }} ref={dropdownRef}>
      <FaGlobe
        onClick={toggleLanguages}
        style={{ color: '#ff5252', fontSize: '20px', cursor: 'pointer' }}
        title="Mudar idioma"
        aria-label="Mudar idioma"
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
  );
}
