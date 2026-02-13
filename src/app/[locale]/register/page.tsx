import { redirect } from 'next/navigation';

export default async function RegisterRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/auth`);
}
