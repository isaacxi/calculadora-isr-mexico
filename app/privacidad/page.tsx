import React from "react";
import Link from "next/link";

export default function AvisoPrivacidad() {
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
            <Link href="/privacidad" className="text-blue-600 font-semibold">Aviso de Privacidad</Link>
            <Link href="/terminos" className="hover:text-blue-600 transition">Términos</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow p-4 sm:p-12 max-w-4xl mx-auto space-y-6 bg-white my-8 rounded-2xl shadow-sm border border-slate-200 text-sm leading-relaxed text-slate-700">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Aviso de Privacidad</h1>
        <p className="text-xs text-slate-500">Última actualización: Noviembre de 2026</p>

        <p>
          En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), <strong>ZG Group</strong> es el responsable del tratamiento y protección de los datos personales que pudieran recabarse a través de este sitio web.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-4">1. Datos que se recaban y finalidad</h2>
        <p>
          Nuestra calculadora procesa los montos numéricos ingresados directamente en los campos de la interfaz (ingresos, deducciones) de forma local en el navegador del usuario para efectuar las operaciones aritméticas correspondientes. <strong>No almacenamos, guardamos ni revendemos bases de datos con información financiera o fiscal individualizada de los usuarios.</strong>
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-4">2. Uso de Cookies y Publicidad de Google AdSense</h2>
        <p>
          Este sitio web utiliza cookies de terceros, incluidas las cookies de Google AdSense, para mostrar anuncios basados en las visitas previas de los usuarios a este u otros sitios web.
        </p>
        <p>
          El uso de cookies de publicidad por parte de Google permite que sus socios muestren anuncios a nuestros usuarios en función de su navegación. Los usuarios pueden desactivar la publicidad personalizada accediendo a la <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Configuración de anuncios de Google</a>.
        </p>

     <h2 className="text-lg font-bold text-slate-900 pt-4">3. Derechos ARCO y Contacto</h2>
<p>
  Usted tiene derecho a conocer qué datos tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal (Rectificación), su eliminación de nuestros registros (Cancelación), así como oponerse al uso de sus datos para fines específicos (Oposición). Para ejercer estos derechos o resolver cualquier duda relacionada con este aviso, puede contactarnos directamente a través del correo electrónico: <a href="mailto:contacto@zg-group.com.mx" className="text-blue-600 font-semibold underline">contacto@zg-group.com.mx</a>.
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
