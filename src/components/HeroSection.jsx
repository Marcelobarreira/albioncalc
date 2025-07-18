import React, { useState } from "react";

// Lógica de reaproveitamento com retorno em loop
function simularCraft(materialInicial, custoPorArma, taxaRetorno) {
  let totalArmas = 0;
  let materialDisponivel = materialInicial;
  const pct = taxaRetorno / 100;

  while (materialDisponivel >= custoPorArma) {
    const armasFeitas = Math.floor(materialDisponivel / custoPorArma);
    const usado = armasFeitas * custoPorArma;
    const retorno = usado * pct;

    totalArmas += armasFeitas;
    materialDisponivel = materialDisponivel - usado + retorno;
  }

  return {
    armas: totalArmas,
    usado: materialInicial - materialDisponivel,
    sobra: materialDisponivel.toFixed(2),
  };
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
  const [valorMat1, setValorMat1] = useState(0);
  const [valorMat2, setValorMat2] = useState(0);
  const [valorVendaItem, setValorVendaItem] = useState(0);
  const [itemId, setItemId] = useState("T4_MAIN_SWORD");
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
  const usaSegundoMaterial = disp2 > 0 && custo2 > 0;

  const mat1 = simularCraft(disp1, custo1, retorno);
  const mat2 = usaSegundoMaterial
    ? simularCraft(disp2, custo2, retorno)
    : { armas: Infinity, usado: 0, sobra: 0 };

  const armasPossiveis = Math.min(mat1.armas, mat2.armas);

  const usado1 = armasPossiveis * custo1;
  const usado2 = usaSegundoMaterial ? armasPossiveis * custo2 : 0;

  const retorno1 = usado1 * (retorno / 100);
  const retorno2 = usado2 * (retorno / 100);

  const custoTotal =
  disp1 * valorMat1 + (usaSegundoMaterial ? disp2 * valorMat2 : 0);


  const ganhoTotal = armasPossiveis * valorVendaItem;
  const lucro = ganhoTotal - custoTotal;

  setResultado({
    armas: armasPossiveis,
    usado1,
    usado2: usaSegundoMaterial ? usado2 : null,
    retorno1: retorno1.toFixed(2),
    retorno2: usaSegundoMaterial ? retorno2.toFixed(2) : "—",
    custoTotal: custoTotal.toFixed(2),
    receitaTotal: ganhoTotal.toFixed(2),
    lucro: lucro.toFixed(2),
    unico: !usaSegundoMaterial,
    sobra1: mat1.sobra,
    sobra2: usaSegundoMaterial ? mat2.sobra : "—",
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
          { label: "Custo por Arma (Mat 1)", value: custo1, set: setCusto1 },
          { label: "Custo por Arma (Mat 2)", value: custo2, set: setCusto2 },
          { label: "% de Retorno", value: retorno, set: setRetorno },
          { label: "Valor unitário Material 1", value: valorMat1, set: setValorMat1 },
          { label: "Valor unitário Material 2", value: valorMat2, set: setValorMat2 },
          { label: "Valor de Venda do Item", value: valorVendaItem, set: setValorVendaItem },
        ].map(({ label, value, set }) => (
          <div key={label}>
            <label className="block text-amber-300 font-serif text-lg mb-1">{label}</label>
            <input
              type="number"
              value={value}
              onChange={(e) => set(+e.target.value)}
              className="w-full p-3 rounded-lg border border-amber-600 bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-md"
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
          <p>Material 1 usado: <strong>{resultado.usado1}</strong> → Retorno: <strong>{resultado.retorno1}</strong> → Sobra: <strong>{resultado.sobra1}</strong></p>
          {!resultado.unico && (
            <p>Material 2 usado: <strong>{resultado.usado2}</strong> → Retorno: <strong>{resultado.retorno2}</strong> → Sobra: <strong>{resultado.sobra2}</strong></p>
          )}
          <hr className="my-4 border-amber-700" />
          <p><strong>Custo Total:</strong> {resultado.custoTotal}</p>
          <p><strong>Receita Total:</strong> {resultado.receitaTotal}</p>
          <p><strong>Lucro Líquido:</strong> <span className={resultado.lucro >= 0 ? "text-green-400" : "text-red-400"}>{resultado.lucro}</span></p>
        </div>
      )}
    </section>
  );
}
