"use client";

import styles from "./movi.module.css";
import { Nav } from "@/app/components/nav";
import { SideBar } from "@/app/components/side-bar";
import { useTranslations } from "next-intl";
import { Youtube, Instagram, Twitter } from "lucide-react";

export default function Movi() {
  const t = useTranslations("movi");

  return (
    <div className="global">
      <Nav />
      <SideBar />

      {/* main container já com margem para sidebar/navbar (mantive sua classe .container no module) */}
      <main className={styles.container}>
        {/* layout: esquerda (card) + direita (imagem grande) */}
        <section className={styles.layout}>
          <aside className={styles.leftCard}>
            <img
              src="/imgs/movi-nuvem.png"
              alt="nuvem"
              className={styles.nuvemImage2}
            />
            <div className={styles.thumbWrap}>
              <iframe
                className={styles.thumbIframe}
                src="https://www.youtube.com/embed/8KxkzngOGJY?si=vCYqzooc5h-bcN8U" //Colocar URL aqui
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className={styles.meta}>
              <h2 className={styles.title}>{t("title1")}</h2>
              <p className={styles.description}>
                Pop Swing, AD AD e Strafing — {t("subTitle1")}
              </p>

              <div className="flex gap-3 mt-2">
                <a
                  href="#"
                  className="p-2 rounded-lg bg-black/5 hover:bg-white/4 transition-transform duration-300 ease-out hover:scale-110 hover:rotate-6">
                  <Youtube className="w-6 h-6 text-red-500 hover:text-red-400 transition-colors" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-black/5 hover:bg-white/4 transition-transform duration-300 ease-out hover:scale-110 hover:rotate-6">
                  <Instagram className="w-6 h-6 text-pink-500 hover:text-pink-400 transition-colors" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-black/5 hover:bg-white/4 transition-transform duration-300 ease-out hover:scale-110 hover:rotate-6">
                  <Twitter className="w-6 h-6 text-sky-400 hover:text-sky-300 transition-colors" />
                </a>
              </div>
            </div>
          </aside>

          <div className={styles.heroWrap}>
            <img src="/imgs/movi-nuvem.png" className={styles.nuvemImage} />
            <img src="/imgs/jett_movi.png" className={styles.heroImage} />
            {[...Array(8)].map((_, i) => (
              <span key={i} className={styles.particle} style={{
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 80}%`,
                animationDelay: `${Math.random() * 6}s`
              }} />
            ))}
          </div>
        </section>

        <section className={styles.cardGrid}>
          <article
            className={styles.card}
            tabIndex={0}
            role="article"
            aria-labelledby="pop-swing"
          >
            <div className={styles.cardHead}>
              <svg
                className={styles.iconCard}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M12 2L15 8l6 .5-4.5 4 1.5 6L12 16l-6 3 1.5-6L3 8.5 9 8 12 2z"
                  fill="currentColor"
                />
              </svg>
              <h3 id="pop-swing" className={styles.cardTitle}>
                POP SWING
              </h3>
            </div>
            <p className={styles.cardDesc}>Pop Swing — {t("popSwing")}</p>
          </article>

          <article
            className={styles.card}
            tabIndex={0}
            role="article"
            aria-labelledby="ad-ad"
          >
            <div className={styles.cardHead}>
              <svg
                className={styles.iconCard}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M3 12h18M12 3v18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <h3 id="ad-ad" className={styles.cardTitle}>
                AD AD (A DEAD)
              </h3>
            </div>
            <p className={styles.cardDesc}>{t("adText")}</p>
          </article>

          <article
            className={styles.card}
            tabIndex={0}
            role="article"
            aria-labelledby="strafing"
          >
            <div className={styles.cardHead}>
              <svg
                className={styles.iconCard}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M4 12h16M8 8l-4 4 4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 id="strafing" className={styles.cardTitle}>
                STRAFING
              </h3>
            </div>
            <p className={styles.cardDesc}>{t("strafingText")}</p>
          </article>
        </section>
      </main>
    </div>
  );
}
