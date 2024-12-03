import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import Image from "next/image";
let Escritores = [
  {
    nome: "Anaïs Nin",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Anais_Nin.jpg",
    obras: "Delta de Vênus, Pequenos Pássaros",
    text: "Anaïs Nin é uma das escritoras mais icônicas da literatura erótica. Suas obras exploram o desejo feminino e a complexidade das emoções humanas com uma prosa poética e introspectiva.",
  },
  {
    nome: "Marquês de Sade",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Jean-Baptiste_Fran%C3%A7ois_Joseph_de_Sade.jpg/160px-Jean-Baptiste_Fran%C3%A7ois_Joseph_de_Sade.jpg",
    obras: "120 Dias de Sodoma",
    text: "Considerado o pioneiro do erotismo extremo, o Marquês de Sade aborda temas como liberdade sexual e perversão, desafiando os limites morais de sua época. Sua obra continua a gerar debates intensos.",
  },
  {
    nome: "D.H. Lawrence",
    img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRnGCz0TDDhQZPKL65pwzMvcVDelHJhwFHbkYCyygwfU3fzmUQX",
    obras: "O Amante de Lady Chatterley",
    text: "Lawrence explora o amor e a intimidade física com um tom realista e provocativo, rompendo tabus e criando um romance envolvente que marcou a literatura do século XX.",
  },
  {
    nome: "Pauline Réage",
    img: "https://aterraeredonda.com.br/wp-content/uploads/2024/03/fem-2-1-1024x679.png",
    obras: "História de O",
    text: "Essa obra de Pauline Réage examina o desejo e submissão dentro do contexto de um relacionamento dominador-submisso, sendo um dos textos mais icônicos da literatura BDSM.",
  },
  {
    nome: "Guillaume Apollinaire",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Guillaume_Apollinaire_foto.jpg/800px-Guillaume_Apollinaire_foto.jpg",
    obras: "As Onze Mil Varas",
    text: "Apollinaire mistura erotismo e surrealismo em suas histórias com um tom satírico e experimental, criando um dos textos mais ousados e inovadores da literatura francesa.",
  },
  {
    nome: "Henry Miller",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Henry_Miller_1940.jpg/640px-Henry_Miller_1940.jpg",
    obras: "Trópico de Câncer, Trópico de Capricórnio",
    text: "Conhecido por seu estilo direto e provocativo, Miller escreve sobre sexualidade e liberdade com uma autenticidade que transcendeu tabus de sua época.",
  },
  {
    nome: "Emmanuelle Arsan",
    img: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Marayat_Andriane_%281967%29.jpg",
    obras: "Emmanuelle",
    text: "A história de Arsan sobre a descoberta sexual é uma das mais famosas da literatura erótica e inspira adaptações no cinema com sua abordagem livre e hedonista do erotismo.",
  },
  {
    nome: "Alina Reyes",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Alina_Reyes_en_2011.jpg/800px-Alina_Reyes_en_2011.jpg",
    obras: "O Açougueiro",
    text: "Com um estilo sensível e sensual, Reyes explora o desejo através de metáforas poderosas, fazendo de _O Açougueiro_ um clássico moderno da literatura erótica.",
  },
  {
    nome: "Catherine Millet",
    img: "https://cdn-elle.ladmedia.fr/var/plain_site/storage/images/personnalites/catherine-millet/12338285-4-fre-FR/Catherine-Millet.jpg",
    obras: "A Vida Sexual de Catherine M.",
    text: "Autobiográfico, este livro aborda a sexualidade com uma franqueza incomum e questiona normas sociais sobre desejo e liberdade sexual.",
  },
  {
    nome: "Elfriede Jelinek",
    img: "https://www.nobelprize.org/images/jelinek-13697-portrait-medium.jpg",
    obras: "A Pianista",
    text: "Jelinek aborda a sexualidade feminina e a repressão com um tom sombrio e crítico, oferecendo uma visão complexa e perturbadora do desejo.",
  },
  {
    nome: "Vladimir Nabokov",
    img: "https://upload.wikimedia.org/wikipedia/commons/8/87/Vladimir_Nabokov_1973.jpg",
    obras: "Lolita",
    text: "Nabokov cria uma narrativa controversa que explora a obsessão e o desejo de uma forma intelectual e literária, desafiando o leitor a refletir sobre moralidade e atração.",
  },
  {
    nome: "Georges Bataille",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Georges_Bataille_vers_1943.jpg/220px-Georges_Bataille_vers_1943.jpg",
    obras: "História do Olho",
    text: "Misturando surrealismo e erotismo, Bataille oferece uma obra intensa e provocativa, rica em simbolismo e imaginação.",
  },
  {
    nome: "Charles Bukowski",
    img: "https://upload.wikimedia.org/wikipedia/commons/7/78/CharlesBukowski-1.jpg",
    obras: "Mulheres",
    text: "Bukowski explora a sexualidade de maneira crua e direta, oferecendo uma perspectiva desencantada e intensa sobre relacionamentos e desejo.",
  },
  {
    nome: "Milan Kundera",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMQVwGmkv1S2ted6_5MtL1K8sSSo-vJSLwhQ&s",
    obras: "A Insustentável Leveza do Ser",
    text: "Kundera combina filosofia e erotismo em uma narrativa que explora a liberdade sexual e os conflitos internos de seus personagens.",
  },
  {
    nome: "Philip Roth",
    img: "https://www.theparisreview.org/il/c0ad8b95ff/large/PhilipRoth.jpg",
    obras: "O Complexo de Portnoy",
    text: "Roth usa o humor para explorar a sexualidade e os conflitos culturais, trazendo uma visão satírica e bem-humorada sobre o desejo e a culpa.",
  },
  {
    nome: "Émile Zola",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Emile_Zola_1902.jpg",
    obras: "Nana",
    text: "Zola aborda o erotismo e a sociedade parisiense em um romance que explora a vida de uma cortesã e a decadência moral.",
  },
  {
    nome: "Poppy Z. Brite",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYanbamIDpZY5ZvHdCRRJX6kKlR2TzGdabnQ&s",
    obras: "Swamp Foetus",
    text: "Misturando erotismo e horror, Brite cria histórias góticas que envolvem o leitor em uma atmosfera sombria e intensa.",
  },
  {
    nome: "Lawrence Durrell",
    img: "https://www.theparisreview.org/il/1a76c40bd0/large/lawrence-durrell-interview.jpg",
    obras: "O Quarteto de Alexandria",
    text: "Durrell escreve sobre erotismo e psicologia em um romance complexo e lírico que explora o desejo através de várias perspectivas.",
  },
  {
    nome: "Octavio Paz",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/98/Octavio_Paz_-_1988_Malm%C3%B6.jpg",
    obras: "A Chama Dupla",
    text: "Paz explora o erotismo e o amor com uma visão profunda e filosófica, refletindo sobre a ligação entre o desejo e a espiritualidade.",
  },
  {
    nome: "Colette",
    img: "https://www.bourgogne-tourisme.com/uploads/2022/04/800px-colette_-_photo_henri_manuel-1049x725.jpg",
    obras: "Gigi, Chéri",
    text: "A escrita de Colette é marcada por uma exploração delicada da sensualidade e do romance, desafiando as normas de sua época e celebrando a feminilidade.",
  },
];

