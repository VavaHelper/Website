"use client";

import styles from "./movi.module.css";
import { Nav } from '@/app/components/nav';
import { SideBar } from '@/app/components/side-bar';
import { useTranslations } from 'next-intl';


export default function Movi() {
  
  const t = useTranslations('movi');
  
  return (
    <div className="global">
      <Nav />
      <SideBar />

      {/* main container já com margem para sidebar/navbar (mantive sua classe .container no module) */}
      <main className={styles.container}>

        {/* layout: esquerda (card) + direita (imagem grande) */}
        <section className={styles.layout}>
          <aside className={styles.leftCard}>
            <img src="/imgs/movi-nuvem.png" 
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
                Pop Swing, AD AD e Strafing — exercícios e dicas para melhorar sua movimentação.
              </p>

              <div className={styles.socialIcons} aria-label="Redes sociais">
                <a href="#" aria-label="YouTube" className={styles.icon}>
                  <svg viewBox="0 0 24 24" width="20" height="20" role="img"><path d="M10 15l5-3-5-3v6z"/><rect x="2" y="5" width="20" height="14" rx="4"/></svg>
                </a>
                <a href="#" aria-label="Instagram" className={styles.icon}>
                  <svg viewBox="0 0 24 24" width="20" height="20" role="img"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3"/><circle cx="17.5" cy="6.5" r="1"/></svg>
                </a>
                <a href="#" aria-label="Twitter" className={styles.icon}>
                  <svg viewBox="0 0 24 24" width="20" height="20" role="img"><path d="M23 4.5c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.3 1.7-2.2-.7.4-1.6.7-2.4.8C19.3 3 18.1 2.5 16.9 2.5c-2 0-3.6 1.7-3.6 3.8 0 .3 0 .6.1.8C9.7 6.8 6.1 5 3.6 2.3c-.4.7-.6 1.6-.6 2.5 0 1.4.7 2.6 1.8 3.3-.6 0-1.2-.2-1.8-.5v.1c0 2.3 1.6 4.2 3.7 4.6-.4.1-.9.2-1.3.2-.3 0-.6 0-.9-.1.6 2 2.3 3.5 4.3 3.5-1.6 1.2-3.6 2-5.7 2-.4 0-.8 0-1.2-.1 2 1.3 4.3 2 6.8 2 8.2 0 12.7-6.9 12.7-12.9v-.6c.9-.7 1.6-1.5 2.2-2.4-.8.3-1.7.6-2.6.7z"/></svg>
                </a>
              </div>
            </div>
          </aside>

          <div className={styles.heroWrap}>
            <img src="/imgs/movi-nuvem.png" 
                alt="nuvem"
                className={styles.nuvemImage}
            />
            <img
              src="/imgs/jett_movi.png"
              alt="personagem grande"
              className={styles.heroImage}
            />
          </div>
        </section>

        <section className={styles.cardGrid}>
          <article className={styles.card} tabIndex={0} role="article" aria-labelledby="pop-swing">
            <div className={styles.cardHead}>
              <svg className={styles.iconCard } viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2L15 8l6 .5-4.5 4 1.5 6L12 16l-6 3 1.5-6L3 8.5 9 8 12 2z" fill="currentColor"/>
              </svg>
              <h3 id="pop-swing" className={styles.cardTitle}>POP SWING</h3>
            </div>
            <p className={styles.cardDesc}>Pop Swing — você continua se movimentando para tirar a precisão de mira do seu oponente.</p>
          </article>

          <article className={styles.card} tabIndex={0} role="article" aria-labelledby="ad-ad">
            <div className={styles.cardHead}>
              <svg className={styles.iconCard } viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 12h18M12 3v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <h3 id="ad-ad" className={styles.cardTitle}>AD AD (A DEAD)</h3>
            </div>
            <p className={styles.cardDesc}>Movimentação lateral para um lado e para o outro para dificultar o tiro do inimigo.</p>
          </article>

          <article className={styles.card} tabIndex={0} role="article" aria-labelledby="strafing">
            <div className={styles.cardHead}>
              <svg className={styles.iconCard } viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 12h16M8 8l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 id="strafing" className={styles.cardTitle}>STRAFING</h3>
            </div>
            <p className={styles.cardDesc}>Se mover lateralmente, mantendo um ritmo e precisão em seus movimentos.</p>
          </article>
        </section>
      </main>
    </div>
  );
}