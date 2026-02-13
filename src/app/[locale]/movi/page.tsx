"use client";

import styles from "./movi.module.css";
import { Nav } from "@/app/components/nav";
import { SideBar } from "@/app/components/side-bar";
import { useTranslations } from "next-intl";
import { Youtube, Instagram, Twitter } from "lucide-react";

export default function Movi() {
  const t = useTranslations("movi");

  return (
    <main>
      <Nav />
      <div className="page-content with-sidebar">
        <SideBar />

        <section className={styles.hero}>
          <div className={styles.textBlock}>
            <h1>{t("title1")}</h1>
            <p>{t("subTitle1")}</p>
            <div className={styles.socials}>
              <a href="#" aria-label="YouTube"><Youtube size={18} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
            </div>
          </div>

          <div className={styles.videoCard}>
            <iframe
              className={styles.video}
              src="https://www.youtube.com/embed/8KxkzngOGJY?si=vCYqzooc5h-bcN8U"
              title="Guia de movimentação"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          <div className={styles.heroImageWrap}>
            <img src="/imgs/movi-nuvem.png" alt="Nuvem decorativa" className={styles.cloud} />
            <img src="/imgs/Jett_movi.png" alt="Jett" className={styles.heroImage} />
          </div>
        </section>

        <section className={styles.grid}>
          <article className={styles.card}>
            <h3>POP SWING</h3>
            <p>Pop Swing — {t("popSwing")}</p>
          </article>

          <article className={styles.card}>
            <h3>AD AD (A DEAD)</h3>
            <p>{t("adText")}</p>
          </article>

          <article className={styles.card}>
            <h3>STRAFING</h3>
            <p>{t("strafingText")}</p>
          </article>
        </section>

        <section className={styles.adSlot} aria-label="Anúncio">
          <span>Espaço de anúncio horizontal entre conteúdo e CTA.</span>
        </section>
      </div>
    </main>
  );
}
