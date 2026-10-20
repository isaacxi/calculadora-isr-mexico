import React from 'react';
import Link from 'next/link';

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans antialiased">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
            <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-black">MX</span>
            <span>FiniquitoMx</span>
          </Link>
          <nav className="flex gap-6 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-blue-400 transition">Calculadora ISR</Link>
            <Link href="/privacidad" className="text-blue-400 font-semibold">Aviso de Privacidad</Link>
            <Link href="/terminos" className="hover:text-blue-400 transition">Términos</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 sm:p-10 shadow-xl space-y-8 text-slate-300 text-sm leading-relaxed">
          <header className="border-b border-slate-700 pb-6">
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Aviso de Privacidad</h1>
            <p className="text-xs text-slate-400">Última actualización: Octubre 2026</p>
          </header>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Responsable del Tratamiento de Datos</h2>
            <p>
              <strong>FiniquitoMx</strong>, un proyecto desarrollado y administrado por <strong>ZG Group</strong>, con domicilio en México, es responsable del tratamiento y protección de la información recopilada a través de este portal web.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Datos Personales y Financieros</h2>
            <p>
              Nuestra herramienta de cálculo de ISR opera de manera 100% privada y local. <strong>No recopilamos, almacenamos, procesamos ni transmitimos a ningún servidor externo los datos numéricos, sueldos o montos financieros</strong> ingresados por el usuario.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Uso de Cookies y Publicidad de Terceros (Google AdSense)</h2>
            <p>
              Este sitio web utiliza cookies técnicas y cookies de terceros gestionadas por <strong>Google LLC</strong> y sus socios comerciales para la entrega de anuncios publicitarios personalizados. Los usuarios pueden inhabilitar la publicidad personalizada accediendo a la <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">Configuración de Anuncios de Google</a>.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-700/60 pt-6">
            <h2 className="text-lg font-bold text-white">4. Contacto</h2>
            <p>
              Dudas o aclaraciones sobre este Aviso de Privacidad: <span className="text-blue-400">contacto@zg-group.com.mx</span>.
            </p>
          </section>
        </article>
      </main>

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
