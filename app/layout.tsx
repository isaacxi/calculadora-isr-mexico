import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://calculadora-isr-mexico-livid.vercel.app"),
  title: "Calculadora de ISR 2026 en México | Sueldos, RESICO y Actividad Empresarial",
  description:
    "Estima tu ISR 2026 en México para sueldos y salarios, RESICO y actividad empresarial. Consulta la metodología, retenciones y límites de esta herramienta orientativa.",
  keywords: [
    "Calculadora de ISR 2026",
    "Calcular ISR Mexico",
    "Retencion ISR Sueldos y Salarios",
    "Calculadora RESICO Persona Fisica",
    "Pagos provisionales ISR",
    "Tablas ISR Articulo 96 LISR",
  ],
  verification: {
    google: "7SVTCuzRPjiSBaNf9mVaRcwzgzNX8AuWwpMuKsb3f1E",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Calculadora de ISR 2026 en México",
    description:
      "Calcula una estimación de ISR por régimen fiscal y consulta la metodología de cálculo conforme a la LISR.",
    url: "/",
    siteName: "Calculadora ISR México",
    locale: "es_MX",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
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
