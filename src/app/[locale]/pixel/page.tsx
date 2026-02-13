"use client";

import styles from "./pixel.module.css";
import { Nav } from "@/app/components/nav";
import { SideBar } from "@/app/components/side-bar";

const pixelCards = [
  {
    title: "Ascent • A Main",
    description:
      "Pixel de abertura para punir avanço agressivo no início da rodada.",
    image: "/imgs/molotov-lineup.png",
  },
  {
    title: "Bind • Hookah",
    description:
      "Setup seguro para pós-plant com informação e controle de espaço.",
    image: "/imgs/background.png",
  },
  {
    title: "Haven • C Long",
    description:
      "Posicionamento para pick rápido sem exposição total ao retake.",
    image: "/imgs/background.png",
  },
];

export default function Pixel() {
  return (
    <main>
      <Nav />
      <div className="page-content with-sidebar">
        <SideBar />

        <section className={styles.hero}>
          <div>
            <p className={styles.kicker}>Map knowledge</p>
            <h1>Pixels inteligentes para subir seu nível competitivo.</h1>
            <p>
              Treine posicionamentos práticos com visual limpo e foco em execução
              real de partida.
            </p>
          </div>
          <img src="/imgs/Brim_pixel.png" alt="Brimstone" className={styles.heroImage} />
        </section>

        <section className={styles.grid}>
          {pixelCards.map((card) => (
            <article key={card.title} className={styles.card}>
              <img src={card.image} alt={card.title} className={styles.cardImage} />
              <div className={styles.cardBody}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </article>
          ))}
        </section>

        <section className={styles.adSlot} aria-label="Anúncio">
          <span>Anúncio recomendado abaixo do conteúdo principal (responsivo).</span>
        </section>
      </div>
    </main>
  );
}
