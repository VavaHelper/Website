import styles from "./pixel.module.css";
import { Nav } from "@/app/components/nav";
import { SideBar } from "@/app/components/side-bar";
import Image from "next/image";
import Link from "next/link";

export default function Pixel() {
  return (
    <div className="global">
      <Nav />
      <SideBar />

      <main className={styles.container}>
        {/* COLUNA ESQUERDA */}
        <aside className={styles.left}>
          <h1 className={styles.title}>
            Quer ser <span className={styles.titleAccent}>Nerdola?</span>
          </h1>

          <p className={styles.lead}>
            Se torne profissional com qualquer personagem aqui no VavaHelper.
            Aprenda as melhores jogadas, treine com conteúdo didático e jogue
            melhor.
          </p>

          <a href="/login" className={styles.cta} aria-label="Acesse aqui">
            Acesse aqui!
          </a>
        </aside>

        {/* CENTRO: palco dos cards */}
        <section className={styles.center}>
          <div className={styles.stage}>
            <div className={`${styles.card} ${styles.cardBack}`}>
              <Image
                src="/imgs/thumb_movi.jpg"
                alt="card 1"
                width={680}
                height={380}
                className={styles.cardImage}
                priority
              />
            </div>

            <div className={`${styles.card} ${styles.cardFront}`}>
              <Image
                src="/imgs/thumb_movi.jpg"
                alt="card 2"
                width={720}
                height={400}
                className={styles.cardImage}
                priority
              />
            </div>
          </div>
        </section>

        {/* DIREITA: personagem (em primeiro plano) */}
        <aside className={styles.right} aria-hidden="true">
          <Image
            src="/imgs/Brim_pixel.png"
            alt="Brimstone Pixel"
            width={1920}
            height={1920}
            className={styles.agentImage}
            priority
          />
        </aside>
      </main>
    </div>
  );
}
