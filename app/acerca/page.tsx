import React from "react";
import Link from "next/link";

export default function AcercaDe() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between font-sans antialiased">
      {/* NAVEGACIÓN */}
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg sm:text-xl tracking-tight text-slate-900">
            <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-xs sm:text-sm font-black">MX</span>
            <span>Calculadora ISR — ZG Group</span>
          </Link>
          <nav className="flex gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition">Calculadora</Link>
            <Link href="/acerca" className="text-blue-600 font-semibold">Acerca de</Link>
            <Link href="/privacidad" className="hover:text-blue-600 transition">Aviso de Privacidad</Link>
            <Link href="/terminos" className="hover:text-blue-600 transition">Términos</Link>
          </nav>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="flex-grow p-4 sm:p-12 max-w-4xl mx-auto space-y-8 bg-white my-8 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Acerca de ZG Group y la Calculadora ISR</h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Esta plataforma web fue desarrollada y es operada de forma independiente por <strong>ZG Group</strong>. Nuestro objetivo es proveer herramientas de simulación y estimación fiscal precisas, accesibles y actualizadas para personas físicas en México.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-800">¿Quiénes somos?</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            ZG Group es una organización especializada en el desarrollo de soluciones tecnológicas, ingeniería y optimización de procesos. Comprometidos con la digitalización de herramientas útiles para profesionales y contribuyentes, diseñamos calculadoras basadas estrictamente en el marco legal vigente.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-800">Fuentes Oficiales y Rigor Metodológico</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Las fórmulas, tarifas, topes y tablas integradas en nuestras calculadoras se actualizan conforme a las disposiciones publicadas oficialmente en:
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
            <li>La Ley del Impuesto sobre la Renta (LISR).</li>
            <li>El Diario Oficial de la Federación (DOF) en materia de UMA, salarios mínimos y decretos de subsidio al empleo.</li>
            <li>El Anexo 8 de la Resolución Miscelánea Fiscal (RMF) aplicable al ejercicio fiscal 2026.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-800">Naturaleza Independiente</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Aclaramos enfáticamente que <strong>esta herramienta no tiene afiliación, patrocinio ni respaldo oficial con el Servicio de Administración Tributaria (SAT)</strong> ni con ninguna otra dependencia gubernamental. Funciona como un simulador orientativo de apoyo y no sustituye la asesoría formal de un contador público certificado ni las declaraciones oficiales ante las autoridades fiscales.
          </p>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-slate-900 border-t border-slate-800 text-slate-400 py-8 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <p>© 2026 Calculadora ISR — ZG Group. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
