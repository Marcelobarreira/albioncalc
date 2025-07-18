import React, { useState } from "react";

function calcularRetorno(materialUsado, porcentagem) {
  let total = 0;
  let atual = materialUsado;
  const pct = porcentagem / 100;

  while (atual > 0.01) {
    atual = atual * pct;
    total += atual;
  }

  return total.toFixed(2);
}

const armasAlbion = [
  { nome: "Espada T4", id: "T4_MAIN_SWORD" },
  { nome: "Machado T4", id: "T4_MAIN_AXE" },
  { nome: "Lança T4", id: "T4_MAIN_SPEAR" },
  { nome: "Cajado de Fogo T4", id: "T4_MAIN_FIRESTAFF" },
  { nome: "Cajado Arcano T4", id: "T4_MAIN_ARCANESTAFF" },
  { nome: "Cajado Sagrado T4", id: "T4_MAIN_HOLYSTAFF" },
  { nome: "Arco T4", id: "T4_MAIN_BOW" },
  { nome: "Adaga T4", id: "T4_MAIN_DAGGER" },
  { nome: "Besta T4", id: "T4_MAIN_CROSSBOW" },
  { nome: "Martelo T4", id: "T4_MAIN_HAMMER" },
  { nome: "Maça T4", id: "T4_MAIN_MACE" },
  { nome: "Orbe Maldito T4", id: "T4_MAIN_CURSEDSTAFF" },
  { nome: "Cajado Gélido T4", id: "T4_MAIN_FROSTSTAFF" },
  { nome: "Cajado da Natureza T4", id: "T4_MAIN_NATURESTAFF" },
  { nome: "Cajado das Sombras T4", id: "T4_MAIN_SHADOWSTAFF" },
];

export default function CraftCalculator() {
  const [disp1, setDisp1] = useState(0);
  const [disp2, setDisp2] = useState(0);
  const [custo1, setCusto1] = useState(1);
  const [custo2, setCusto2] = useState(1);
  const [retorno, setRetorno] = useState(10);
  const [itemId, setItemId] = useState("T4_MAIN_SWORD");
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
    const usaSegundoMaterial = disp2 > 0 && custo2 > 0;

    const armasMat1 = Math.floor(disp1 / custo1);
    const armasMat2 = usaSegundoMaterial ? Math.floor(disp2 / custo2) : Infinity;
    const armasPossiveis = Math.min(armasMat1, armasMat2);

    const total1 = armasPossiveis * custo1;
    const total2 = usaSegundoMaterial ? armasPossiveis * custo2 : 0;

    const retorno1 = calcularRetorno(total1, retorno);
    const retorno2 = usaSegundoMaterial ? calcularRetorno(total2, retorno) : "—";

    setResultado({
      armas: armasPossiveis,
      usado1: total1,
      usado2: usaSegundoMaterial ? total2 : null,
      retorno1,
      retorno2,
      unico: !usaSegundoMaterial,
    });
  };

  return (
    <section className="py-12 px-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white min-h-screen">
      <h2 className="text-4xl font-bold mb-10 text-center font-serif tracking-wide text-amber-400 drop-shadow">
        Calculadora de Craft
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
        {[
          { label: "Qtd. Material 1", value: disp1, set: setDisp1 },
          { label: "Qtd. Material 2", value: disp2, set: setDisp2 },
          { label: "% de Retorno", value: retorno, set: setRetorno },
          { label: "Custo Material 1", value: custo1, set: setCusto1 },
          { label: "Custo Material 2", value: custo2, set: setCusto2 },
        ].map(({ label, value, set }) => (
          <div key={label}>
            <label className="block text-amber-300 font-serif text-lg mb-1">{label}</label>
            <input
              type="number"
              value={value}
              onChange={(e) => set(+e.target.value)}
              className="w-full p-3 rounded-lg border border-amber-600 bg-slate-700 text-white placeholder:text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-md"
            />
          </div>
        ))}

        <div>
          <label className="block text-amber-300 font-serif text-lg mb-1">Escolha a Arma</label>
          <select
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            className="w-full p-3 rounded-lg border border-amber-600 bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-md"
          >
            {armasAlbion.map((arma) => (
              <option key={arma.id} value={arma.id} className="bg-slate-800 text-white">
                {arma.nome}
              </option>
            ))}
          </select>

          <div className="mt-4 text-center">
            <img
              src={`https://render.albiononline.com/v1/item/${itemId}.png`}
              alt="Ícone da Arma"
              className="mx-auto w-14 h-14 drop-shadow"
            />
            <p className="text-amber-300 text-sm mt-1">{itemId}</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={calcular}
          className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold rounded-full shadow-lg transition duration-300"
        >
          Calcular
        </button>
      </div>

      {resultado && (
        <div className="mt-12 text-center space-y-4 text-xl text-amber-200">
          <img
            src={`https://render.albiononline.com/v1/item/${itemId}.png`}
            alt="Ícone da Arma"
            className="mx-auto w-20 h-20"
          />
          <p><strong>Armas possíveis:</strong> {resultado.armas}</p>
          <p>Material 1 usado: <strong>{resultado.usado1}</strong> → Retorno: <strong>{resultado.retorno1}</strong></p>
          {!resultado.unico && (
            <p>Material 2 usado: <strong>{resultado.usado2}</strong> → Retorno: <strong>{resultado.retorno2}</strong></p>
          )}
        </div>
      )}
    </section>
  );
}
