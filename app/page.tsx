"use client";

import React, { useState } from "react";

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

// Tarifa Bimestral estimada para RIF (Escalada a 2 meses)
const TARIFA_BIMESTRAL_RIF_2026: TramoISR[] = TARIFA_MENSUAL_ISR_2026.map((tramo) => ({
  limiteInferior: Math.round(tramo.limiteInferior * 2 * 100) / 100,
  limiteSuperior: tramo.limiteSuperior === Number.POSITIVE_INFINITY ? Number.POSITIVE_INFINITY : Math.round(tramo.limiteSuperior * 2 * 100) / 100,
  cuotaFija: Math.round(tramo.cuotaFija * 2 * 100) / 100,
  tasaExcedente: tramo.tasaExcedente,
}));

const centavos = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;

export default function Home() {
  const [regimen, setRegimen] = useState<"sueldos" | "resico" | "actividad" | "rif">("sueldos");

  // Inputs generales y acumulados
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

  // --- MOTOR 1: SUELDOS Y SALARIOS ---
  const calcSueldos = () => {
    if (numIngresos < 0.01) return { isrTarifa: 0, subsidio: 0, isrRetener: 0 };
    const tramo = TARIFA_MENSUAL_ISR_2026.find((r) => numIngresos <= r.limiteSuperior)!;
    const isrTarifa = centavos(tramo.cuotaFija + (numIngresos - tramo.limiteInferior) * tramo.tasaExcedente);
    const subsidioElegible = numIngresos <= 10171;
    const subsidioDisponible = subsidioElegible ? centavos(3566.22 * 0.138) : 0;
    const subsidioAplicado = Math.min(isrTarifa, subsidioDisponible);
    return { isrTarifa, subsidio: subsidioAplicado, isrRetener: Math.max(0, centavos(isrTarifa - subsidioAplicado)) };
  };

  // --- MOTOR 2: RESICO ---
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
    if (!tramo) return { tasaStr: "Excede límite", isrMensual: 0, retencionPM: 0, isrNeto: 0 };
    const isrMensual = centavos(numIngresos * tramo.tasa);
    const retencionPM = aplicaRetencionRESICO ? centavos(numIngresos * 0.0125) : 0;
    return { tasaStr: tramo.str, isrMensual, retencionPM, isrNeto: Math.max(0, centavos(isrMensual - retencionPM)) };
  };

  // --- MOTOR 3: ACTIVIDAD EMPRESARIAL Y PROFESIONAL ---
  const calcActividad = () => {
    const utilidadAcumulada = Math.max(0, numIngresos - numDeducciones);
    if (utilidadAcumulada <= 0) return { utilidadAcumulada: 0, isrAcumulado: 0, retencion10: 0, pagoProvisional: 0 };
    
    // Escalar tarifa por número de meses (1 a 12)
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

  // --- MOTOR 4: RIF ---
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

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-8 flex flex-col items-center">
      <header className="max-w-xl w-full text-center my-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Calculadora ISR México 🇲🇽
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Simulador multicálculo para Personas Físicas (SAT México - LISR 2026).
        </p>
      </header>

      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8">
        {/* Selector Desplegable de Régimen */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Selecciona tu Régimen Fiscal
          </label>
          <select
            value={regimen}
            onChange={(e) => setRegimen(e.target.value as any)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="sueldos">Sueldos y Salarios (Asalariados)</option>
            <option value="resico">RESICO (Régimen Simplificado de Confianza)</option>
            <option value="actividad">Actividad Empresarial y Profesional (Honorarios / Negocio)</option>
            <option value="rif">RIF (Régimen de Incorporación Fiscal - Transitorio)</option>
          </select>
        </div>

        {/* Formulario Dinámico */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              {regimen === "sueldos" && "Ingreso Mensual Bruto (MXN)"}
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
                Facturo a Persona Moral (Retención 1.25% ISR)
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

        {/* Panel de Resultados */}
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
                <span>ISR a Retener:</span>
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
                <span>ISR Neto a Pagar:</span>
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
                <span className="text-green-400">-${actividadRes.retencion10.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-2 border-t border-slate-800 text-red-400">
                <span>Pago Provisional del Mes:</span>
                <span>-${actividadRes.pagoProvisional.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
              </div>
            </>
          )}

          {regimen === "rif" && (
            <>
              <div className="flex justify-between text-sm text-slate-300">
                <span>Utilidad Bimestral:</span>
                <span>${rifRes.utilidadBimestral.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-300">
                <span>ISR Causado:</span>
                <span>${rifRes.isrCausado.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-300">
                <span>Porcentaje de Reducción:</span>
                <span className="text-green-400">{rifRes.porcReduccion}%</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-2 border-t border-slate-800 text-red-400">
                <span>ISR Bimestral con Descuento:</span>
                <span>-${rifRes.isrPagar.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
              </div>
            </>
          )}
        </div>

        {/* AdSense Placeholder */}
        <div className="mt-8 p-4 border border-dashed border-slate-300 rounded-xl text-center bg-slate-50">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">
            Anuncio / Publicidad
          </span>
          <div className="h-16 flex items-center justify-center text-slate-400 text-xs mt-1">
            Espacio reservado para Google AdSense
          </div>
        </div>
      </div>

      <footer className="max-w-xl w-full text-center mt-8 text-xs text-slate-400">
        <p>
          Herramienta de simulación fiscal orientativa basada en la Ley del Impuesto sobre la Renta (LISR) vigente en México.
        </p>
      </footer>
    </main>
  );
}
