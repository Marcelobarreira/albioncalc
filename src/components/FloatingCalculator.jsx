import React, { useState } from "react";

export default function FloatingCalculator() {
  const [aberto, setAberto] = useState(false);
  const [entrada, setEntrada] = useState("");

  const adicionar = (valor) => setEntrada((prev) => prev + valor);
  const limpar = () => setEntrada("");
  const calcular = () => {
    try {
      setEntrada(eval(entrada).toString());
    } catch {
      setEntrada("Erro");
    }
  };

  return (
    <>
      {/* Botão flutuante à esquerda */}
      <button
        onClick={() => setAberto(!aberto)}
        className="fixed bottom-6 left-6 z-50 bg-amber-500 hover:bg-amber-400 text-slate-900 px-4 py-3 rounded-full shadow-xl transition duration-300 flex items-center gap-2 text-sm md:text-base font-semibold"
      >
        {aberto ? "✖ Fechar" : "🧮 Calculadora"}
      </button>

      {/* Janela da calculadora à esquerda */}
      {aberto && (
        <div className="fixed bottom-24 left-6 w-80 bg-slate-800 text-white rounded-xl shadow-2xl p-5 z-40 border border-amber-600">
          <h3 className="text-xl font-bold text-amber-300 mb-3 font-serif">Calculadora Rápida</h3>

          <input
            type="text"
            value={entrada}
            readOnly
            className="w-full mb-4 p-3 rounded bg-slate-900 border border-amber-600 text-amber-100 text-lg text-right"
          />

          <div className="grid grid-cols-4 gap-2">
            {["7", "8", "9", "/",
              "4", "5", "6", "*",
              "1", "2", "3", "-",
              "0", ".", "C", "+"].map((btn) => (
              <button
                key={btn}
                onClick={() => btn === "C" ? limpar() : adicionar(btn)}
                className="bg-slate-700 hover:bg-slate-600 text-amber-100 p-3 rounded font-bold"
              >
                {btn}
              </button>
            ))}
            <button
              onClick={calcular}
              className="col-span-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold p-3 rounded mt-2"
            >
              =
            </button>
          </div>
        </div>
      )}
    </>
  );
}
