import { redirect } from 'next/navigation';

export default async function RootRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/community`);
}
