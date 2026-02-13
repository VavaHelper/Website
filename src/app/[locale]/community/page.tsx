'use client';

import { Fragment, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Nav } from '@/app/components/nav';
import styles from './community.module.css';
import { language } from '../../../../constants/language';
import { SideBar } from '@/app/components/side-bar';

interface Video {
  id: number;
  title: string;
  url: string;
  description?: string;
  category?: string;
  agent?: string;
  map?: string;
  youtubeId?: string;
}

type ApiMediaItem = {
  id?: number;
  title?: string;
  url?: string;
  videoUrl?: string;
  description?: string;
  descricao?: string;
  agent?: string;
  agentName?: string;
  map?: string;
  mapName?: string;
  category?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_MEDIA_API;
const AD_POSITIONS = new Set([4, 11]);

function slugToLabel(value?: string) {
  if (!value) return '';
  return value
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function toSlug(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function getYoutubeId(url?: string): string | null {
  if (!url) return null;

  const patterns = [
    /[?&]v=([^&]+)/,                    // watch?v=
    /youtube\.com\/embed\/([^?&/]+)/,   // embed/
    /youtu\.be\/([^?&/]+)/,             // youtu.be/
    /youtube\.com\/shorts\/([^?&/]+)/,  // shorts/
  ];

  for (const regex of patterns) {
    const match = url.match(regex);
    if (match?.[1]) return match[1];
  }

  return null;
}

function getYoutubeThumb(url?: string) {
  const id = getYoutubeId(url);
  return id
    ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    : '/imgs/background.png';
}

function normalizeMediaItem(item: ApiMediaItem, idx: number): Video {
  const rawUrl = item.videoUrl || item.url || '';
  const rawDescription = item.description || item.descricao || '';
  const rawAgent = item.agentName || item.agent || '';
  const rawMap = item.mapName || item.map || '';
  const youtubeId = getYoutubeId(rawUrl) || undefined;

  return {
    id: typeof item.id === 'number' ? item.id : idx + 1,
    title:
      item.title ||
      rawDescription ||
      (rawAgent && rawMap ? `${rawAgent} • ${rawMap}` : 'Vídeo da comunidade'),
    url: rawUrl,
    description: rawDescription,
    category: item.category,
    agent: rawAgent,
    map: rawMap,
    youtubeId,
  };
}

function normalizeListResponse(data: unknown): Video[] {
  if (!Array.isArray(data)) return [];
  return data.map((item, idx) => normalizeMediaItem((item || {}) as ApiMediaItem, idx));
}

function normalizeFilterList(data: unknown, kind: 'agent' | 'map'): string[] {
  if (!Array.isArray(data)) return [];

  const values = data
    .map((item) => {
      if (typeof item === 'string') return item;

      if (item && typeof item === 'object') {
        const obj = item as Record<string, unknown>;

        const direct =
          (obj.name as string) ||
          (obj.slug as string) ||
          (obj.value as string);

        if (direct) return direct;

        if (kind === 'agent') {
          return (
            (obj.agentName as string) ||
            (obj.agent as string) ||
            ''
          );
        }

        return (
          (obj.mapName as string) ||
          (obj.map as string) ||
          ''
        );
      }

      return '';
    })
    .map((v) => String(v).trim())
    .filter(Boolean);

  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function deriveFiltersFromVideos(list: Video[]) {
  const agents = Array.from(
    new Set(list.map((v) => (v.agent || '').trim()).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));

  const maps = Array.from(
    new Set(list.map((v) => (v.map || '').trim()).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));

  return { agents, maps };
}

export default function CommunityPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [agents, setAgents] = useState<string[]>([]);
  const [maps, setMaps] = useState<string[]>([]);

  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [selectedMap, setSelectedMap] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [paywallOpen, setPaywallOpen] = useState(false);
  const [pendingYoutubeId, setPendingYoutubeId] = useState<string | null>(null);
  const [adLoading, setAdLoading] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLocale = useMemo(() => {
    const first = pathname?.split('/').filter(Boolean)[0];
    return language.includes(first) ? first : 'pt';
  }, [pathname]);

  const withLocale = (path: string) => {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `/${currentLocale}${normalizedPath}`;
  };

  const activeFilterType = useMemo<'all' | 'agents' | 'maps'>(() => {
    if (selectedAgent) return 'agents';
    if (selectedMap) return 'maps';
    return 'all';
  }, [selectedAgent, selectedMap]);

  useEffect(() => {
    const agentParam = searchParams.get('agent');
    const mapParam = searchParams.get('map');

    if (agentParam) {
      setSelectedAgent(slugToLabel(agentParam));
      setSelectedMap('');
    } else if (mapParam) {
      setSelectedMap(slugToLabel(mapParam));
      setSelectedAgent('');
    } else {
      setSelectedAgent('');
      setSelectedMap('');
    }
  }, [searchParams]);

  useEffect(() => {
    async function fetchFilters() {
      if (!API_BASE) {
        setError('Defina NEXT_PUBLIC_API_URL (ou NEXT_PUBLIC_MEDIA_API) no .env.local');
        return;
      }

      try {
        const [agentsRes, mapsRes] = await Promise.allSettled([
          fetch(`${API_BASE}/media/agents`),
          fetch(`${API_BASE}/media/maps`),
        ]);

        let agentsList: string[] = [];
        let mapsList: string[] = [];

        if (agentsRes.status === 'fulfilled' && agentsRes.value.ok) {
          const agentsData = await agentsRes.value.json();
          agentsList = normalizeFilterList(agentsData, 'agent');
        }

        if (mapsRes.status === 'fulfilled' && mapsRes.value.ok) {
          const mapsData = await mapsRes.value.json();
          mapsList = normalizeFilterList(mapsData, 'map');
        }

        // fallback: se vier vazio, deriva de /media
        if (agentsList.length === 0 || mapsList.length === 0) {
          const mediaRes = await fetch(`${API_BASE}/media`);
          if (mediaRes.ok) {
            const mediaData = await mediaRes.json();
            const normalizedVideos = normalizeListResponse(mediaData);
            const derived = deriveFiltersFromVideos(normalizedVideos);

            if (agentsList.length === 0) agentsList = derived.agents;
            if (mapsList.length === 0) mapsList = derived.maps;
          }
        }

        setAgents(agentsList);
        setMaps(mapsList);
      } catch (err) {
        console.error('Erro ao buscar filtros:', err);

        // fallback final
        try {
          const mediaRes = await fetch(`${API_BASE}/media`);
          if (mediaRes.ok) {
            const mediaData = await mediaRes.json();
            const normalizedVideos = normalizeListResponse(mediaData);
            const derived = deriveFiltersFromVideos(normalizedVideos);
            setAgents(derived.agents);
            setMaps(derived.maps);
          }
        } catch (fallbackErr) {
          console.error('Erro no fallback de filtros:', fallbackErr);
        }
      }
    }

    fetchFilters();
  }, []);

  useEffect(() => {
    async function fetchVideos() {
      if (!API_BASE) {
        setLoading(false);
        setError('Defina NEXT_PUBLIC_API_URL (ou NEXT_PUBLIC_MEDIA_API) no .env.local');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let endpoint = `${API_BASE}/media`;

        if (selectedAgent) {
          endpoint = `${API_BASE}/media/agents/${encodeURIComponent(toSlug(selectedAgent))}`;
        } else if (selectedMap) {
          endpoint = `${API_BASE}/media/maps/${encodeURIComponent(toSlug(selectedMap))}`;
        }

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Falha ao carregar vídeos da comunidade.');
        }

        const data = await response.json();
        const normalized = normalizeListResponse(data);
        setVideos(normalized);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Erro inesperado ao carregar vídeos.');
        setVideos([]);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [selectedAgent, selectedMap]);

  const filteredVideos = useMemo(() => {
    if (!searchTerm.trim()) return videos;
    const term = searchTerm.toLowerCase();

    return videos.filter((video) =>
      [video.title, video.description, video.agent, video.map]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(term))
    );
  }, [videos, searchTerm]);

  function updateUrl(params: { agent?: string; map?: string }) {
    const next = new URLSearchParams(searchParams.toString());
    next.delete('agent');
    next.delete('map');

    if (params.agent) next.set('agent', toSlug(params.agent));
    if (params.map) next.set('map', toSlug(params.map));

    const query = next.toString();
    const base = withLocale('/community');
    router.replace(query ? `${base}?${query}` : base, { scroll: false });
  }

  function clearFilters() {
    setSelectedAgent('');
    setSelectedMap('');
    updateUrl({});
  }

  function applyAgent(agent: string) {
    const label = slugToLabel(agent);
    setSelectedAgent(label);
    setSelectedMap('');
    updateUrl({ agent: label });
  }

  function applyMap(map: string) {
    const label = slugToLabel(map);
    setSelectedMap(label);
    setSelectedAgent('');
    updateUrl({ map: label });
  }

  function goVideo(youtubeId: string) {
    router.push(withLocale(`/video/${youtubeId}`));
  }

  function onOpenVideo(video: Video) {
    const youtubeId = video.youtubeId || getYoutubeId(video.url);
    if (!youtubeId) return;

    if (typeof window === 'undefined') {
      goVideo(youtubeId);
      return;
    }

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const watchedCount = Number(localStorage.getItem('watchedVideosCount') || '0');
    const adUnlocked = localStorage.getItem('adUnlocked') === 'true';

    if (!token && watchedCount >= 5 && !adUnlocked) {
      setPendingYoutubeId(youtubeId);
      setPaywallOpen(true);
      return;
    }

    goVideo(youtubeId);
  }

  function openAuth() {
    router.push(withLocale('/auth'));
  }

  function unlockByAd() {
    setAdLoading(true);
    setTimeout(() => {
      localStorage.setItem('adUnlocked', 'true');
      setAdLoading(false);
      setPaywallOpen(false);

      if (pendingYoutubeId) {
        goVideo(pendingYoutubeId);
      }
      setPendingYoutubeId(null);
    }, 8000);
  }

  return (
    <main>
      <Nav />
      <div className="page-content with-sidebar">
        <SideBar />
        <div className={`page-content ${styles.page}`}>
          <section className={styles.hero}>
            <div>
              <p className={styles.badge}>Community aberta</p>
              <h1>Vídeos da comunidade.</h1>
            </div>
            <div className={styles.heroActions}>
              <a href={withLocale('/home')}>Conhecer o produto</a>
              <a href={withLocale('/auth')}>Criar conta</a>
            </div>
          </section>

          <div className={styles.layout}>
            <aside className={styles.sidebar}>
              <div className={styles.panel}>
                <h3>Filtros</h3>
                <div className={styles.filterButtons}>
                  <button className={activeFilterType === 'all' ? styles.active : ''} onClick={clearFilters}>
                    Todos
                  </button>
                  <button
                    className={activeFilterType === 'agents' ? styles.active : ''}
                    onClick={() => {
                      setSelectedMap('');
                      updateUrl({});
                    }}
                  >
                    Agentes
                  </button>
                  <button
                    className={activeFilterType === 'maps' ? styles.active : ''}
                    onClick={() => {
                      setSelectedAgent('');
                      updateUrl({});
                    }}
                  >
                    Mapas
                  </button>
                </div>

                <label className={styles.label} htmlFor="community-search">Pesquisar vídeos</label>
                <input
                  id="community-search"
                  className={styles.search}
                  placeholder="Título, agente, mapa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className={styles.panel}>
                <h4>Agentes</h4>
                <div className={styles.chips}>
                  {agents.length === 0 ? (
                    <span className={styles.status}>Nenhum agente disponível.</span>
                  ) : (
                    agents.map((agent) => {
                      const label = slugToLabel(agent);
                      return (
                        <button
                          key={agent}
                          onClick={() => applyAgent(agent)}
                          className={selectedAgent === label ? styles.chipActive : ''}
                        >
                          {label}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              <div className={styles.panel}>
                <h4>Mapas</h4>
                <div className={styles.chips}>
                  {maps.length === 0 ? (
                    <span className={styles.status}>Nenhum mapa disponível.</span>
                  ) : (
                    maps.map((map) => {
                      const label = slugToLabel(map);
                      return (
                        <button
                          key={map}
                          onClick={() => applyMap(map)}
                          className={selectedMap === label ? styles.chipActive : ''}
                        >
                          {label}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </aside>

            <section className={styles.content}>
              <div className={styles.metaRow}>
                <div>
                  <strong>{filteredVideos.length}</strong>
                  <span> vídeos encontrados</span>
                </div>
                <div className={styles.routeInfo}>
                  API ativa: <code>/media</code>, <code>/media/agents/:name</code> e <code>/media/maps/:name</code>
                </div>
              </div>

              {loading && <p className={styles.status}>Carregando vídeos...</p>}
              {error && <p className={styles.error}>{error}</p>}

              {!loading && !error && (
                <div className={styles.grid}>
                  {filteredVideos.length === 0 ? (
                    <p className={styles.status}>Nenhum vídeo encontrado para os filtros selecionados.</p>
                  ) : (
                    filteredVideos.map((video, idx) => (
                      <Fragment key={`${video.id}-${idx}`}>
                        {AD_POSITIONS.has(idx) && (
                          <article className={styles.adCard} aria-label="Anúncio">
                            <span>Ad slot responsivo • 300x250</span>
                            <small>Posicionado entre blocos de conteúdo para não atrapalhar a UX.</small>
                          </article>
                        )}

                        <article
                          className={styles.card}
                          onClick={() => onOpenVideo(video)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter') onOpenVideo(video);
                          }}
                        >
                          <img
                            src={getYoutubeThumb(video.url)}
                            alt={video.title}
                            className={styles.thumb}
                          />

                          <div className={styles.cardBody}>
                            <h3>{video.title}</h3>
                            <p>{video.description || 'Sem descrição disponível.'}</p>
                            <div className={styles.tags}>
                              {video.agent && <span>Agent: {video.agent}</span>}
                              {video.map && <span>Map: {video.map}</span>}
                            </div>
                          </div>
                        </article>
                      </Fragment>
                    ))
                  )}
                </div>
              )}
            </section>
          </div>
        </div>

        {paywallOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h3>Limite gratuito atingido</h3>
              <p>
                Você viu 5 vídeos sem conta. Para liberar o próximo vídeo, escolha
                uma opção:
              </p>

              <div className={styles.modalActions}>
                <button onClick={openAuth}>Criar conta</button>
                <button onClick={unlockByAd} disabled={adLoading}>
                  {adLoading ? 'Assistindo anúncio...' : 'Ver anúncio e liberar 1 vídeo'}
                </button>
              </div>

              <button
                className={styles.modalClose}
                onClick={() => {
                  setPaywallOpen(false);
                  setPendingYoutubeId(null);
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
