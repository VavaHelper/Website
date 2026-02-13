import { redirect } from 'next/navigation';

export default function CommunityMapRedirect({
  params,
}: {
  params: { locale: string; map: string };
}) {
  const { locale, map } = params;
  redirect(`/${locale}/community?map=${encodeURIComponent(map)}`);
}
