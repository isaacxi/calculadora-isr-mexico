import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans antialiased">
      {/* NAVEGACIÓN Y CABECERA */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
            <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-black">MX</span>
            <span>FiniquitoMx</span>
          </Link>
          <nav className="flex gap-6 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-blue-400 transition">Calculadora ISR</Link>
            <Link href="/privacidad" className="hover:text-blue-400 transition">Aviso de Privacidad</Link>
            <Link href="/terminos" className="hover:text-blue-400 transition">Términos</Link>
          </nav>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL / CALCULADORA */}
      <main className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="text-center mb-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Calculadora de ISR México 2026
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Calcula las retenciones de Impuesto sobre la Renta, sueldo bruto y sueldo neto conforme a las tablas oficiales del SAT y del Diario Oficial de la Federación.
          </p>
        </section>

        {/* TARJETA / MÓDULO INTERACTIVO DE CÁLCULO */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                Ingreso Bruto Mensual (MXN)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 font-bold">$</span>
                <input 
                  type="number" 
                  placeholder="Ej. 25000" 
                  className="w-full pl-9 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Periodicidad de Pago
                </label>
                <select className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                  <option value="mensual">Mensual</option>
                  <option value="quincenal">Quincenal</option>
                  <option value="semanal">Semanal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Año Fiscal
                </label>
                <input 
                  type="text" 
                  value="2026 (Tablas DOF)" 
                  disabled 
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-500 font-medium cursor-not-allowed"
                />
              </div>
            </div>

            <button 
              type="button" 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition duration-200 text-base"
            >
              Calcular ISR y Sueldo Neto
            </button>
          </form>

          {/* RESULTADOS */}
          <div className="mt-8 pt-6 border-t border-slate-700/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Ingreso Bruto</span>
              <span className="text-xl font-extrabold text-white">$0.00</span>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
              <span className="block text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">Retención ISR</span>
              <span className="text-xl font-extrabold text-rose-400">$0.00</span>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-xl border border-blue-500/30 bg-blue-950/20">
              <span className="block text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Sueldo Neto Estimado</span>
              <span className="text-xl font-extrabold text-emerald-400">$0.00</span>
            </div>
          </div>
        </div>

        {/* SECCIÓN INFORMATIVA */}
        <section className="mt-14 space-y-6 text-slate-300 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">
            ¿Cómo se calcula la retención del ISR sobre el salario?
          </h2>
          <p>
            El Impuesto sobre la Renta (ISR) en México es un impuesto progresivo aplicable a las personas físicas que perciben ingresos por sueldos y salarios. El cálculo se realiza comparando el ingreso bruto recibido contra las tablas y tarifas oficiales publicadas en el Diario Oficial de la Federación.
          </p>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-10 mt-20 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <div className="flex flex-wrap justify-center items-center gap-6 text-slate-300 font-medium text-sm">
            <Link href="/privacidad" className="hover:text-white transition underline decoration-slate-700 underline-offset-4">
              Aviso de Privacidad
            </Link>
            <span className="text-slate-700">•</span>
            <Link href="/terminos" className="hover:text-white transition underline decoration-slate-700 underline-offset-4">
              Términos y Condiciones
            </Link>
          </div>
          <p className="max-w-3xl mx-auto text-slate-500 leading-relaxed">
            Esta herramienta es un simulador puramente informativo y educativo basado en las tarifas de retención del ISR vigentes publicadas por el Servicio de Administración Tributaria (SAT) en el Diario Oficial de la Federación.
          </p>
          <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500">
            <p className="font-semibold text-slate-400">
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
