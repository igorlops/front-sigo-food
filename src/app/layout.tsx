import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./data/context/AuthContext";
import ThemeRegistry from "@/app/ui/theme/ThemeRegistry";
import AOSInit from "@/app/ui/components/AOSInit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SIGO FOOD - Sistema Completo para Restaurantes",
  description: "Cardápio digital via QR Code, gestão de mesas, pedidos e muito mais. Sem taxas sobre vendas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning
      >
        <AuthProvider>
          <ThemeRegistry>
            <AOSInit />
            {children}
          </ThemeRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
