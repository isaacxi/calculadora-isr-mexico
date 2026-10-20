import React from 'react';
import Link from 'next/link';

export default function PrivacidadPage() {
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
            <Link href="/privacidad" class="text-blue-400 font-semibold">Aviso de Privacidad</Link>
            <Link href="/terminos" class="hover:text-blue-400 transition">Términos</Link>
          </nav>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main class="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article class="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 sm:p-10 shadow-xl space-y-8 text-slate-300 text-sm leading-relaxed">
          
          <header class="border-b border-slate-700 pb-6">
            <h1 class="text-3xl font-extrabold text-white tracking-tight mb-2">Aviso de Privacidad</h1>
            <p class="text-xs text-slate-400">Última actualización: Octubre 2026</p>
          </header>

          <section class="space-y-3">
            <h2 class="text-lg font-bold text-white">1. Responsable del Tratamiento de Datos</h2>
            <p>
              <strong>FiniquitoMx</strong>, un proyecto desarrollado y administrado por <strong>ZG Group</strong>, con domicilio en México, es responsable del tratamiento y protección de la información recopilada a través de este portal web.
            </p>
          </section>

          <section class="space-y-3">
            <h2 class="text-lg font-bold text-white">2. Datos Personales y Financieros</h2>
            <p>
              Nuestra herramienta de cálculo de ISR opera de manera 100% privada y local. <strong>No recopilamos, almacenamos, procesamos ni transmitimos a ningún servidor externo los datos numéricos, sueldos o montos financieros</strong> ingresados por el usuario en los campos de cálculo. Dichos datos permanecen únicamente en la memoria temporal del navegador web del usuario.
            </p>
          </section>

          <section class="space-y-3">
            <h2 class="text-lg font-bold text-white">3. Uso de Cookies y Publicidad de Terceros (Google AdSense)</h2>
            <p>
              Este sitio web utiliza cookies técnicas para garantizar el correcto funcionamiento de la interfaz y cookies de terceros gestionadas por <strong>Google LLC</strong> y sus socios comerciales para la entrega de anuncios publicitarios:
            </p>
            <ul class="list-disc pl-5 space-y-2 text-slate-400">
              <li>
                Google, como proveedor de terceros, utiliza cookies para publicar anuncios en nuestro sitio web.
              </li>
              <li>
                El uso de cookies publicitarias le permite a Google y a sus socios presentar anuncios basados en las visitas previas que el usuario realiza a este o a otros sitios de Internet.
              </li>
              <li>
                Los usuarios pueden inhabilitar la publicidad personalizada accediendo a la <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline hover:text-blue-300">Configuración de Anuncios de Google</a>.
              </li>
            </ul>
          </section>

          <section class="space-y-3">
            <h2 class="text-lg font-bold text-white">4. Enlaces a Sitios de Terceros</h2>
            <p>
              El sitio puede contener enlaces a páginas externas o anuncios publicitarios. FiniquitoMx y ZG Group no ejercen control ni asumen responsabilidad sobre las prácticas de privacidad, políticas o contenidos de dichos sitios web de terceros.
            </p>
          </section>

          <section class="space-y-3">
            <h2 class="text-lg font-bold text-white">5. Modificaciones al Aviso de Privacidad</h2>
            <p>
              Nos reservamos el derecho de efectuar en cualquier momento modificaciones o actualizaciones al presente Aviso de Privacidad para atender novedades legislativas, políticas internas o nuevos requerimientos para la prestación de nuestros servicios.
            </p>
          </section>

          <section class="space-y-3 border-t border-slate-700/60 pt-6">
            <h2 class="text-lg font-bold text-white">6. Contacto</h2>
            <p>
              Si tiene dudas sobre este Aviso de Privacidad, puede ponerse en contacto con nuestro equipo de soporte técnico a través del correo institucional de la firma: <span class="text-blue-400">contacto@zg-group.com.mx</span>.
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
