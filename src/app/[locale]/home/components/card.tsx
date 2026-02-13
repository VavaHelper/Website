"use client";

import { CardSkeleton } from './cardSkeleton';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export interface CardProps {
  imagePath: string;
  placeholderPath?: string;
  title: string;
  informationText?: string | React.ReactNode;
  loading?: boolean;
  disableAnim?: boolean;
  href: string;
}

export function Card({
  imagePath,
  placeholderPath,
  title,
  informationText,
  loading = false,
  href,
}: CardProps) {
  const t = useTranslations('home');
  const displayImage = loading && placeholderPath ? placeholderPath : imagePath;

  return (
    <Link
      href={href}
      className="group block w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:border-white/25"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={displayImage}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
        <p className="absolute left-4 bottom-3 text-2xl font-bold tracking-wide">{title}</p>
      </div>

      <div className="p-4">
        {loading ? (
          <CardSkeleton />
        ) : (
          <p className="text-sm text-white/80 leading-relaxed">{informationText}</p>
        )}

        <p className="mt-3 text-xs text-white/70">
          {t('sejabem')} <span className="font-semibold text-[#ff6b6b]">VavaHelper</span>
        </p>
      </div>
    </Link>
  );
}
