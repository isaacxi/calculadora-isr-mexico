"use client";

import React, { useState } from "react";
import Link from "next/link";

// --- TABLAS Y TIPOS BASE DE ISR ---
type TramoISR = {
  limiteInferior: number;
  limiteSuperior: number;
  cuotaFija: number;
  tasaExcedente: number;
};

const TARIFA_MENSUAL_ISR_2026: TramoISR[] = [
  { limiteInferior: 0.01, limiteSuperior: 844.59, cuotaFija: 0, tasaExcedente: 0.0192 },
  { limiteInferior: 844.60, limiteSuperior: 7168.51, cuotaFija: 16.22, tasaExcedente: 0.064 },
  { limiteInferior: 7168.52, limiteSuperior: 12598.02, cuotaFija: 420.95, tasaExcedente: 0.1088 },
  { limiteInferior: 12598.03, limiteSuperior: 14644.64, cuotaFija: 1011.68, tasaExcedente: 0.16 },
  { limiteInferior: 14644.65, limiteSuperior: 17533.64, cuotaFija: 1339.14, tasaExcedente: 0.1792 },
  { limiteInferior: 17533.65, limiteSuperior: 35362.83, cuotaFija: 1856.84, tasaExcedente: 0.2136 },
  { limiteInferior: 35362.84, limiteSuperior: 55736.68, cuotaFija: 5665.16, tasaExcedente: 0.2352 },
  { limiteInferior: 55736.69, limiteSuperior: 106410.50, cuotaFija: 10457.09, tasaExcedente: 0.30 },
  { limiteInferior: 106410.51, limiteSuperior: 141880.66, cuotaFija: 25659.23, tasaExcedente: 0.32 },
  { limiteInferior: 141880.67, limiteSuperior: 425641.99, cuotaFija: 37009.69, tasaExcedente: 0.34 },
  { limiteInferior: 425642.00, limiteSuperior: Number.POSITIVE_INFINITY, cuotaFija: 133488.54, tasaExcedente: 0.35 },
];

const TARIFA_BIMESTRAL_RIF_2026: TramoISR[] = TARIFA_MENSUAL_ISR_2026.map((tramo) => ({
  limiteInferior: Math.round(tramo.limiteInferior * 2 * 100) / 100,
  limiteSuperior: tramo.limiteSuperior === Number.POSITIVE_INFINITY ? Number.POSITIVE_INFINITY : Math.round(tramo.limiteSuperior * 2 * 100) / 100,
  cuotaFija: Math.round(tramo.cuotaFija * 2 * 100) / 100,
  tasaExcedente: tramo.tasaExcedente,
}));

const centavos = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;

