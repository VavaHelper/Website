import { redirect } from 'next/navigation';

export default function CommunityAgentRedirect({
  params,
}: {
  params: { locale: string; agent: string };
}) {
  const { locale, agent } = params;
  redirect(`/${locale}/community?agent=${encodeURIComponent(agent)}`);
}
