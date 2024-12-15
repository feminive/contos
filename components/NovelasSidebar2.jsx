import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import Link from "next/link";
import { formatString } from "../utils/formatString";
import { PlusCircle, MinusCircle } from "@phosphor-icons/react";
import { useState } from "react";

const Novelas = ({ posts }) => {
  const novelaCountMap = (posts || []).reduce((acc, post) => {
    const { novela } = post;
    acc[novela] = (acc[novela] || 0) + 1;
    return acc;
  }, {});

  const initialLimit = 10; // Limite inicial de itens 
  const [showAll, setShowAll] = useState(false);

  
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const itemsToShow = showAll
    ? Object.entries(novelaCountMap)
    : Object.entries(novelaCountMap).slice(0, initialLimit);

    return (
      <div className="novelas">
     <h2 className="text-brown my-9 text-2xl border-s-4 border-[#ff6790] pl-4">Novela</h2>
     <div className="grid grid-cols-2 gap-2">
          {itemsToShow.map(([novela, count]) => {
            // Encontra os posts relacionados à novela
            const post = posts.find(p => p.novela === novela);
            return (

              <Link
              href={`/Fanfics/${post.novelaSlug}`}
              className="flex text-bold  w-full "key={novela} 
            >
              <Card
                isFooterBlurred
                radius="lg"
                key={novela}
                isHoverable={true}
                className="group hover:cursor-pointer shadow-md relative mx-auto" 
              >
                <Image
                  alt={novela}
                  className="object-cover"
                  height={125}
                  src={`/${post.img}`}
                  width={125}
                />
              <CardFooter
                className="group-hover:block hidden before:bg-white/10 overflow-hidden absolute before:rounded-lg rounded-large w-full h-full shadow-sm z-10  justify-center items-center text-white text-lg font-bold"

>
           {post.novela}
                
                </CardFooter>
              </Card>
              </Link>
            );
          })}
        </div>
    
        {/* Botão para expandir ou recolher a lista */}
        {Object.entries(novelaCountMap).length > initialLimit && (
          <button
            onClick={toggleShowAll}
            className="hover:underline mt-5 flex mx-auto text-brown/80"
          >
            {showAll ? <MinusCircle size={32} /> : <PlusCircle size={32} />}
          </button>
        )}
      </div>
    );
    
};

export default Novelas;
