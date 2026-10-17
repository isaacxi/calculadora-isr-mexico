import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calculadora ISR 2026 México | Sueldos, RESICO, Actividad Empresarial y RIF",
  description:
    "Calcula gratis y al instante tu Impuesto Sobre la Renta (ISR) en México para 2026. Herramienta auditada según las tablas del SAT (Art. 96, 113-E y 106 de la LISR).",
  keywords: [
    "Calculadora ISR 2026",
    "Calcular ISR Mexico",
    "Retencion ISR Sueldos y Salarios",
    "Calculadora RESICO Persona Fisica",
    "Calculadora Actividad Empresarial SAT",
    "Calculadora RIF Bimestral",
    "Tablas ISR SAT 2026",
    "Subsidio al empleo 2026",
  ],
  authors: [{ name: "Calculadora ISR México" }],
  creator: "Calculadora ISR México",
  openGraph: {
    title: "Calculadora ISR 2026 México | Herramienta Fiscal Gratuita",
    description:
      "Calcula las retenciones y pagos provisionales de ISR para Sueldos, RESICO, Actividad Empresarial y RIF con las tablas oficiales del SAT.",
    url: "https://calculadora-isr-mexico-livid.vercel.app/",
    siteName: "Calculadora ISR México",
    locale: "es_MX",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
