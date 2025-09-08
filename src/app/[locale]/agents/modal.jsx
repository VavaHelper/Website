import React, { useEffect, useState } from "react";


export default function AgentModal({ name, isOpen, onClose, getAgentWithSkills }) {
  const [agentData, setAgentData] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    let mounted = true;

    setLoading(true);
    setError(null);
    setAgentData(null);
    setSkills([]);

    (async () => {
      try {
        const res = await getAgentWithSkills(name);
        // Espera-se o formato: { agent: {...}, skills: [...] }
        if (!mounted) return;
        setAgentData(res.agent ?? null);
        setSkills(res.skills ?? []);
      } catch (err) {
        if (!mounted) return;
        setError(err.message ?? "Erro ao carregar agente");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [isOpen, name, getAgentWithSkills]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" aria-modal="true" role="dialog">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-6xl rounded-2xl bg-[#0b0b0b] text-white shadow-2xl overflow-hidden">
        <button onClick={onClose} aria-label="Fechar" className="absolute right-4 top-4 z-20 rounded-full bg-white/5 p-2 hover:bg-white/10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="grid grid-cols-12 gap-6 p-8">
          {/* Left column */}
          <div className="col-span-7 flex flex-col gap-6 relative">
            <div className="flex items-start gap-6">
              <h1 className="text-6xl font-extrabold tracking-tight leading-none select-none">{agentData?.name ?? name}</h1>

              <div className="ml-auto flex flex-col items-center gap-3">
                <small className="text-xs text-white/70">{agentData ? agentData.function : ''}</small>
                <div className="rounded-full bg-white/5 px-3 py-1 text-sm">ULT {agentData?.ultPoints ?? '-'}</div>
              </div>
            </div>

            <p className="max-w-xl text-sm text-white/80">{agentData?.description ?? 'Descrição do agente.'}</p>

            {/* Preview / first skill */}
            <div className="w-full max-w-md rounded-lg bg-[#111] p-3">
              <div className="aspect-video w-full overflow-hidden rounded-md bg-black/20">
                {loading ? (
                  <div className="flex h-full w-full items-center justify-center">Carregando preview...</div>
                ) : error ? (
                  <div className="flex h-full w-full items-center justify-center">Erro ao carregar</div>
                ) : skills && skills.length > 0 ? (
                  <img alt="skill-thumb" src={skills[0].iconSkill} className="h-full w-full object-contain" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-white/60">Sem preview</div>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">{skills[0]?.name ?? 'Nome habilidade'}</h3>
                  <p className="text-xs text-white/60 truncate max-w-sm">{skills[0]?.description ?? 'Descrição curta da habilidade'}</p>
                </div>
                <button className="ml-4 rounded-md bg-white/5 px-4 py-2 text-sm hover:bg-white/10">Ver</button>
              </div>
            </div>

            {/* Lista de skills */}
            <div className="mt-2 grid grid-cols-2 gap-3">
              {loading ? (
                <div className="col-span-2 text-sm text-white/60">Carregando habilidades...</div>
              ) : skills.length > 0 ? (
                skills.map((s) => (
                  <div key={s.id} className="rounded-lg border border-white/6 p-3 bg-white/2 flex gap-3">
                    <img src={s.iconSkill} alt={s.name} className="h-10 w-10 flex-shrink-0 rounded" />
                    <div>
                      <h4 className="text-sm font-semibold">{s.name}</h4>
                      <p className="mt-1 text-xs text-white/70 max-h-14 overflow-auto">{s.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-sm text-white/60">Nenhuma habilidade encontrada.</div>
              )}
            </div>

            <div className="mt-auto flex items-center gap-3">
              <button className="rounded-full bg-white text-black px-5 py-2 font-semibold">Selecionar</button>
              <button onClick={onClose} className="rounded-full border border-white/10 px-4 py-2 text-sm">Cancelar</button>
            </div>
          </div>

          {/* Right column - imagem do agente */}
          <div className="col-span-5 relative flex items-center justify-center">
            <div className="absolute -right-10 top-6 w-80 h-80 rounded-full bg-white/6 blur-[24px]" />

            <div className="relative z-10 w-full max-w-xs">
              {agentData?.imgAgent ? (
                <img src={agentData.imgAgent} alt={`${agentData.name} portrait`} className="pointer-events-none w-full select-none object-contain" />
              ) : (
                <div className="flex h-96 w-full items-center justify-center rounded-lg bg-white/3">Imagem do agente</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Exemplo rápido do service wrapper (opcional):

export async function getAgentWithSkills(name) {
  const response = await fetch(`${API_URL}/agents/${name}/with-skills`);
  if (!response.ok) throw new Error(`Erro ao buscar habilidades do agente ${name}`);
  return response.json();
}

Exemplo de chamada no seu app:

import AgentModal from './components/AgentModal';
import { getAgentWithSkills } from '../services/agentService';

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Abrir modal Sova</button>
      <AgentModal name="Sova" isOpen={open} onClose={() => setOpen(false)} getAgentWithSkills={getAgentWithSkills} />
    </>
  );
}
*/
