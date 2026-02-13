'use client';

import styles from './css/sidebar.module.css';
import { Link } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';
import {
  BiHome,
  BiRun,
  BiStar,
  BiGlasses,
  BiVideo,
} from 'react-icons/bi';

const items = [
  { href: '/community', label: 'Community', icon: BiVideo },
  { href: '/home', label: 'Home', icon: BiHome },
  { href: '/agents', label: 'Agents', icon: BiGlasses },
  { href: '/movi', label: 'Movi', icon: BiRun },
  { href: '/pixel', label: 'Pixel', icon: BiStar },
];

export function SideBar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!pathname) return false;
    const pathWithoutLocale = `/${pathname.split('/').filter(Boolean).slice(1).join('/')}`;
    return pathWithoutLocale === href || pathWithoutLocale.startsWith(`${href}/`);
  };

  return (
    <aside className={styles.menu} aria-label="Atalhos de navegação">
      <ul>
        {items.map(({ href, icon: Icon, label }) => (
          <li key={href}>
            <Link href={href} className={`${styles.item} ${isActive(href) ? styles.itemActive : ''}`}>
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
