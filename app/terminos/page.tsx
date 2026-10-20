import React from 'react';
import Link from 'next/link';

export default function TerminosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans antialiased">
      {/* NAVEGACIÓN */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
            <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-black">MX</span>
            <span>FiniquitoMx</span>
          </Link>
          <nav className="flex gap-6 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-blue-400 transition">Calculadora ISR</Link>
            <Link href="/privacidad" className="hover:text-blue-400 transition">Aviso de Privacidad</Link>
            <Link href="/terminos" className="text-blue-400 font-semibold">Términos</Link>
          </nav>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 sm:p-10 shadow-xl space-y-8 text-slate-300 text-sm leading-relaxed">
          <header className="border-b border-slate-700 pb-6">
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Términos y Condiciones de Uso</h1>
            <p className="text-xs text-slate-400">Última actualización: Octubre 2026</p>
          </header>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar la plataforma <strong>FiniquitoMx</strong>, el usuario acepta de manera plena y sin reservas cumplir con los presentes Términos y Condiciones de Uso.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Carácter Informativo y Educativo</h2>
            <p>
              Los cálculos y estimaciones emitidos por esta herramienta son <strong>exclusivamente de carácter informativo, orientativo y educativo</strong> basados en las tablas del SAT.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-700/60 pt-6">
            <h2 className="text-lg font-bold text-white">3. Propiedad Intelectual</h2>
            <p>
              Todo el contenido y código fuente pertenecen a <strong>ZG Group</strong>.
            </p>
          </section>
        </article>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-8 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex justify-center gap-6 text-slate-300 font-medium">
            <Link href="/privacidad" className="hover:text-white transition">Aviso de Privacidad</Link>
            <span className="text-slate-700">•</span>
            <Link href="/terminos" className="hover:text-white transition">Términos y Condiciones</Link>
          </div>
          <p className="text-slate-500 font-semibold">
            © 2026 FiniquitoMx — Un proyecto de ZG Group. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
