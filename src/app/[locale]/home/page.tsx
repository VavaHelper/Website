"use client";

import { useLayoutEffect, useState } from 'react';
import { Nav } from '@/app/components/nav';
import { SideBar } from '@/app/components/side-bar';
import { Card, CardProps } from './components/card';
import styles from './home.module.css';

// Função utilitária para checar largura
const getIsNarrow = () =>
  typeof window !== 'undefined' && window.innerWidth <= 1320;

export default function Home() {
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
          informationText: <>Aqui você será capaz de aprender detalhadamente sobre todos os agentes!</>,
          href: '/skills',
        },
        {
          title: 'Pixel',
          imagePath: '/imgs/molotov-lineup.png',
          informationText: (
            <>
              Aqui você se tornará pró player do personagem de sua preferência!<br />
              Esteja preparado para aprender os melhores pixels para sua gameplay!
            </>
          ),
          href: '/pixel',
        },
        {
          title: 'Movi',
          imagePath: '/imgs/movi.gif',
          informationText: (
            <>
              Aqui você irá aprender tudo sobre como executar a movimentação perfeita com cada agente, seja para jogar sozinho ou em equipe.<br />
              Aprenderá também a realizar o famoso <span className="text-[#FF5252]"></span>AD<span className="text-[#FF5252]"></span> em seus adversários!
            </>
          ),
          href: '/movi',
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
                  ? 'flex flex-col items-center gap-8'
                  : 'flex flex-wrap justify-center gap-6'
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
    </main>
  );
}
