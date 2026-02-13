import { redirect } from 'next/navigation';

export default async function SkillsRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/agents`);
}