// Gera metadados para o post
function generateMetadata() {
  return {
    title: "20 maiores escritores de contos eróticos",
    description:
      "Uma lista com os maiores escritores de contos eróticos de todos os tempos para você conhecer.",
    canonical: `https://feminivefanfics.com.br/Blog/20-maiores-escritores-de-contos-eroticos`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "20 maiores escritores de contos eróticos",
      alternativeHeadline: "Feminive Fanfics - Contos Eróticos",
      image: `https://upload.wikimedia.org/wikipedia/commons/6/6c/Anais_Nin.jpg`,
      award:
        "Uma lista com os maiores escritores de contos eróticos de todos os tempos para você conhecer.",
      editor: "Mariana",
      genre: "Contos Eróticos",
      wordcount: "1120",
      publisher: "Feminive Fanfics",
      url: `https://feminivefanfics.com.br/Blog/20-maiores-escritores-de-contos-eroticos`,

      articleBody:
        "Uma lista com os maiores escritores de contos eróticos de todos os tempos para você conhecer.",
      author: {
        "@type": "Person",
        name: "Mariana",
      },
    },

    openGraph: {
      title: "20 maiores escritores de contos eróticos",
      description:
        "Uma lista com os maiores escritores de contos eróticos de todos os tempos para você conhecer.",
      authors: "Feminive",
      url: `https://feminivefanfics.com.br/Blog/20-maiores-escritores-de-contos-eroticos`,
      type: "article",
      images: {
        url: `https://upload.wikimedia.org/wikipedia/commons/6/6c/Anais_Nin.jpg`,
        height: 600,
        alt: "Imagem do Post",
      },
    },
  };
}
export default function Vinte() {
  return (
    <DefaultLayout metadata={generateMetadata()}>
      <section className="bg-brown/10 flex sm:flex-row flex-col justify-center sm:gap-20 gap-4">
        <h1 className="flex flex-col sm:my-16 my-10 sm:ml-40 mx-auto">
          <div className={title({ color: "pink" })}>Os 20 maiores&nbsp;</div>
          <div className={title({ color: "brown" })}>escritores de &nbsp;</div>
          <div className={title({ color: "pink" })}>contos eróticos</div>
          {/* <h1 className="text-lg text-black/60 mt-1">
            Contos Eróticos femininos
          </h1> */}
        </h1>
        <div className="flex items-end mx-auto">
          <img
            alt="Hero!"
            src="/front.webp"
            width={250}
            height={280}
            className="z-0 opacity-60"
            priority
            quality={85}
          />
        </div>
      </section>{" "}
      <div className="flex flex-col text-lg container gap-4 p-10  bg-[#f4f4f4]">
        <h2 className="font-semibold text-2xl text-brown/80 my-10">
          Lista completa com os mestres da escrita erótica!
        </h2>
        <p>
          Os contos eróticos têm o poder de envolver, instigar e despertar
          emoções intensas nos leitores, combinando sensualidade e narrativa
          cativante. Para quem aprecia esse gênero literário, conhecer os
          autores mais destacados é essencial para explorar histórias bem
          construídas e repletas de paixão.
        </p>
        <p className="mb-20">
          Nesta lista, reunimos os 20 maiores escritores de contos eróticos,
          cujas obras marcaram o universo da literatura sensual. De mestres
          clássicos a novos talentos, cada autor se destaca por sua capacidade
          única de transformar palavras em experiências inesquecíveis.
          Prepare-se para descobrir nomes que vão enriquecer sua biblioteca e
          acender sua imaginação.
        </p>
        {Escritores.map((escritor, index) => (
          <div
            key={index}
            className="border rounded-2xl p-4 relative bg-[#fef9ff] mt-2"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="w-full sm:w-1/3 max-w-[200px] aspect-square relative">
                <Image
                  src={escritor.img}
                  alt={`Imagem de ${escritor.nome}`}
                  fill
                  className="rounded-lg object-cover"
                  sizes="(max-width: 640px) 100vw, 200px"
                  priority
                  quality={85}
                />
              </div>
              <div className="flex flex-col ">
                <div className="text-4xl font-bold text-brown/20 mb-4">
                  #{index + 1}
                </div>
                <h3 className={title({ color: "blue", size: "sm" })}>
                  {escritor.nome}
                </h3>
                <p>Principais Obras: {escritor.obras}</p>
                <p className="mt-4 text-xl">{escritor.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
}
