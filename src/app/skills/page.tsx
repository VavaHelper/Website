// TODO: Igão e Matheus -> Iniciar tela de Skills

'use client'

import styles from './skills.module.css'
import { Nav } from '@components/nav';
import { SideBar } from '@components/side-bar';
import { useEffect, useState } from 'react';
import { getAllAgents } from '../services/agentService';
import Image from 'next/image';

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
  const [selectedFunction, setSelectedFunction] = useState<string>('All');

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

  const filteredAgents = selectedFunction === 'All'
    ? agents
    : agents.filter(agent => {
        const map = {
          Duelists: 'Duelista',
          Initiators: 'Iniciador',
          Controllers: 'Controlador',
          Sentinels: 'Sentinela',
        };
        return agent.function === map[selectedFunction as keyof typeof map];
      });

    return (
        <div className={styles.global}>
            <Nav/>
            <SideBar/>
            <div className={styles.containersearch}>
                <h1 className='text-[#FF5252]'>
                    <span className={styles.title}> Agents </span>
                </h1>

                <span className= {styles.line}></span>
                
                <p className={`py-4 ${styles.description}`}>
                    Explore agent abilities, lineups and strategies
                </p>

                <div className={styles.filter}>
                  
                  {['All', 'Duelists', 'Initiators', 'Controllers', 'Sentinels'].map((role) => (
                    <button
                      key={role}
                      onClick={() => setSelectedFunction(role)}
                      className={`${styles.button} ${
                        selectedFunction === role ? styles.buttonActive : ''
                      }`}

                    >
                      {role}
                    </button>
                  ))}
                </div>

                {/* aqui: wrapper de grid */}
                <div className={styles.boxGrid}>
                   {filteredAgents.map((agent) => (
                      <div key={agent.id}>
                        <div className={styles.card}>
                            <div className={styles.box}>
                              {agent.imgAgent && agent.imgAgent.trim() !== '' ? (
                                <Image
                                  src={agent.imgAgent}
                                  alt={agent.name}
                                  width={200}
                                  height={200}
                                  className="rounded-[10px] object-cover object-center"
                                />
                              ) : (
                                <div className="text-gray-500 text-center">Sem imagem</div>
                              )}
                            </div>
                            <h1 className={styles.boxTitle}>{agent.name}</h1>
                        </div>
                      </div>
                  ))}
                </div>
                
            </div>
        </div>
    );
}
