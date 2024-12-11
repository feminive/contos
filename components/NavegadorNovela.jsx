import Link from "next/link";
import { CaretRight, CaretLeft } from "@phosphor-icons/react";

export default function NavegadorNovela({ currentPost, allPosts }) {
  // Filtra os posts que pertencem à mesma novela
  const novelaPosts = allPosts.filter(
    (post) => post.novela === currentPost.novela
  );

  // Ordena os posts por episódio
  novelaPosts.sort((a, b) => a.episode - b.episode);

  // Encontra o índice do post atual na lista de posts da novela
  const currentIndex = novelaPosts.findIndex(
    (post) => post.slug === currentPost.slug
  );

  // Define o post anterior e o próximo, buscando dentro de todos os posts
  const previousPost = currentIndex > 0 ? novelaPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < novelaPosts.length - 1
      ? novelaPosts[currentIndex + 1]
      : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-20">
    {/* Cartão para a novela anterior */}
    <div className="p-4 rounded-xl flex flex-row h-[120px]">
      {previousPost ? (
        <Link href={`/ContoErotico/${previousPost.slug}`}>
          <div className="hover:bg-white flex flex-row h-full w-full rounded-xl">
            <div className="bg-brown/20 items-center flex mr-4">
              <CaretLeft size={32} className="text-white" />
            </div>
            <div className="flex flex-col leading-5 justify-center">
              <div className="text-brown text-xl">Anterior</div>
              {previousPost.title}
            </div>
          </div>
        </Link>
      ) : (
        <div className="w-full h-full rounded-xl"></div> // Placeholder vazio Para inidicar outra noovoela
      )}
    </div>
  
    {/* Cartão central (opcional, para balancear o grid) */}
    <div className="p-4 rounded-xl h-[120px] flex justify-center items-center">
      {/* Se não quiser conteúdo aqui, pode deixar vazio ou usar um título */}
    </div>
  
    {/* Cartão para a próxima novela */}
    <div className="p-4 rounded-xl flex flex-row h-[120px]  justify-end">
      {nextPost ? (
        <Link href={`/ContoErotico/${nextPost.slug}`}>
          <div className="hover:bg-white flex flex-row h-full w-full rounded-xl">
            <div className="flex flex-col text-right leading-5 justify-center">
              <div className="text-brown text-xl">Próximo</div>
              {nextPost.title}
            </div>
            <div className="bg-brown/20 items-center flex ml-4">
              <CaretRight size={32} className="text-white" />
            </div>
          </div>
        </Link>
      ) : (
        <div className="w-full h-full rounded-xl"></div> // Placeholder vazio Para inidicar outra noovoela
      )}
    </div>
  </div>
  
  );
}
