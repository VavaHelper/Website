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
    { href: '/home', icon: <BiHome size={24} color="#FF5252" /> },
    { href: '/skills', icon: <BiGlasses size={24} color="#FF5252" /> },
    { href: '/movi', icon: <BiRun size={24} color="#FF5252" /> },
    { href: '/pixel', icon: <BiStar size={24} color="#FF5252" /> },
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
