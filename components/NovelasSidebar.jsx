import React, { useState } from "react";
import Link from "next/link";
import { formatString } from "../utils/formatString";
import { PlusCircle, MinusCircle } from "@phosphor-icons/react";
const Novelas = ({ posts }) => {
  // Verifica se posts é um array; se não for, define como um array vazio
  const novelaCountMap = (posts || []).reduce((acc, post) => {
    const { novela } = post;
    acc[novela] = (acc[novela] || 0) + 1;
    return acc;
  }, {});

  // Limite inicial de itens exibidos
  const initialLimit = 7;
  const [showAll, setShowAll] = useState(false);

  // Manipulador para alternar o estado de exibição
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  // Itens a serem exibidos, dependendo do estado
  const itemsToShow = showAll
    ? Object.entries(novelaCountMap)
    : Object.entries(novelaCountMap).slice(0, initialLimit);

  return (
    <div className="novelas">
      <h2 className="text-2xl text-brown my-9">Livros</h2>
      <ul className="space-y-3">
        {itemsToShow.map(([novela, count]) => (
          <li key={novela} className="flex justify-between items-center">
            <Link
              href={`/Fanfics/${formatString(novela)}`}
              className="text-left w-4/5 hover:bg-brown/70 hover:text-white hover:rounded-lg p-1"
            >
              {novela}
            </Link>
            <span className="bg-brown/10 text-primary rounded-md w-7 h-7 flex items-center justify-center">
              {count}
            </span>
          </li>
        ))}
      </ul>
      {/* Botão para expandir ou recolher a lista */}
      {Object.entries(novelaCountMap).length > initialLimit && (
        <button
          onClick={toggleShowAll}
          className=" hover:underline mt-5 flex mx-auto text-brown/80"
        >
          {showAll ? <MinusCircle  size={32} /> : < PlusCircle size={32} />}
        </button>
      )}
    </div>
  );
};

export default Novelas;
