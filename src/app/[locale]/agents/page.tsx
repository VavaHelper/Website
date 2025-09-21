'use client';

import styles from './skills.module.css';
import { Nav } from '@/app/components/nav';
import { SideBar } from '@/app/components/side-bar';
import { useEffect, useState } from 'react';
import { getAllAgents } from '../../services/agentService';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import AgentModal from './modal'; 
import { getAgentWithSkills } from '../../services/agentService';

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

  // Modal control
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAgentName, setModalAgentName] = useState<string | null>(null);
  const [pageOverflowBackup, setPageOverflowBackup] = useState<string | null>(null);

  const t = useTranslations('Skills');
  const agentsT = useTranslations('agents');

  useEffect(() => {
    async function fetchAgents() {
      try {
        const result = await getAllAgents();
        setAgents(result);
      } catch (e: unknown) {
        if (e instanceof Error) console.error(e.message);
      }
    }
    fetchAgents();
  }, []);

  // controlar overflow apenas quando modal abrir
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (modalOpen) {
      // salvar estado anterior e esconder scroll vertical
      setPageOverflowBackup(document.documentElement.style.overflowY || '');
      document.documentElement.style.overflowY = 'hidden';
    } else {
      // restaurar
      document.documentElement.style.overflowY = pageOverflowBackup ?? '';
      setPageOverflowBackup(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);

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

  const names = agentsT.raw('names') as Record<string, string> | undefined;

  // abrir modal passando o nome do agent (como sua API espera)
  function openAgentModal(agentName: string) {
    setModalAgentName(agentName);
    setModalOpen(true);
  }

  function closeAgentModal() {
    setModalOpen(false);
    setModalAgentName(null);
  }

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
                <div
                  className={styles.card}
                  // abrindo modal ao clicar no card (pode trocar para um botão específico se preferir)
                  onClick={() => openAgentModal(agent.name)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openAgentModal(agent.name)}
                >
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

                  <h1 className={styles.boxTitle}>
                    {names?.[String(agent.id)] ?? agent.name}
                  </h1>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* AgentModal: passe o nome e o service getAgentWithSkills */}
      <AgentModal
        name={modalAgentName ?? undefined}
        isOpen={modalOpen}
        onClose={closeAgentModal}
        getAgentWithSkills={getAgentWithSkills}
        headerHeight="72px"
        sidebarWidth="120px"
      />
    </div>
  );
}
