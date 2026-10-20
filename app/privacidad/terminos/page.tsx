import React from 'react';
import Link from 'next/link';

export default function TerminosPage() {
  return (
    <div class="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans antialiased">
      {/* CABECERA */}
      <header class="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" class="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
            <span class="bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-black">MX</span>
            <span>FiniquitoMx</span>
          </Link>
          <nav class="flex gap-6 text-sm font-medium text-slate-300">
            <Link href="/" class="hover:text-blue-400 transition">Calculadora ISR</Link>
            <Link href="/privacidad" class="hover:text-blue-400 transition">Aviso de Privacidad</Link>
            <Link href="/terminos" class="text-blue-400 font-semibold">Términos</Link>
          </nav>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main class="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article class="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 sm:p-10 shadow-xl space-y-8 text-slate-300 text-sm leading-relaxed">
          
          <header class="border-b border-slate-700 pb-6">
            <h1 class="text-3xl font-extrabold text-white tracking-tight mb-2">Términos y Condiciones de Uso</h1>
            <p class="text-xs text-slate-400">Última actualización: Octubre 2026</p>
          </header>

          <section class="space-y-3">
            <h2 class="text-lg font-bold text-white">1. Aceptación de los Términos</h2>
            <p>
              Al acceder, navegar y utilizar la plataforma <strong>FiniquitoMx</strong>, el usuario acepta de manera plena y sin reservas cumplir con los presentes Términos y Condiciones de Uso. Si el usuario no está de acuerdo con alguno de los términos estipulados, deberá abstenerse de utilizar el sitio.
            </p>
          </section>

          <section class="space-y-3">
            <h2 class="text-lg font-bold text-white">2. Carácter Informativo y Educativo</h2>
            <p>
              Los cálculos, estimaciones y resultados emitidos por esta herramienta son <strong>exclusivamente de carácter informativo, orientativo y educativo</strong>. Las fórmulas aplicadas se basan en las tablas de retención del Impuesto sobre la Renta (ISR) publicadas de manera oficial por el Servicio de Administración Tributaria (SAT) en el Diario Oficial de la Federación (DOF) en México.
            </p>
          </section>

          <section class="space-y-3">
            <h2 class="text-lg font-bold text-white">3. Deslinde de Responsabilidad Profesional</h2>
            <p>
              FiniquitoMx y ZG Group no prestan servicios de asesoría contable, legal, tributaria ni fiscal a través de esta plataforma. La utilización de esta herramienta no sustituye la consulta ni el dictamen de un Contador Público, especialista fiscal o abogado laboralista certificado.
            </p>
            <p class="text-slate-400">
              ZG Group no asume responsabilidad alguna por decisiones financieras, acuerdos de finiquito, retenciones en nómina o declaraciones de impuestos realizadas tomando como base única los resultados arrojados por esta calculadora.
            </p>
          </section>

          <section class="space-y-3">
            <h2 class="text-lg font-bold text-white">4. Propiedad Intelectual</h2>
            <p>
              Todo el contenido visual, código fuente, interfaz gráfica, estructura de datos, marcas, logotipos y elementos de diseño pertenecientes a FiniquitoMx son propiedad exclusiva de <strong>ZG Group</strong> y están protegidos por las leyes de propiedad intelectual e industrial aplicables en México e internacionalmente.
            </p>
          </section>

          <section class="space-y-3 border-t border-slate-700/60 pt-6">
            <h2 class="text-lg font-bold text-white">5. Jurisdicción y Legislación Aplicable</h2>
            <p>
              Para la interpretación y cumplimiento de los presentes Términos y Condiciones, las partes se someten a la legislación vigente en los Estados Unidos Mexicanos y a la jurisdicción de los tribunales competentes en México.
            </p>
          </section>

        </article>
      </main>

      {/* FOOTER */}
      <footer class="bg-slate-950 border-t border-slate-800 text-slate-400 py-8 text-xs text-center">
        <div class="max-w-7xl mx-auto px-4 space-y-4">
          <div class="flex justify-center gap-6 text-slate-300 font-medium">
            <Link href="/privacidad" class="hover:text-white transition">Aviso de Privacidad</Link>
            <span class="text-slate-700">•</span>
            <Link href="/terminos" class="hover:text-white transition">Términos y Condiciones</Link>
          </div>
          <p class="text-slate-500 font-semibold">
            © 2026 FiniquitoMx — Un proyecto de ZG Group. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
