import Link from "next/link";

// Função para buscar o primeiro episódio da novela nos posts
function getFirstNovela(post, posts) {
  // Verifique se o post tem a propriedade 'novela' e filtre corretamente
  if (!post.novela) {
    console.error("A novela não está definida no post:", post);
    return null;
  }

  // Filtra os posts para encontrar os da mesma novela
  const novelaPosts = posts.filter(p => p.novela === post.novela);

  // Encontrando o primeiro episódio (episódio 1)
  const firstEpisode = novelaPosts.find(p => p.episode === 1);

  if (firstEpisode) {
    return {
      title: firstEpisode.title,
      slug: firstEpisode.slug,
      img: firstEpisode.img,
      novela: firstEpisode.novela
    };
  }

  return null;
}

// Componente que vai exibir o primeiro episódio
export default function FirstNovelaPage({ post, posts }) {
  // Passando o 'post' para a função getFirstNovela
  const firstNovela = getFirstNovela(post, posts);

  // Verificação: não exibir se não encontrar o episódio ou se a novela for "Outros"
  if (!firstNovela || firstNovela.novela === "Outros") {
    return null; // Retorna 'null' para não renderizar nada
  }

  return (
    <Link href={`/EroticStories/${firstNovela.slug}`} className="">
      <div className="rounded-md mb-4 relative h-[250px] rounded flex items-center">
        {/* Texto sobre a imagem */}
        
        <div
          className=" text-4xl font-bold text-black z-10 p-10 text-brown "
          // style={{ top: "50%", left: "35%", transform: "translate(-50%, -50%)" }} // Centraliza o texto
        >
          
          {firstNovela.novela}
          <div className="text-black text-xl  font-normal">
            Você pode acompanhar essa novela desde o ínicio clicando aqui!
          </div>
        </div>
  
        <div
          className="absolute right-0 top-0 bottom-0 bg-cover bg-center rounded-xl shadow-md"
          style={{
            backgroundImage: `url(/${firstNovela.img})`, 
            backgroundBlendMode: "overlay", 
            opacity: 0.6, 
            width: "100%",
          }}
        >
          {/* Gradiente sobre a imagem */}
          <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
        </div>
      </div>
    </Link>
  );
}
