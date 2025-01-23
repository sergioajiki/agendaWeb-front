import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgendaWeb",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
