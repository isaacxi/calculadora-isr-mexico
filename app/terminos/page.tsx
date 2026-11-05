import React from "react";
import Link from "next/link";

export default function TerminosCondiciones() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between font-sans antialiased">
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg sm:text-xl tracking-tight text-slate-900">
            <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-xs sm:text-sm font-black">MX</span>
            <span>Calculadora ISR — ZG Group</span>
          </Link>
          <nav className="flex gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition">Calculadora</Link>
            <Link href="/acerca" className="hover:text-blue-600 transition">Acerca de</Link>
            <Link href="/privacidad" className="hover:text-blue-600 transition">Aviso de Privacidad</Link>
            <Link href="/terminos" className="text-blue-600 font-semibold">Términos</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow p-4 sm:p-12 max-w-4xl mx-auto space-y-6 bg-white my-8 rounded-2xl shadow-sm border border-slate-200 text-sm leading-relaxed text-slate-700">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Términos y Condiciones de Uso</h1>
        <p className="text-xs text-slate-500">Última actualización: Noviembre de 2026</p>

        <p>
          El acceso y uso de la plataforma web <strong>Calculadora ISR — ZG Group</strong> atribuye la condición de usuario e implica la aceptación total de los presentes Términos y Condiciones.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-4">1. Objeto de la Plataforma</h2>
        <p>
          La herramienta provee simulaciones y estimaciones orientativas del Impuesto Sobre la Renta (ISR) para personas físicas bajo distintos regímenes fiscales en México (Sueldos y Salarios, RESICO, Actividad Empresarial y RIF) con base en las tablas oficiales publicadas para el ejercicio fiscal 2026.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-4">2. Limitación de Responsabilidad</h2>
        <p>
          Los resultados generados por esta aplicación web son de carácter puramente informativo, estimativo y educativo. <strong>ZG Group no asume responsabilidad legal o financiera</strong> por discrepancias con las determinaciones oficiales emitidas por el Servicio de Administración Tributaria (SAT) ni sustituye de ningún modo la asesoría personalizada de un contador público certificado.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-4">3. Propiedad Intelectual</h2>
        <p>
          Todo el código fuente, diseño de interfaces, logotipos, textos editoriales y estructura de la aplicación son propiedad exclusiva de ZG Group y se encuentran protegidos por las leyes de derechos de autor aplicables. Queda prohibida su reproducción total o parcial sin autorización expresa.
        </p>
      </main>

      <footer className="w-full bg-slate-900 border-t border-slate-800 text-slate-400 py-8 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 Calculadora ISR — ZG Group. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
