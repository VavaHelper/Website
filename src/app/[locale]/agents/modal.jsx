import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  const imgRef = useRef(null);
  const [naturalSize, setNaturalSize] = useState(null);

  // =======================
  // Responsividade
  // =======================
  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", onResize);
      onResize();
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", onResize);
      }
    };
  }, [mobileBreakpoint]);

  // =======================
  // Lock scroll body quando modal abre
  // =======================
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  // =======================
  // Carrega dados do agente
  // =======================
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

        setAgentData(res?.agent ?? null);
        setSkills(Array.isArray(res?.skills) ? res.skills : []);
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

  useEffect(() => {
    setSelectedSkillIndex(0);
  }, [skills]);

  // =======================
  // Teclado (esc + setas)
  // =======================
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();

      if (skills.length && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        setSelectedSkillIndex((idx) => {
          if (e.key === "ArrowLeft") return Math.max(0, idx - 1);
          return Math.min(skills.length - 1, idx + 1);
        });
      }
    }

    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, skills.length]);

  // =======================
  // Layout offset para header/sidebar
  // =======================
  const containerStyle = useMemo(
    () => ({
      top: headerHeight,
      left: isMobile ? 0 : sidebarWidth,
      right: 0,
      bottom: 0,
    }),
    [headerHeight, isMobile, sidebarWidth]
  );

  const selectedSkill = skills[selectedSkillIndex];

  function handleImgError(e) {
    e.currentTarget.src =
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'><rect width='100%' height='100%' fill='%230d1117'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23fff' font-size='12'>sem imagem</text></svg>";
  }

  function onAgentImgLoad(e) {
    const img = e.currentTarget;
    if (img?.naturalWidth && img?.naturalHeight) {
      setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
    }
  }

  const desiredMaxAgentWidth = 520;
  const rightColMaxWidth =
    !isMobile && naturalSize?.w
      ? `${Math.min(naturalSize.w, desiredMaxAgentWidth)}px`
      : undefined;

  const modalVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.18, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: 8,
      scale: 0.98,
      transition: { duration: 0.12, ease: "easeIn" },
    },
  };

  const skillPreviewVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.18 } },
    exit: { opacity: 0, transition: { duration: 0.1 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed z-[80] flex items-start justify-center p-3 sm:p-4"
          style={containerStyle}
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Fechar modal"
            className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-[3px]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />

          {/* Modal */}
          <motion.section
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              relative z-10 w-full max-w-[1120px]
              rounded-2xl border border-white/10
              bg-gradient-to-b from-[#0b0f18] to-[#090d14]
              text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)]
              overflow-hidden
            "
            style={{
              maxHeight: "calc(100dvh - 110px)",
            }}
          >
            {/* Top glow/border accent */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent" />

            {/* close */}
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="
                absolute right-3 top-3 z-20
                grid h-8 w-8 place-items-center rounded-full
                border border-white/10 bg-white/5 text-white/80
                hover:bg-white/10 hover:text-white transition
              "
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Conteúdo com scroll interno */}
            <div
              className="
                grid grid-cols-1 md:grid-cols-12 gap-5
                p-4 sm:p-6
                overflow-y-auto
              "
              style={{ maxHeight: "calc(100dvh - 110px)" }}
            >
              {/* LEFT */}
              <div className="col-span-1 md:col-span-7 flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-none tracking-tight">
                    {agentData?.name ?? name}
                  </h1>

                  <div className="ml-auto flex flex-col items-end gap-1">
                    <small className="text-[11px] text-white/65">
                      {agentData?.function ?? ""}
                    </small>
                    <div className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px]">
                      ULT {agentData?.ultPoints ?? "-"}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-white/75 leading-relaxed">
                  {agentData?.description || "Sem descrição disponível para este agente."}
                </p>

                {/* skill pills */}
                <div>
                  <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
                    {loading ? (
                      <div className="text-xs text-white/60">Carregando habilidades...</div>
                    ) : skills.length === 0 ? (
                      <div className="text-xs text-white/60">Nenhuma habilidade.</div>
                    ) : (
                      skills.map((s, i) => {
                        const active = i === selectedSkillIndex;
                        const key = s.id ?? s.name ?? i;

                        return (
                          <motion.button
                            key={key}
                            onClick={() => setSelectedSkillIndex(i)}
                            aria-pressed={active}
                            aria-label={`Selecionar ${s.name}`}
                            title={s.name}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 280, damping: 22 }}
                            className={`
                              flex-shrink-0 grid place-items-center
                              w-11 h-11 rounded-full
                              border transition
                              ${
                                active
                                  ? "bg-red-500/20 border-red-400/40 ring-1 ring-red-300/30"
                                  : "bg-white/5 border-white/10 hover:bg-white/10"
                              }
                            `}
                          >
                            <img
                              src={s.iconSkill ?? ""}
                              alt={s.name ?? "Skill"}
                              className="w-7 h-7 object-contain"
                              onError={handleImgError}
                              decoding="async"
                            />
                          </motion.button>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Preview */}
                <div className="rounded-xl border border-white/10 bg-[#0f1420] p-3">
                  <div className="w-full aspect-video rounded-lg bg-black/25 border border-white/5 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      {loading ? (
                        <motion.div
                          key="loading"
                          variants={skillPreviewVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="text-xs text-white/70"
                        >
                          Carregando preview...
                        </motion.div>
                      ) : error ? (
                        <motion.div
                          key="error"
                          variants={skillPreviewVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="text-xs text-red-300"
                        >
                          Erro ao carregar
                        </motion.div>
                      ) : selectedSkill ? (
                        <motion.div
                          key={selectedSkillIndex}
                          variants={skillPreviewVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="w-full h-full"
                        >
                          {selectedSkill.gifSkill || selectedSkill.previewGif ? (
                            <img
                              src={selectedSkill.gifSkill ?? selectedSkill.previewGif}
                              alt={selectedSkill.name ?? "Preview skill"}
                              className="h-full w-full object-cover"
                              onError={handleImgError}
                              decoding="async"
                            />
                          ) : selectedSkill.previewVideo ? (
                            <video className="h-full w-full object-contain" autoPlay loop muted playsInline>
                              <source src={selectedSkill.previewVideo} />
                            </video>
                          ) : selectedSkill.iconSkill ? (
                            <img
                              src={selectedSkill.iconSkill}
                              alt={selectedSkill.name ?? "Skill"}
                              className="h-full w-full object-contain"
                              onError={handleImgError}
                              decoding="async"
                            />
                          ) : (
                            <div className="text-sm text-white/60">Sem preview</div>
                          )}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="empty"
                          variants={skillPreviewVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="text-sm text-white/60"
                        >
                          Sem preview
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold truncate">
                        {selectedSkill?.name ?? "Nome da habilidade"}
                      </h3>
                      <p className="text-[11px] text-white/65 truncate">
                        {selectedSkill?.description ?? "Descrição curta da habilidade."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-1 flex flex-wrap gap-2">
                  <button
                    className="
                      rounded-full px-5 py-2 text-sm font-semibold
                      bg-gradient-to-r from-red-500 to-red-400 text-white
                      shadow-[0_0_18px_rgba(239,68,68,0.35)]
                      hover:brightness-110 transition
                    "
                  >
                    Selecionar
                  </button>

                  <button
                    onClick={onClose}
                    className="
                      rounded-full px-4 py-2 text-sm
                      border border-white/15 bg-white/5
                      hover:bg-white/10 transition
                    "
                  >
                    Cancelar
                  </button>
                </div>
              </div>

              {/* RIGHT */}
              <div
                className="hidden md:col-span-5 md:flex md:items-center md:justify-center"
                style={{ maxWidth: rightColMaxWidth }}
              >
                <motion.div
                  className="relative z-10 w-full flex justify-center"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut", delay: 0.03 }}
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
                        alt={`${agentData?.name ?? name} portrait`}
                        className="pointer-events-none w-full select-none object-contain"
                        onLoad={onAgentImgLoad}
                        onError={handleImgError}
                        decoding="async"
                      />
                    )
                  ) : (
                    <div className="flex h-96 w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60">
                      Imagem do agente
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.section>
        </div>
      )}
    </AnimatePresence>
  );
}
