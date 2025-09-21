import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Mesmas expectativas de campo do JSON (skills/agentData) como antes.
 */
export default function AgentModal({
  name,
  isOpen,
  onClose,
  getAgentWithSkills,
  headerHeight = "72px",
  sidebarWidth = "80px",
  mobileBreakpoint = 768,
}) {
  const [agentData, setAgentData] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < mobileBreakpoint : false
  );

  const [selectedSkillIndex, setSelectedSkillIndex] = useState(0);

  // para evitar upscale da imagem do personagem
  const imgRef = useRef(null);
  const [naturalSize, setNaturalSize] = useState(null); // { w, h }

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    }
    if (typeof window !== "undefined") {
      window.addEventListener("resize", onResize);
      onResize();
    }
    return () => {
      if (typeof window !== "undefined")
        window.removeEventListener("resize", onResize);
    };
  }, [mobileBreakpoint]);

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
        if (!mounted) return;
        setAgentData(res.agent ?? null);
        setSkills(res.skills ?? []);
      } catch (err) {
        if (!mounted) return;
        setError(err?.message ?? "Erro ao carregar agente");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [isOpen, name, getAgentWithSkills]);

  // reset seleção quando skills mudam
  useEffect(() => {
    setSelectedSkillIndex(0);
  }, [skills]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
      if (["ArrowLeft", "ArrowRight"].includes(e.key) && skills.length) {
        setSelectedSkillIndex((idx) => {
          if (e.key === "ArrowLeft") return Math.max(0, idx - 1);
          return Math.min(skills.length - 1, idx + 1);
        });
      }
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, skills.length]);

  const containerStyle = {
    top: headerHeight,
    left: isMobile ? 0 : sidebarWidth,
    right: 0,
    bottom: 0,
  };

  const selectedSkill = skills[selectedSkillIndex];

  function handleImgError(e) {
    e.currentTarget.src =
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><rect width='100%' height='100%' fill='%23111111'/><text x='50%' y='50%' alignment-baseline='middle' text-anchor='middle' fill='%23fff' font-size='10'>no</text></svg>";
  }

  function onAgentImgLoad(e) {
    try {
      const img = e.currentTarget;
      if (img && img.naturalWidth && img.naturalHeight) {
        setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
      }
    } catch {
      // silent
    }
  }

  const desiredMaxAgentWidth = 520;
  const rightColMaxWidth =
    !isMobile && naturalSize && naturalSize.w
      ? `${Math.min(naturalSize.w, desiredMaxAgentWidth)}px`
      : undefined;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.15, ease: "easeOut" } }, // Reduzido
    exit: { opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.1, ease: "easeIn" } },    // Reduzido
  };

  const skillPreviewVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed z-50 flex items-start justify-center p-3"
          role="dialog"
          aria-modal="true"
          style={containerStyle}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-xs sm:max-w-sm md:max-w-6xl rounded-2xl bg-[#0b0b0b] text-white shadow-2xl overflow-hidden"
            style={{ maxHeight: "90vh", paddingBottom: isMobile ? 112 : undefined }}
          >
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-3 top-3 z-20 rounded-full bg-white/5 p-1 hover:bg-white/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-4 sm:p-6 overflow-y-auto" style={{ minHeight: 0 }}>
              {/* Left column */}
              <div className="col-span-1 md:col-span-7 flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold select-none">
                    {agentData?.name ?? name}
                  </h1>
                  <div className="ml-auto flex flex-col items-center gap-1">
                    <small className="text-[10px] text-white/70">{agentData?.function ?? ""}</small>
                    <div className="rounded-full bg-white/5 px-2 py-0.5 text-xs">ULT {agentData?.ultPoints ?? "-"}</div>
                  </div>
                </div>

                <p className="text-sm text-white/80">{agentData?.description}</p>

                {/* BARRA DE ÍCONES INLINE */}
                <div className="mt-2">
                  <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
                    {loading ? (
                      <div className="text-xs text-white/60">Carregando...</div>
                    ) : skills.length === 0 ? (
                      <div className="text-xs text-white/60">Nenhuma habilidade.</div>
                    ) : (
                      skills.map((s, i) => {
                        const active = i === selectedSkillIndex;
                        const key = s.id ?? s.name ?? i;
                        return (
                          // NOVO: motion.button para o efeito de hover
                          <motion.button
                            key={key}
                            onClick={() => setSelectedSkillIndex(i)}
                            aria-pressed={active}
                            aria-label={`Selecionar ${s.name}`}
                            className={`flex-shrink-0 w-12 h-12 rounded-full grid place-items-center transition-transform ${ // Removido pl-3 pr-2 py-2
                              active ? "scale-110 bg-white/10 ring-2 ring-white/20" : "bg-white/6 hover:bg-white/10"
                            }`}
                            title={s.name}
                            // NOVO: Propriedades de animação para o hover
                            whileHover={{ y: -5 }} // Move 5px para cima
                            whileTap={{ scale: 0.95 }} // Pequeno clique
                            transition={{ type: "spring", stiffness: 300, damping: 20 }} // Transição suave
                          >
                            <img
                              src={s.iconSkill ?? ""}
                              alt={s.name}
                              className="w-8 h-8 object-contain" // NOVO: Ajustado para w-8 h-8 e object-contain
                              onError={handleImgError}
                              decoding="async"
                            />
                          </motion.button>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* PREVIEW GRANDE */}
                <div className="mt-3 rounded-lg bg-[#111] p-3">
                  <div className="w-full aspect-video rounded-md bg-black/20 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      {loading ? (
                        <div className="text-xs">Carregando preview...</div>
                      ) : error ? (
                        <div className="text-xs">Erro ao carregar</div>
                      ) : selectedSkill ? (
                        <motion.div
                          key={selectedSkillIndex}
                          variants={skillPreviewVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          transition={{ duration: 0.2 }}
                          className="w-full h-full"
                        >
                          {selectedSkill.gifSkill || selectedSkill.previewGif ? (
                            <svg
                              viewBox="0 0 16 9"
                              preserveAspectRatio="xMidYMid meet"
                              className="w-full h-full"
                              xmlns="http://www.w3.org/2000/svg"
                              role="img"
                              aria-label={selectedSkill.name}
                            >
                              <image
                                href={selectedSkill.gifSkill ?? selectedSkill.previewGif}
                                x="0" y="0" width="100%" height="100%"
                                preserveAspectRatio="xMidYMid slice"
                              />
                            </svg>
                          ) : selectedSkill.previewVideo ? (
                            <video className="h-full w-full object-contain" autoPlay loop muted playsInline>
                              <source src={selectedSkill.previewVideo} />
                            </video>
                          ) : selectedSkill.iconSkill ? (
                            <img
                              src={selectedSkill.iconSkill}
                              alt={selectedSkill.name}
                              className="h-full w-full object-contain"
                              onError={handleImgError}
                              decoding="async"
                            />
                          ) : (
                            <div className="text-sm text-white/60">Sem preview</div>
                          )}
                        </motion.div>
                      ) : (
                        <div className="text-sm text-white/60">Sem preview</div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold truncate">{selectedSkill?.name ?? "Nome habilidade"}</h3>
                      <p className="text-[11px] text-white/60 truncate">{selectedSkill?.description ?? "Descrição curta."}</p>
                    </div>
                    <button className="ml-2 rounded-md bg-white/5 px-3 py-1 text-xs hover:bg-white/10">Ver</button>
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <button className="rounded-full bg-white text-black px-5 py-2 font-semibold">Selecionar</button>
                  <button onClick={onClose} className="rounded-full border border-white/10 px-4 py-2 text-sm">Cancelar</button>
                </div>
              </div>

              {/* Right column (PERSONAGEM) */}
              <div
                className="hidden md:col-span-5 md:flex md:items-center md:justify-center"
                style={{ maxWidth: rightColMaxWidth }}
              >
                <motion.div
                  className="relative z-10 w-full flex justify-center"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {agentData?.imgAgent ? (
                    agentData.imgAgentVideo ? (
                      <video className="w-full object-contain" autoPlay loop muted playsInline>
                        <source src={agentData.imgAgentVideo} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        ref={imgRef}
                        src={agentData.imgAgent}
                        srcSet={
                          agentData.imgAgent2x
                            ? `${agentData.imgAgent} 1x, ${agentData.imgAgent2x} 2x`
                            : undefined
                        }
                        alt={`${agentData.name} portrait`}
                        className="pointer-events-none w-full select-none object-contain"
                        onLoad={onAgentImgLoad}
                        onError={handleImgError}
                        decoding="async"
                      />
                    )
                  ) : (
                    <div className="flex h-96 w-full items-center justify-center rounded-lg bg-white/3">Imagem do agente</div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}