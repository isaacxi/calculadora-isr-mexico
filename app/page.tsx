"use client";

import React, { useState } from "react";

// --- TIPOS Y TABLA DE ISR 2026 (ART. 96 LISR) ---
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

const redondearCentavos = (cantidad: number) =>
  Math.round((cantidad + Number.EPSILON) * 100) / 100;

export default function Home() {
  const [activeTab, setActiveTab] = useState<"sueldos" | "resico">("sueldos");
  const [ingreso, setIngreso] = useState<string>("");
  const [aplicaRetencionPM, setAplicaRetencionPM] = useState<boolean>(false);

  const numIngreso = parseFloat(ingreso) || 0;

  // --- MOTOR DE CÁLCULO SUELDOS Y SALARIOS ---
  const calcularSueldos = (base: number) => {
    if (base < 0.01)
      return { isrTarifa: 0, subsidioAplicado: 0, isrRetener: 0, limiteInferior: 0, tasaExcedente: 0 };

    const tramo = TARIFA_MENSUAL_ISR_2026.find((r) => base <= r.limiteSuperior)!;
    const excedente = base - tramo.limiteInferior;
    const impuestoExcedente = excedente * tramo.tasaExcedente;
    const isrTarifa = redondearCentavos(tramo.cuotaFija + impuestoExcedente);

    // Subsidio al empleo (UMA mensual estimada)
    const subsidioElegible = base <= 10171;
    const umaMensual = 3566.22;
    const subsidioDisponible = subsidioElegible ? redondearCentavos(umaMensual * 0.138) : 0;
    const subsidioAplicado = Math.min(isrTarifa, subsidioDisponible);

    return {
      isrTarifa,
      subsidioAplicado: redondearCentavos(subsidioAplicado),
      isrRetener: redondearCentavos(Math.max(0, isrTarifa - subsidioAplicado)),
      limiteInferior: tramo.limiteInferior,
      tasaExcedente: tramo.tasaExcedente * 100,
    };
  };

  // --- MOTOR DE CÁLCULO RESICO ---
  const calcularResico = (base: number, esPersonaMoral: boolean) => {
    if (base <= 0)
      return { tasaStr: "0%", isrMensual: 0, retencionPM: 0, isrNetoPagar: 0, dentroDeTabla: true };

    const tramos = [
      { limite: 25000, tasa: 0.01, str: "1.00%" },
      { limite: 50000, tasa: 0.011, str: "1.10%" },
      { limite: 83333.33, tasa: 0.015, str: "1.50%" },
      { limite: 208333.33, tasa: 0.02, str: "2.00%" },
      { limite: 3500000, tasa: 0.025, str: "2.50%" },
    ];

    const tramo = tramos.find((r) => base <= r.limite);

    if (!tramo) {
      return { tasaStr: "Excede límite", isrMensual: 0, retencionPM: 0, isrNetoPagar: 0, dentroDeTabla: false };
    }

    const isrMensual = redondearCentavos(base * tramo.tasa);
    const retencionPM = esPersonaMoral ? redondearCentavos(base * 0.0125) : 0;
    const isrNetoPagar = Math.max(0, redondearCentavos(isrMensual - retencionPM));

    return {
      tasaStr: tramo.str,
      isrMensual,
      retencionPM,
      isrNetoPagar,
      dentroDeTabla: true,
    };
  };

  const sueldosRes = calcularSueldos(numIngreso);
  const resicoRes = calcularResico(numIngreso, aplicaRetencionPM);

  const isrFinal = activeTab === "sueldos" ? sueldosRes.isrRetener : resicoRes.isrNetoPagar;
  const ingresoNeto = Math.max(0, redondearCentavos(numIngreso - isrFinal));

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-8 flex flex-col items-center">
      <header className="max-w-xl w-full text-center my-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Calculadora ISR México 🇲🇽
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Calculadora fiscal auditada basada en las tablas vigentes del SAT (Art. 96 y 113-E LISR).
        </p>
      </header>

      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8">
        {/* Selector de Régimen */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
          <button
            onClick={() => setActiveTab("sueldos")}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              activeTab === "sueldos"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Sueldos y Salarios
          </button>
          <button
            onClick={() => setActiveTab("resico")}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              activeTab === "resico"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            RESICO (Persona Física)
          </button>
        </div>

        {/* Input de Ingresos */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            {activeTab === "sueldos"
              ? "Ingreso Mensual Bruto Gravable (MXN)"
              : "Ingreso Mensual Cobrado sin IVA (MXN)"}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              $
            </span>
            <input
              type="number"
              placeholder="0.00"
              value={ingreso}
              onChange={(e) => setIngreso(e.target.value)}
              className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-semibold text-slate-800"
            />
          </div>
        </div>

        {/* Opción adicional para RESICO */}
        {activeTab === "resico" && (
          <div className="mb-6 flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <input
              type="checkbox"
              id="retencionPM"
              checked={aplicaRetencionPM}
              onChange={(e) => setAplicaRetencionPM(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
            <label htmlFor="retencionPM" className="text-xs text-slate-600 font-medium cursor-pointer">
              Facturo a Persona Moral (Aplica retención del 1.25% de ISR)
            </label>
          </div>
        )}

        {/* Panel de Resultados */}
        <div className="bg-slate-900 text-white rounded-xl p-5 space-y-3">
          <div className="flex justify-between items-center text-sm text-slate-300">
            <span>Régimen</span>
            <span className="font-semibold text-blue-400">
              {activeTab === "sueldos" ? "Sueldos y Salarios" : "RESICO"}
            </span>
          </div>

          {activeTab === "sueldos" ? (
            <>
              <div className="flex justify-between items-center text-sm text-slate-300">
                <span>ISR según Tarifa Art. 96</span>
                <span className="font-semibold text-slate-200">
                  ${sueldosRes.isrTarifa.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                </span>
              </div>
              {sueldosRes.subsidioAplicado > 0 && (
                <div className="flex justify-between items-center text-sm text-slate-300">
                  <span>Subsidio al Empleo Aplicado</span>
                  <span className="font-semibold text-green-400">
                    -${sueldosRes.subsidioAplicado.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex justify-between items-center text-sm text-slate-300">
                <span>Tasa Aplicable</span>
                <span className="font-semibold">{resicoRes.tasaStr}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-slate-300">
                <span>ISR Causado del Mes</span>
                <span className="font-semibold text-slate-200">
                  ${resicoRes.isrMensual.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                </span>
              </div>
              {aplicaRetencionPM && (
                <div className="flex justify-between items-center text-sm text-slate-300">
                  <span>Retención PM (1.25%)</span>
                  <span className="font-semibold text-green-400">
                    -${resicoRes.retencionPM.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              )}
            </>
          )}

          <div className="flex justify-between items-center text-sm text-slate-300 pt-2 border-t border-slate-800">
            <span>ISR a Retener / Pagar</span>
            <span className="font-semibold text-red-400">
              -${isrFinal.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
            <span className="font-bold text-base">Ingreso Neto Estimado</span>
            <span className="text-xl font-extrabold text-green-400">
              ${ingresoNeto.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Espacio para AdSense */}
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
          Simulación fiscal informativa basada en las tablas del Anexo 8 de la RMF y Art. 96 / 113-E de la LISR.
        </p>
      </footer>
    </main>
  );
}
