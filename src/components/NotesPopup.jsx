import React, { useState, useEffect } from "react";

export default function NotesPopup() {
  const [aberto, setAberto] = useState(false);
  const [anotacao, setAnotacao] = useState("");

  useEffect(() => {
    const notaSalva = localStorage.getItem("anotacaoAlbion");
    if (notaSalva) setAnotacao(notaSalva);
  }, []);

  useEffect(() => {
    localStorage.setItem("anotacaoAlbion", anotacao);
  }, [anotacao]);

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setAberto(!aberto)}
        className="fixed bottom-6 right-6 z-50 bg-amber-500 hover:bg-amber-400 text-slate-900 px-4 py-3 rounded-full shadow-xl transition duration-300 flex items-center gap-2 text-sm md:text-base font-semibold"
      >
        {aberto ? "✖ Fechar" : "📝 Anotações"}
      </button>

      {/* Janela de notas */}
      {aberto && (
        <div className="fixed bottom-24 right-6 w-96 bg-slate-800 text-white rounded-xl shadow-2xl p-5 z-40 border border-amber-600">
          <h3 className="text-xl font-bold text-amber-300 mb-3 font-serif">Minhas Anotações</h3>
          <textarea
            value={anotacao}
            onChange={(e) => setAnotacao(e.target.value)}
            placeholder="Escreva suas notas aqui..."
            className="w-full h-60 p-3 rounded-lg bg-slate-900 border border-amber-600 text-sm text-amber-100 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
          />
        </div>
      )}
    </>
  );
}
