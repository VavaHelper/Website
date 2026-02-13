"use client";

import { useEffect, useMemo, useState } from 'react';
import { Nav } from '@/app/components/nav';
import { SideBar } from '@/app/components/side-bar';
import { Card, CardProps } from './components/card';
import styles from './home.module.css';
import { Footer } from '@/app/components/footer';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Home() {
  const t = useTranslations('home');

  const [cards, setCards] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(true);

  const mappedCards = useMemo<CardProps[]>(
    () => [
      {
        title: 'Agents',
        imagePath: '/imgs/agents.gif',
        informationText: t('agentsTitle'),
        href: '/agents',
      },
      {
        title: 'Movi',
        imagePath: '/imgs/movi.gif',
        informationText: `${t('moviTitle1')} ${t('moviTitle2')} AD AD ${t('moviTitle3')}`,
        href: '/movi',
      },
      {
        title: 'Pixel',
        imagePath: '/imgs/molotov-lineup.png',
        informationText: `${t('pixelsTitle1')} ${t('pixelsTitle2')}`,
        href: '/pixel',
      },
    ],
    [t]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setCards(mappedCards);
      setLoading(false);
    }, 650);
    return () => clearTimeout(timer);
  }, [mappedCards]);

  return (
    <main>
      <Nav />
      <div className="page-content with-sidebar">
        <SideBar />

        <section className={styles.hero}>
          <div>
            <p className={styles.kicker}>Guia completo de Valorant</p>
            <h1 className={styles.title}>Aprenda, aplique e evolua sua gameplay.</h1>
          </div>
          <Link className={styles.cta} href="/community">Ir para a Community</Link>
        </section>

        <section className={styles.gridSection}>
          {(loading ? Array(3).fill({}) : cards).map((card, idx) => (
            <Card
              key={card.title ?? idx}
              title={card.title ?? '...'}
              imagePath={card.imagePath ?? '/imgs/background.png'}
              placeholderPath="/imgs/background.png"
              informationText={card.informationText}
              loading={loading}
              href={card.href ?? '/community'}
            />
          ))}
        </section>

        <section className={styles.adSlot} aria-label="Anúncio">
          <span>Espaço de anúncio estratégico (728x90) — sem bloquear conteúdo.</span>
        </section>
      </div>

      <Footer />
    </main>
  );
}
