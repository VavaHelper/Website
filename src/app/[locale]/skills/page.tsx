'use client';

import styles from './skills.module.css';
import { Nav } from '@/app/components/nav';
import { SideBar } from '@/app/components/side-bar';
import { useEffect, useState } from 'react';
import { getAllAgents } from '../../services/agentService';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface Agent {
  id: number;
  name: string;
  imgAgent: string;
  function: string;
  description: string;
  ultPoints: number;
  iconAgent: string;
}

export default function Skills() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedFunction, setSelectedFunction] = useState<string>('all');

  const t = useTranslations('Skills');

  useEffect(() => {
    async function fetchAgents() {
      try {
        const result = await getAllAgents();
        setAgents(result);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error(e.message);
        }
      }
    }

    fetchAgents();
  }, []);

  const roleMap: { [key: string]: string } = {
    duelists: 'Duelista',
    initiators: 'Iniciador',
    controllers: 'Controlador',
    sentinels: 'Sentinela',
  };

  const filteredAgents =
    selectedFunction === 'all'
      ? agents
      : agents.filter((agent) => agent.function === roleMap[selectedFunction]);

  const roles = [
    { key: 'all', label: t('all') },
    { key: 'duelists', label: t('duelists') },
    { key: 'initiators', label: t('initiators') },
    { key: 'controllers', label: t('controllers') },
    { key: 'sentinels', label: t('sentinels') },
  ];

  return (
    <div className={styles.global}>
      <Nav />
      <SideBar />
      <div className={styles.containersearch}>
        <h1 className="text-[#FF5252]">
          <span className={styles.title}>{t('title')}</span>
        </h1>

        <span className={styles.line}></span>

        <p className={`py-4 ${styles.description}`}>{t('description')}</p>

        <div className={styles.filter}>
          {roles.map((role) => (
            <button
              key={role.key}
              onClick={() => setSelectedFunction(role.key)}
              className={`${styles.button} ${
                selectedFunction === role.key ? styles.buttonActive : ''
              }`}
            >
              {role.label}
            </button>
          ))}
        </div>

        <div className={styles.boxGrid}>
          {agents.length === 0 ? (
            <p className="text-gray-400">Carregando agentes...</p>
          ) : (
            filteredAgents.map((agent) => (
              <div key={agent.id}>
                <div className={styles.card}>
                  <div className={styles.box}>
                    {agent.imgAgent?.trim() ? (
                      <Image
                        src={agent.imgAgent}
                        alt={agent.name}
                        width={200}
                        height={200}
                        className="rounded-[10px] object-cover object-center"
                      />
                    ) : (
                      <div className="text-gray-500 text-center">{t('placeholder')}</div>
                    )}
                  </div>
                  <h1 className={styles.boxTitle}>{agent.name}</h1>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
