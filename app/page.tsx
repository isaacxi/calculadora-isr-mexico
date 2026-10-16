"use client";

import React, { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"sueldos" | "resico">("sueldos");
  const [ingreso, setIngreso] = useState<string>("");

  const numIngreso = parseFloat(ingreso) || 0;

  // Lógica ISR - Sueldos y Salarios (Estimado)
  const calcularISRSueldos = (monto: number) => {
    if (monto <= 0) return 0;
    if (monto <= 7468) return monto * 0.0192;
    if (monto <= 63320) return monto * 0.064;
    if (monto <= 111549) return monto * 0.1088;
    if (monto <= 260588) return monto * 0.16;
    return monto * 0.235;
  };

  // Lógica ISR - RESICO Personas Físicas (SAT México)
  const calcularISRResico = (monto: number) => {
    if (monto <= 0) return { tasa: "0%", impuesto: 0 };
    if (monto <= 25000) return { tasa: "1.00%", impuesto: monto * 0.01 };
    if (monto <= 50000) return { tasa: "1.10%", impuesto: monto * 0.011 };
    if (monto <= 83333) return { tasa: "1.50%", impuesto: monto * 0.015 };
    if (monto <= 208333) return { tasa: "2.00%", impuesto: monto * 0.02 };
    if (monto <= 291666) return { tasa: "2.50%", impuesto: monto * 0.025 };
    return { tasa: "Excede límite RESICO", impuesto: 0 };
  };

  const isrSueldos = calcularISRSueldos(numIngreso);
  const resicoResult = calcularISRResico(numIngreso);

  const isrCalculado =
    activeTab === "sueldos" ? isrSueldos : resicoResult.impuesto;
  const netoCalculado = Math.max(0, numIngreso - isrCalculado);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-8 flex flex-col items-center">
      {/* Header / SEO Title */}
      <header className="max-w-xl w-full text-center my-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Calculadora ISR México 🇲🇽
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Calcula de forma rápida tu ISR estimado para Sueldos & Salarios y RESICO.
        </p>
      </header>

      {/* Main Card Container */}
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8">
        {/* Navigation Tabs */}
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

        {/* Input Field */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Ingreso Mensual Bruto (MXN)
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

        {/* Results Panel */}
        <div className="bg-slate-900 text-white rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center text-sm text-slate-300">
            <span>Régimen Seleccionado</span>
            <span className="font-semibold text-blue-400">
              {activeTab === "sueldos" ? "Sueldos y Salarios" : "RESICO"}
            </span>
          </div>

          {activeTab === "resico" && (
            <div className="flex justify-between items-center text-sm text-slate-300">
              <span>Tasa Aplicable</span>
              <span className="font-semibold">{resicoResult.tasa}</span>
            </div>
          )}

          <div className="flex justify-between items-center text-sm text-slate-300">
            <span>Retención / Impuesto Estimado (ISR)</span>
            <span className="font-semibold text-red-400">
              -${isrCalculado.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
            <span className="font-bold text-base">Ingreso Neto Estimado</span>
            <span className="text-xl font-extrabold text-green-400">
              ${netoCalculado.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Placeholder para Google AdSense */}
        <div className="mt-8 p-4 border border-dashed border-slate-300 rounded-xl text-center bg-slate-50">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">
            Anuncio / Publicidad
          </span>
          <div className="h-16 flex items-center justify-center text-slate-400 text-xs mt-1">
            Espacio reservado para banner de Google AdSense
          </div>
        </div>
      </div>

      {/* Footer / SEO Info */}
      <footer className="max-w-xl w-full text-center mt-8 text-xs text-slate-400">
        <p>
          Herramienta de simulación fiscal informativa basada en las tablas
          vigentes del SAT México.
        </p>
      </footer>
    </main>
  );
}
