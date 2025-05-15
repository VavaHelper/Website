"use client";

import { Nav } from '../components/nav';
import { SideBar } from '../components/side-bar';
import { CardProps, Card } from './components/card';
import { useEffect, useState } from 'react';

const cards: CardProps[] = [
  { title: 'Agents', imagePath: 'https://placehold.co/600x400', informationText: 'Sejam Bem Vindos ao VavaHelper!' },
  { title: 'Pixel', imagePath: '/imgs/molotov-lineup.png', informationText: 'Sejam Bem Vindos ao VavaHelper!' },
  {
    title: 'Movi',
    imagePath: '/imgs/movi.gif',
    informationText: (
      <>
        Aqui você irá aprender tudo sobre como executar a movimentação perfeita de Valorant com cada agente, seja para jogar sozinho ou em equipe. Aprenderá também a realizar o famoso <span className="text-[#FF5252]">"</span>AD<span className="text-[#FF5252]">"</span> em seus adversários!
      </>
    ),
  },
];

export default function Home() {
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsNarrow(window.innerWidth <= 1365);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
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
            {cards.map(card => (
              <Card key={card.title} {...card} disableAnim={isNarrow} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