export default function Home() {
  const [regimen, setRegimen] = useState<"sueldos" | "resico" | "actividad" | "rif">("sueldos");

  const [ingresos, setIngresos] = useState<string>("");
  const [deducciones, setDeducciones] = useState<string>("");
  const [mesesTranscurridos, setMesesTranscurridos] = useState<number>(1);
  const [pagosProvisionalesPrevios, setPagosProvisionalesPrevios] = useState<string>("");
  const [honorariosPM, setHonorariosPM] = useState<string>("");
  const [aplicaRetencionRESICO, setAplicaRetencionRESICO] = useState<boolean>(false);
  const [anioRIF, setAnioRIF] = useState<number>(5);

  const numIngresos = parseFloat(ingresos) || 0;
  const numDeducciones = parseFloat(deducciones) || 0;
  const numPagosPrevios = parseFloat(pagosProvisionalesPrevios) || 0;
  const numHonorariosPM = parseFloat(honorariosPM) || 0;

  // CÁLCULOS
  const calcSueldos = () => {
    if (numIngresos < 0.01) return { isrTarifa: 0, subsidio: 0, isrRetener: 0 };
    const tramo = TARIFA_MENSUAL_ISR_2026.find((r) => numIngresos <= r.limiteSuperior)!;
    const isrTarifa = centavos(tramo.cuotaFija + (numIngresos - tramo.limiteInferior) * tramo.tasaExcedente);
    const subsidioElegible = numIngresos <= 10171;
    const subsidioDisponible = subsidioElegible ? centavos(3566.22 * 0.138) : 0;
    const subsidioAplicado = Math.min(isrTarifa, subsidioDisponible);
    return { isrTarifa, subsidio: subsidioAplicado, isrRetener: Math.max(0, centavos(isrTarifa - subsidioAplicado)) };
  };

  const calcResico = () => {
    if (numIngresos <= 0) return { tasaStr: "0%", isrMensual: 0, retencionPM: 0, isrNeto: 0 };
    const tramos = [
      { limite: 25000, tasa: 0.01, str: "1.00%" },
      { limite: 50000, tasa: 0.011, str: "1.10%" },
      { limite: 83333.33, tasa: 0.015, str: "1.50%" },
      { limite: 208333.33, tasa: 0.02, str: "2.00%" },
      { limite: 3500000, tasa: 0.025, str: "2.50%" },
    ];
    const tramo = tramos.find((r) => numIngresos <= r.limite);
    if (!tramo) return { tasaStr: "Excede tope mensual", isrMensual: 0, retencionPM: 0, isrNeto: 0 };
    const isrMensual = centavos(numIngresos * tramo.tasa);
    const retencionPM = aplicaRetencionRESICO ? centavos(numIngresos * 0.0125) : 0;
    return { tasaStr: tramo.str, isrMensual, retencionPM, isrNeto: Math.max(0, centavos(isrMensual - retencionPM)) };
  };

  const calcActividad = () => {
    const utilidadAcumulada = Math.max(0, numIngresos - numDeducciones);
    if (utilidadAcumulada <= 0) return { utilidadAcumulada: 0, isrAcumulado: 0, retencion10: 0, pagoProvisional: 0 };
    
    const m = Math.max(1, Math.min(12, mesesTranscurridos));
    const tarifaEscalada = TARIFA_MENSUAL_ISR_2026.map((t) => ({
      limiteInferior: centavos(t.limiteInferior * m),
      limiteSuperior: t.limiteSuperior === Number.POSITIVE_INFINITY ? Number.POSITIVE_INFINITY : centavos(t.limiteSuperior * m),
      cuotaFija: centavos(t.cuotaFija * m),
      tasaExcedente: t.tasaExcedente,
    }));

    const tramo = tarifaEscalada.find((r) => utilidadAcumulada <= r.limiteSuperior)!;
    const isrAcumulado = centavos(tramo.cuotaFija + (utilidadAcumulada - tramo.limiteInferior) * tramo.tasaExcedente);
    const retencion10 = centavos(numHonorariosPM * 0.10);
    const pagoProvisional = Math.max(0, centavos(isrAcumulado - numPagosPrevios - retencion10));

    return { utilidadAcumulada, isrAcumulado, retencion10, pagoProvisional };
  };

  const calcRIF = () => {
    const utilidadBimestral = Math.max(0, numIngresos - numDeducciones);
    if (utilidadBimestral <= 0) return { utilidadBimestral: 0, isrCausado: 0, porcReduccion: 0, isrPagar: 0 };
    const tramo = TARIFA_BIMESTRAL_RIF_2026.find((r) => utilidadBimestral <= r.limiteSuperior)!;
    const isrCausado = centavos(tramo.cuotaFija + (utilidadBimestral - tramo.limiteInferior) * tramo.tasaExcedente);
    const pctReduccion = (11 - Math.max(1, Math.min(10, anioRIF))) / 10;
    const isrPagar = centavos(isrCausado * (1 - pctReduccion));
    return { utilidadBimestral, isrCausado, porcReduccion: pctReduccion * 100, isrPagar };
  };

  const sueldosRes = calcSueldos();
  const resicoRes = calcResico();
  const actividadRes = calcActividad();
  const rifRes = calcRIF();

  // JSON-LD SCHEMA STRUCTURAL DATA
  const siteUrl = "https://calculadora-isr-mexico-livid.vercel.app";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "Calculadora ISR — ZG Group",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description:
          "Calculadora orientativa de ISR para personas físicas en México: sueldos y salarios, RESICO, actividad empresarial y RIF transitorio.",
        url: siteUrl,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "MXN",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "¿Cómo se calcula el ISR sobre el sueldo bruto?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Se ubica la base gravable mensual en el rango correspondiente de la tarifa del artículo 96 de la LISR. Se resta el límite inferior, se aplica la tasa marginal al excedente y se suma la cuota fija. El resultado puede modificarse por el subsidio para el empleo aplicable.",
            },
          },
          {
            "@type": "Question",
            name: "¿Qué retención aplica si facturo a una persona moral en RESICO?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Cuando se actualizan los supuestos del artículo 113-J de la LISR, la persona moral retiene 1.25% sobre el monto pagado sin incluir IVA. La retención se acredita contra el ISR correspondiente.",
            },
          },
          {
            "@type": "Question",
            name: "¿Esta calculadora sustituye una declaración ante el SAT?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Es una herramienta orientativa independiente y no sustituye la determinación individual del impuesto ni la presentación de declaraciones ante el SAT.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between font-sans antialiased">
        
        {/* NAVEGACIÓN Y CABECERA OFICIAL */}
        <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg sm:text-xl tracking-tight text-slate-900">
              <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-xs sm:text-sm font-black">MX</span>
              <span>Calculadora ISR — ZG Group</span>
            </Link>
            <nav className="flex gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-slate-600">
              <Link href="/" className="text-blue-600 font-semibold">Calculadora</Link>
              <Link href="/privacidad" className="hover:text-blue-600 transition">Aviso de Privacidad</Link>
              <Link href="/terminos" className="hover:text-blue-600 transition">Términos</Link>
            </nav>
          </div>
        </header>

        {/* CONTENIDO PRINCIPAL Y FORMULARIO */}
        <main className="flex-grow p-4 sm:p-8 flex flex-col items-center">
          <section className="max-w-3xl w-full text-center my-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Calculadora de ISR 2026 en México
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Calcula una estimación orientativa para sueldos y salarios, RESICO, actividad empresarial y RIF.
            </p>
          </section>

          <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8 mb-12">
            {/* Selector Desplegable */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Selecciona tu Régimen Fiscal
              </label>
              <select
                value={regimen}
                onChange={(e) => setRegimen(e.target.value as any)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="sueldos">Sueldos y Salarios (Art. 96 LISR)</option>
                <option value="resico">RESICO (Art. 113-E LISR)</option>
                <option value="actividad">Actividad Empresarial y Profesional (Art. 106 LISR)</option>
                <option value="rif">RIF (Régimen Transitorio Art. 111 LISR)</option>
              </select>
            </div>

            {/* Formulario */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  {regimen === "sueldos" && "Ingreso Mensual Bruto Gravable (MXN)"}
                  {regimen === "resico" && "Ingreso Mensual Cobrado sin IVA (MXN)"}
                  {regimen === "actividad" && "Ingresos Acumulados del Ejercicio sin IVA (MXN)"}
                  {regimen === "rif" && "Ingresos del Bimestre sin IVA (MXN)"}
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={ingresos}
                  onChange={(e) => setIngresos(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {(regimen === "actividad" || regimen === "rif") && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    {regimen === "actividad" ? "Deducciones Autorizadas Acumuladas (MXN)" : "Deducciones Autorizadas del Bimestre (MXN)"}
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={deducciones}
                    onChange={(e) => setDeducciones(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {regimen === "actividad" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Meses Transcurridos</label>
                      <select
                        value={mesesTranscurridos}
                        onChange={(e) => setMesesTranscurridos(parseInt(e.target.value))}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                      >
                        {[...Array(12)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>{i + 1} ({["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"][i]})</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Honorarios PM (sin IVA)</label>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={honorariosPM}
                        onChange={(e) => setHonorariosPM(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Pagos Provisionales Previos (MXN)</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={pagosProvisionalesPrevios}
                      onChange={(e) => setPagosProvisionalesPrevios(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                    />
                  </div>
                </>
              )}

              {regimen === "resico" && (
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <input
                    type="checkbox"
                    id="retRESICO"
                    checked={aplicaRetencionRESICO}
                    onChange={(e) => setAplicaRetencionRESICO(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <label htmlFor="retRESICO" className="text-xs text-slate-600 font-medium cursor-pointer">
                    Aplica retención del 1.25% (Facturación a Persona Moral)
                  </label>
                </div>
              )}

              {regimen === "rif" && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Año de Permanencia en el RIF</label>
                  <select
                    value={anioRIF}
                    onChange={(e) => setAnioRIF(parseInt(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>Año {i + 1} (Reducción {(11 - (i + 1)) * 10}%)</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Resultados */}
            <div className="bg-slate-900 text-white rounded-xl p-5 space-y-3">
              {regimen === "sueldos" && (
                <>
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>ISR según Tarifa Art. 96:</span>
                    <span>${sueldosRes.isrTarifa.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>Subsidio al Empleo Aplicado:</span>
                    <span className="text-green-400">-${sueldosRes.subsidio.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-2 border-t border-slate-800 text-red-400">
                    <span>ISR Estimado a Retener:</span>
                    <span>-${sueldosRes.isrRetener.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
                  </div>
                </>
              )}

              {regimen === "resico" && (
                <>
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>Tasa Aplicable:</span>
                    <span>{resicoRes.tasaStr}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>Retención Persona Moral (1.25%):</span>
                    <span className="text-green-400">-${resicoRes.retencionPM.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-2 border-t border-slate-800 text-red-400">
                    <span>ISR Estimado a Pagar:</span>
                    <span>-${resicoRes.isrNeto.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
                  </div>
                </>
              )}

              {regimen === "actividad" && (
                <>
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>Utilidad Acumulada:</span>
                    <span>${actividadRes.utilidadAcumulada.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>ISR Acumulado:</span>
                    <span>${actividadRes.isrAcumulado.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>Retención 10% Honorarios PM:</span>
                    <span className="text-green-400">-${actividadRes.retencion1
