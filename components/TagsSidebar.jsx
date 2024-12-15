import React, { useState } from "react";
import Link from "next/link";
import { MinusCircle, PlusCircle } from "@phosphor-icons/react";

const TagsSidebar = ({ posts }) => {
  const tagCountMap = (posts || []).reduce((acc, post) => {
    const { category } = post;

    if (category) {
      const tags = category.split(",").map((tag) => tag.trim());
      tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
    }
    return acc;
  }, {});

  // Limite inicial de itens exibidos
  const initialLimit = 100;
  const [showAll, setShowAll] = useState(false);

  // Manipulador para alternar o estado de exibição
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  // Itens a serem exibidos, dependendo do estado
  const itemsToShow = showAll
    ? Object.entries(tagCountMap)
    : Object.entries(tagCountMap).slice(0, initialLimit);

  return (
    <div className="tags ">
     <h2 className="text-brown my-9 text-2xl border-s-4 border-[#ff6790] pl-4">Categorys</h2>

      <div className=" flex flex-wrap gap-2">
        {itemsToShow.map(([tag, count]) => (
          <span
            key={tag}
            className="text-sm px-2 bg-brown/5 text-brown border-1 border-brown/40 shadow-sm  rounded-lg  hover:bg-brown/30 "
          >
            <Link href={`/Categorys/${tag}`}>{tag}</Link>
          </span>
        ))}

 
      </div>
             {/* Botão para expandir ou recolher a lista */}
             {Object.entries(tagCountMap).length > initialLimit && (
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

export default TagsSidebar;
