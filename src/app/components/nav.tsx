"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./css/nav.module.css";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LanguageSelector } from "./languageSelector";
import { logout as serviceLogout } from "../services/auth";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { language } from "../../../constants/language";

interface AuthUser {
  id?: string;
  name: string;
  email?: string;
}

// Sem links na navbar (navegação ficará só na sidebar)
const NAV_LINKS: { href: string; label: string }[] = [];

function parseJwt(token?: string | null): Record<string, unknown> | null {
  if (!token) return null;
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export function Nav() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = useMemo(() => {
    const first = pathname?.split("/").filter(Boolean)[0];
    return language.includes(first) ? first : "pt";
  }, [pathname]);

  const withLocale = (path: string) => {
    const clean = path.startsWith("/") ? path : `/${path}`;
    return `/${currentLocale}${clean}`;
  };

  useEffect(() => {
    const syncUser = () => {
      if (typeof window === "undefined") return;
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        setUser(null);
        return;
      }

      const jwt = parseJwt(token);
      const name =
        (jwt?.name as string) ||
        (jwt?.username as string) ||
        (jwt?.login as string) ||
        (jwt?.email as string) ||
        (jwt?.sub as string) ||
        "Usuário";

      setUser({
        id: (jwt?.sub as string) || "me",
        name,
        email: (jwt?.email as string) || undefined,
      });
    };

    syncUser();

    const onStorage = () => syncUser();
    const onAuthChanged = () => syncUser();

    window.addEventListener("storage", onStorage);
    window.addEventListener("authChanged", onAuthChanged as EventListener);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("authChanged", onAuthChanged as EventListener);
    };
  }, []);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    try {
      serviceLogout();
    } catch {
      // fallback: apenas limpar storage
    }
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUser(null);
    setShowUserMenu(false);
    window.dispatchEvent(new Event("authChanged"));
    router.push(withLocale("/community"));
  };

  const isActive = (href: string) => {
    if (!pathname) return false;
    return pathname === withLocale(href) || pathname.startsWith(withLocale(`${href}/`));
  };

  return (
    <header className={styles.navbarWrapper}>
      <nav className={styles.navbar}>
        <div className={styles.leftZone}>
          <a href={withLocale("/community")} className={styles.brand}>
            <Image src="/imgs/favicon.png" alt="VavaHelper" width={32} height={32} />
            <span className={styles.brandText}>VavaHelper</span>
          </a>

          {/* Sem links desktop */}
          <ul className={styles.desktopLinks}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={withLocale(link.href)}
                  className={`${styles.navLink} ${isActive(link.href) ? styles.navLinkActive : ""}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.rightZone} ref={dropdownRef}>
          <LanguageSelector />

          {!user ? (
            <button
              className={styles.loginButton}
              onClick={() => router.push(withLocale("/auth"))}
            >
              Entrar / Criar conta
            </button>
          ) : (
            <div className={styles.userBlock}>
              <button
                className={styles.userButton}
                onClick={() => setShowUserMenu((prev) => !prev)}
                aria-label="Menu do usuário"
              >
                <FaUserCircle size={18} />
                <span className={styles.userName}>{user.name}</span>
              </button>

              <button
                className={styles.iconButton}
                onClick={handleLogout}
                title="Sair"
                aria-label="Sair"
              >
                <FaSignOutAlt size={16} />
              </button>

              {showUserMenu && (
                <div className={styles.userDropdown}>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      router.push(withLocale("/community"));
                    }}
                  >
                    Ver comunidade
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      router.push(withLocale("/auth"));
                    }}
                  >
                    Conta e segurança
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            className={styles.mobileToggle}
            aria-label="Abrir menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <ul>
            {/* Sem links mobile também */}
            {NAV_LINKS.map((link) => (
              <li key={`mobile-${link.href}`}>
                <a
                  href={withLocale(link.href)}
                  className={`${styles.mobileLink} ${isActive(link.href) ? styles.mobileLinkActive : ""}`}
                >
                  {link.label}
                </a>
              </li>
            ))}

            <li>
              {user ? (
                <button
                  className={`${styles.mobileLink} ${styles.mobileAuthButton}`}
                  onClick={handleLogout}
                >
                  Sair
                </button>
              ) : (
                <a href={withLocale("/auth")} className={`${styles.mobileLink} ${styles.mobileAuthButton}`}>
                  Entrar / Criar conta
                </a>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
