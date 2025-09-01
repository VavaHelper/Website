"use client";

import { useEffect, useLayoutEffect, useState } from 'react';
import { Nav } from '@/app/components/nav';
import { SideBar } from '@/app/components/side-bar';
import { Card, CardProps } from './components/card';
import styles from './home.module.css';
import { Footer } from '@/app/components/footer';
import { useTranslations } from 'next-intl';



// Função utilitária para checar largura
const getIsNarrow = () =>
  typeof window !== 'undefined' && window.innerWidth <= 1320;

export default function Home() {

    const t = useTranslations('home')
    useEffect(() => {
    // Isso roda só no cliente, então document existe
    document.documentElement.style.overflowY = 'visible';

    // Opcional: limpar o estilo quando o componente desmontar
    return () => {
      document.documentElement.style.overflowY = '';
    };
  }, []);
  const [cards, setCards] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNarrow, setIsNarrow] = useState<boolean>(false);
  

  // Usa layout effect para já definir antes do paint
  useLayoutEffect(() => {
    const checkWidth = () => setIsNarrow(getIsNarrow());
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // Simula fetch de API
  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      setCards([
        {
          title: 'Agents',
          imagePath: '/imgs/agents.gif',
          informationText: <>{t('agentsTitle')}</>,
          href: '/agents',
        },
        {
          title: 'Movi',
          imagePath: '/imgs/movi.gif',
          informationText: (
            <>
              {t('moviTitle1')}<br />
              {t('moviTitle2')} <span className="text-[#FF5252]"></span>AD<span className="text-[#FF5252]"></span> {t('moviTitle3')}
            </>
          ),
          href: '/movi',
        },
        {
          title: 'Pixel',
          imagePath: '/imgs/molotov-lineup.png',
          informationText: (
            <>
              {t("pixelsTitle1")}<br />
              {t("pixelsTitle2")}
            </>
          ),
          href: '/pixel',
        },
      ]);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col">
      <Nav />
      <div className="flex flex-1">
        <SideBar />
          <div className="flex-1 flex flex-col justify-center items-center p-4">
            <div
              className={
                isNarrow
                  ? 'flex flex-col items-center gap-8 mt-18'
                  : 'flex flex-wrap justify-center gap-6 mt-18'
              }
            >
            
              {(loading ? Array(3).fill({}) : cards).map((card, idx) => (
                <Card
                  key={card.title ?? idx}
                  title={card.title ?? '...'}
                  imagePath={card.imagePath ?? 'background'}
                  placeholderPath="/imgs/background.png"
                  informationText={card.informationText}
                  loading={loading}
                  disableAnim={isNarrow}
                  href={card.href ?? ""}
                />
              ))}
          </div>
        </div>
      </div>
      <Footer/>
    </main>
  );
}
