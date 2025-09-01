'use client';

// File: app/skills/page.tsx (ou Skills.tsx)

import styles from './skills.module.css';
import { Nav } from '@/app/components/nav';
import { SideBar } from '@/app/components/side-bar';
import { useEffect, useState } from 'react';
import { getAllAgents } from '../../services/agentService';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

// OBS: Cuidado ao usar document.* no React — aqui mantive sua linha original.
if (typeof document !== 'undefined') {
  document.documentElement.style.overflowY = 'hidden';
}

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

  // Traduções do layout da página (title, labels, etc.)
  const t = useTranslations('Skills');
  // Namespace separado para nomes dos agentes
  const agentsT = useTranslations('agents');

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

  // Map local para comparar as funções (mantive seu roleMap)
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

  // Pegamos o objeto de nomes dos agents a partir das mensagens (agents.names)
  // Observação: next-intl t.raw pode retornar any — aqui fazemos um cast seguro.
  const names = agentsT.raw('names') as Record<string, string> | undefined;

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
            <p className="text-gray-400">{t('loading') || 'Carregando agentes...'}</p>
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

                  {/* Aqui usamos o arquivo de tradução 'agents' --> names[agent.id] */}
                  <h1 className={styles.boxTitle}>
                    {names?.[String(agent.id)] ?? agent.name}
                  </h1>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
