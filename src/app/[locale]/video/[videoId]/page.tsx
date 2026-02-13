'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from './video.module.css';
import { Nav } from '@/app/components/nav';
import { language } from '../../../../../constants/language';

interface VideoView {
  title: string;
  description?: string;
  embedUrl: string;
}

function slugify(text?: string) {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function isValidYoutubeId(id?: string) {
  if (!id) return false;
  return /^[a-zA-Z0-9_-]{6,20}$/.test(id);
}

function toEmbedUrlFromId(id?: string) {
  if (!isValidYoutubeId(id)) return null;
  return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
}

export default function VideoPage({ params }: { params: { videoId: string } }) {
  const [video, setVideo] = useState<VideoView | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canWatch, setCanWatch] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [unlockingAd, setUnlockingAd] = useState(false);

  const countedRef = useRef(false);

  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = useMemo(() => {
    const first = pathname?.split('/').filter(Boolean)[0];
    return language.includes(first) ? first : 'pt';
  }, [pathname]);

  const withLocale = (path: string) => {
    const clean = path.startsWith('/') ? path : `/${path}`;
    return `/${currentLocale}${clean}`;
  };

  useEffect(() => {
    const checkLimitAndLoad = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        if (!token && !countedRef.current) {
          countedRef.current = true;
          const watchedCount = Number(localStorage.getItem('watchedVideosCount') || '0');
          const adUnlocked = localStorage.getItem('adUnlocked') === 'true';

          if (watchedCount >= 5) {
            if (adUnlocked) {
              localStorage.setItem('adUnlocked', 'false');
              setCanWatch(true);
            } else {
              setShowPaywall(true);
              setCanWatch(false);
              setLoading(false);
              return;
            }
          } else {
            localStorage.setItem('watchedVideosCount', String(watchedCount + 1));
            setCanWatch(true);
          }
        } else {
          setCanWatch(true);
        }

        // O videoId da rota agora é o ID do YouTube (ex: aVXJIbd6lng)
        const embedUrl = toEmbedUrlFromId(params.videoId);
        if (!embedUrl) throw new Error('ID do vídeo inválido.');

        setVideo({
          title: 'Vídeo da comunidade',
          description: 'Conteúdo enviado pela comunidade.',
          embedUrl,
        });
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Erro ao carregar vídeo.');
      } finally {
        setLoading(false);
      }
    };

    checkLimitAndLoad();
  }, [params.videoId]);

  function handleWatchAd() {
    setUnlockingAd(true);
    setTimeout(() => {
      localStorage.setItem('adUnlocked', 'true');
      setUnlockingAd(false);
      router.push(withLocale('/community'));
    }, 10000);
  }

  return (
    <main>
      <Nav />

      <div className={`page-content ${styles.page}`}>
        <div className={styles.topBar}>
          <a href={withLocale('/community')}>← Voltar para Community</a>
          <a href={withLocale('/auth')}>Entrar / Criar conta</a>
        </div>

        {loading && <p className={styles.status}>Carregando vídeo...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {!loading && !error && !canWatch && showPaywall && (
          <section className={styles.paywallCard}>
            <h2>Limite gratuito atingido</h2>
            <p>
              Você já assistiu 5 vídeos sem conta. Crie uma conta para acesso livre
              ou assista um anúncio para liberar 1 novo vídeo.
            </p>

            <div className={styles.paywallActions}>
              <button onClick={() => router.push(withLocale('/auth'))}>Criar conta</button>
              <button onClick={handleWatchAd} disabled={unlockingAd}>
                {unlockingAd ? 'Assistindo anúncio...' : 'Assistir anúncio'}
              </button>
            </div>
          </section>
        )}

        {!loading && !error && canWatch && video && (
          <article className={styles.videoCard}>
            <h1>{video.title}</h1>

            <div className={styles.playerWrap}>
              <iframe
                src={video.embedUrl}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            <p className={styles.description}>
              {video.description || 'Sem descrição disponível para este vídeo.'}
            </p>

            <div className={styles.metaList}>
              <a href={withLocale(`/community`)}>Voltar para vídeos da comunidade</a>
              <a href={withLocale(`/community?agent=${slugify('')}`)} style={{ display: 'none' }}>
                hidden-link
              </a>
            </div>

            <div className={styles.adSlot} aria-label="Anúncio">
              <span>Área de anúncio abaixo do player (não intrusiva).</span>
            </div>
          </article>
        )}
      </div>
    </main>
  );
}
