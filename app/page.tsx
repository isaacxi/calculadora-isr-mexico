import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div class="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans antialiased">
      {/* NAVEGACIÓN Y CABECERA */}
      <header class="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" class="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
            <span class="bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-black">MX</span>
            <span>FiniquitoMx</span>
          </Link>
          <nav class="flex gap-6 text-sm font-medium text-slate-300">
            <Link href="/" class="hover:text-blue-400 transition">Calculadora ISR</Link>
            <Link href="/privacidad" class="hover:text-blue-400 transition">Aviso de Privacidad</Link>
            <Link href="/terminos" class="hover:text-blue-400 transition">Términos</Link>
          </nav>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL / CALCULADORA */}
      <main class="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section class="text-center mb-10">
          <h1 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Calculadora de ISR México 2026
          </h1>
          <p class="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Calcula las retenciones de Impuesto sobre la Renta, sueldo bruto y sueldo neto conforme a las tablas oficiales del SAT y del Diario Oficial de la Federación.
          </p>
        </section>

        {/* TARJETA / MÓDULO INTERACTIVO DE CÁLCULO */}
        <div class="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
          <form class="space-y-6">
            <div>
              <label class="block text-sm font-semibold text-slate-200 mb-2">
                Ingreso Bruto Mensual (MXN)
              </label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 font-bold">$</span>
                <input 
                  type="number" 
                  placeholder="Ej. 25000" 
                  class="w-full pl-9 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-slate-200 mb-2">
                  Periodicidad de Pago
                </label>
                <select class="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                  <option value="mensual">Mensual</option>
                  <option value="quincenal">Quincenal</option>
                  <option value="semanal">Semanal</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-semibold text-slate-200 mb-2">
                  Año Fiscal
                </label>
                <input 
                  type="text" 
                  value="2026 (Tablas DOF)" 
                  disabled 
                  class="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-500 font-medium cursor-not-allowed"
                />
              </div>
            </div>

            <button 
              type="button" 
              class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition duration-200 text-base"
            >
              Calcular ISR y Sueldo Neto
            </button>
          </form>

          {/* ÁREA DE RESULTADOS (ESTRUCTURA MOCKUP) */}
          <div class="mt-8 pt-6 border-t border-slate-700/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div class="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
              <span class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Ingreso Bruto</span>
              <span class="text-xl font-extrabold text-white">$0.00</span>
            </div>
            <div class="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
              <span class="block text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">Retención ISR</span>
              <span class="text-xl font-extrabold text-rose-400">$0.00</span>
            </div>
            <div class="bg-slate-900/60 p-4 rounded-xl border border-blue-500/30 bg-blue-950/20">
              <span class="block text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Sueldo Neto Estimado</span>
              <span class="text-xl font-extrabold text-emerald-400">$0.00</span>
            </div>
          </div>
        </div>

        {/* SECCIÓN INFORMATIVA / SEO LONG-TAIL */}
        <section class="mt-14 space-y-6 text-slate-300 text-sm leading-relaxed">
          <h2 class="text-xl font-bold text-white border-b border-slate-800 pb-2">
            ¿Cómo se calcula la retención del ISR sobre el salario?
          </h2>
          <p>
            El Impuesto sobre la Renta (ISR) en México es un impuesto progresivo aplicable a las personas físicas que perciben ingresos por sueldos y salarios. El cálculo se realiza comparando el ingreso bruto recibido contra las tablas y tarifas oficiales publicadas en el Diario Oficial de la Federación.
          </p>
          <ul class="list-disc pl-5 space-y-2 text-slate-400">
            <li><strong>Límite Inferior:</strong> Monto base sobre el cual se ubica el rango de ingreso.</li>
            <li><strong>Cuota Fija:</strong> Importe predeterminado acumulado para ese renglón de la tabla.</li>
            <li><strong>Porcentaje sobre Excedente:</strong> Tasa progresiva aplicada sobre la diferencia entre el ingreso y el límite inferior.</li>
          </ul>
        </section>
      </main>

      {/* FOOTER COMPLETO CON REQUISITOS DE GOOGLE ADSENSE Y COPYRIGHT ZG GROUP */}
      <footer class="bg-slate-950 border-t border-slate-800 text-slate-400 py-10 mt-20 text-xs">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          
          {/* Enlaces Legales requeridos por Google AdSense */}
          <div class="flex flex-wrap justify-center items-center gap-6 text-slate-300 font-medium text-sm">
            <Link href="/privacidad" class="hover:text-white transition underline decoration-slate-700 underline-offset-4">
              Aviso de Privacidad
            </Link>
            <span class="text-slate-700">•</span>
            <Link href="/terminos" class="hover:text-white transition underline decoration-slate-700 underline-offset-4">
              Términos y Condiciones
            </Link>
          </div>

          {/* Leyenda Informativa de Responsabilidad Fiscal */}
          <p class="max-w-3xl mx-auto text-slate-500 leading-relaxed">
            Esta herramienta es un simulador puramente informativo y educativo basado en las tarifas de retención del ISR vigentes publicadas por el Servicio de Administración Tributaria (SAT) en el Diario Oficial de la Federación. No constituye una dictaminación o asesoría contable, legal ni fiscal profesional.
          </p>

          {/* Línea de Separación y Copyright Oficial */}
          <div class="pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500">
            <p class="font-semibold text-slate-400">
              © 2026 FiniquitoMx — Un proyecto de ZG Group.
            </p>
            <p>
              Todos los derechos reservados. Desarrollado en México.
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}
