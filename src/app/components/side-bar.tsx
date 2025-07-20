'use client';

import styles from './css/sidebar.module.css';
import { Link } from '@/i18n/navigation';
import {
  BiHome,
  BiRun,
  BiStar,
  BiGlasses
} from 'react-icons/bi';

export function SideBar() {
  const items = [
    { href: '/home', icon: <BiHome size={21} color="#fff" /> },
    { href: '/movi', icon: <BiRun size={21} color="#fff" /> },
    { href: '/pixel', icon: <BiStar size={21} color="#fff" /> },
    { href: '/skills', icon: <BiGlasses size={21} color="#fff" /> }
  ];

  return (
    <div className={styles.menu}>
      <ul>
        {items.map(({ href, icon }) => (
          <li key={href}>
            <Link href={href}>
              <button>
                {icon}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
