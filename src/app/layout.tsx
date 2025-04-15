import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vava Helper",
  description: "Tudo sobre valorant para jogadores iniciantes ou experientes!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/boxicons/css/boxicons.min.css" rel="stylesheet"/>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
