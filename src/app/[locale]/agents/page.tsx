'use client';

import styles from './skills.module.css';
import { Nav } from '@/app/components/nav';
import { SideBar } from '@/app/components/side-bar';
import { useEffect, useMemo, useState } from 'react';
import { getAllAgents, getAgentWithSkills } from '../../services/agentService';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import AgentModal from './modal';

interface Agent {
  id: number;
  name: string;
  imgAgent: string;
  function: string;
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedFunction, setSelectedFunction] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAgentName, setModalAgentName] = useState<string | null>(null);

  const t = useTranslations('Skills');
  const agentsT = useTranslations('agents');

  useEffect(() => {
    async function fetchAgents() {
      try {
        const result = await getAllAgents();
        setAgents(result || []);
      } catch (e: unknown) {
        if (e instanceof Error) console.error(e.message);
      }
    }
    fetchAgents();
  }, []);

  const roleMap: Record<string, string> = {
    duelists: 'Duelista',
    initiators: 'Iniciador',
    controllers: 'Controlador',
    sentinels: 'Sentinela',
  };

  const filteredAgents = useMemo(() => {
    if (selectedFunction === 'all') return agents;
    return agents.filter((agent) => agent.function === roleMap[selectedFunction]);
  }, [agents, selectedFunction]);

  const roles = [
    { key: 'all', label: t('all') },
    { key: 'duelists', label: t('duelists') },
    { key: 'initiators', label: t('initiators') },
    { key: 'controllers', label: t('controllers') },
    { key: 'sentinels', label: t('sentinels') },
  ];

  const names = agentsT.raw('names') as Record<string, string> | undefined;

  function openAgentModal(agentName: string) {
    setModalAgentName(agentName);
    setModalOpen(true);
  }

  function closeAgentModal() {
    setModalOpen(false);
    setModalAgentName(null);
  }

  return (
    <main>
      <Nav />
      <div className="page-content with-sidebar">
        <SideBar />

        <section className={styles.headerCard}>
          <h1>{t('title')}</h1>
          <p>{t('description')}</p>
        </section>

        <section className={styles.filterRow}>
          {roles.map((role) => (
            <button
              key={role.key}
              onClick={() => setSelectedFunction(role.key)}
              className={`${styles.filterBtn} ${selectedFunction === role.key ? styles.filterBtnActive : ''}`}
            >
              {role.label}
            </button>
          ))}
        </section>

        <section className={styles.grid}>
          {agents.length === 0 ? (
            <p className={styles.loading}>Carregando agentes...</p>
          ) : (
            filteredAgents.map((agent) => (
              <article
                key={agent.id}
                className={styles.card}
                onClick={() => openAgentModal(agent.name)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openAgentModal(agent.name)}
              >
                <div className={styles.imgWrap}>
                  {agent.imgAgent?.trim() ? (
                    <Image
                      src={agent.imgAgent}
                      alt={agent.name}
                      width={480}
                      height={320}
                      className={styles.cardImg}
                    />
                  ) : (
                    <div className={styles.emptyState}>Sem imagem</div>
                  )}
                </div>

                <div className={styles.cardBody}>
                  <h2>{names?.[String(agent.id)] ?? agent.name}</h2>
                  <span>{agent.function}</span>
                </div>
              </article>
            ))
          )}
        </section>

        <section className={styles.adSlot} aria-label="Anúncio">
          <span>Slot de anúncio lateral (300x250) para monetização sem interrupção da leitura.</span>
        </section>
      </div>

      <AgentModal
        name={modalAgentName ?? undefined}
        isOpen={modalOpen}
        onClose={closeAgentModal}
        getAgentWithSkills={getAgentWithSkills}
        headerHeight="72px"
        sidebarWidth="90px"
      />
    </main>
  );
}
