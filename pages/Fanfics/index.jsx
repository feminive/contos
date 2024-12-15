import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
} from "@nextui-org/react";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import Link from "next/link"; // Importando o componente Link do Next.js

// Função para formatar a data no formato dd-mm-aaaa
function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Mês começa do zero
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

async function getAllMarkdownFiles(dir) {
  let results = [];
  const list = await fs.readdir(dir);

  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      results = results.concat(await getAllMarkdownFiles(filePath));
    } else if (file.endsWith(".md")) {
      results.push(filePath);
    }
  }

  return results;
}

async function getNovelasData() {
  const markdownFiles = await getAllMarkdownFiles(
    path.join(process.cwd(), "posts")
  );
  const novelasMap = new Map();

  for (const file of markdownFiles) {
    const fileContent = await fs.readFile(file, "utf8");
    const { data } = matter(fileContent);

    let publishedAt = null;
    if (data.published && typeof data.published === "string") {
      publishedAt = new Date(data.published.split("-").reverse().join("-"));
    } else if (data.published instanceof Date) {
      publishedAt = data.published;
    }

    if (data.novela) {
      if (!novelasMap.has(data.novela)) {
        // Adicionar uma nova novela se ainda não existir
        novelasMap.set(data.novela, {
          title: data.novela,
          slug: data.novelaSlug,
          description: data.novelaDesc || null,
          image: data.img || "",
          maxEpisode: data.episode,
          latestPostDate: publishedAt || null, // Mantém como Date
        });
      } else {
        // Atualiza o maxEpisode e a data mais recente
        const current = novelasMap.get(data.novela);

        // Atualiza a data mais recente se a nova for posterior
        if (
          publishedAt &&
          (!current.latestPostDate || publishedAt > current.latestPostDate)
        ) {
          current.latestPostDate = publishedAt;
        }
      }
    }
  }

  return Array.from(novelasMap.values()).map((novela) => ({
    ...novela,
    latestPostDate: novela.latestPostDate
      ? formatDate(novela.latestPostDate)
      : "Data não disponível", // Formatar ao exibir
  }));
}

export async function getStaticProps() {
  const novelas = await getNovelasData();

  return {
    props: {
      novelas,
    },
  };
}

export default function NovelasPage({ novelas }) {
  return (
    <DefaultLayout metadata={null}>
      <section className="bg-brown/10 flex sm:flex-row flex-col justify-center sm:p-10 p-0">
        <div className="flex items-center ">
          <h1 className="flex flex-col mx-auto">
            <span className={title({ color: "pink" })}>Minhas&nbsp;</span>
            <span className={title({ color: "brown" })}>Novelas&nbsp;</span>
            <span className={title({ color: "pink" })}>eróticas</span>
          </h1>
        </div>

        <div className="flex-1 flex items-center justify-center w-96  p-10">
          <p className="text-lg hyphens text-justify">
            Eu adoro me perder no universo dos meus personagens, e por isso,
            meus contos eróticos e fanfics acabam se tornando bem longos!
            Pensando em facilitar o seu acompanhamento, resolvi organizar todas
            as histórias por novelas, assim você pode seguir seus personagens
            favoritos de forma super prática. Agora é só se jogar nessas
            aventuras e, ah, não deixe de me contar o que mais você gostaria de
            ver por aqui. Estou sempre aberta a novas ideias e adoraria saber
            sua opinião!
          </p>
        </div>
      </section>

      <div className="novelas-page container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl p-4 bg-brown/10">
        {novelas.length === 0 ? (
          <p>Nenhuma novela encontrada.</p>
        ) : (
          novelas.map((novela) => (
            <Link key={novela.slug} href={`/Fanfics/${novela.slug}`}>
              <Card className="w-full shadow-md hover:cursor-pointer">
                <CardHeader className="flex flex-col items-start justify-start h-[150px]">
                  <h4 className="text-xl font-bold text-blue-900 mb-2">
                    <div className={title({ color: "blue", size: "sm" })}>
                      {novela.title}
                    </div>
                  </h4>
                  <div className="text-left hyphens leading-6 sm:text-md text-md">
                    {novela.description}
                  </div>
                </CardHeader>

                <CardBody className="overflow-visible">
                  <div className="w-full h-68">
                    <Image
                      alt={`Imagem de ${novela.title}`}
                      className="object-cover rounded-xl w-full h-full"
                      src={`/${novela.image}`}
                      layout="responsive"
                      width={500}
                      height={280}
                    />
                  </div>
                </CardBody>

                <CardFooter className="flex flex-row justify-between">
                  <div className="text-sm text-gray-600">
                    Último post:{" "}
                    {novela.latestPostDate || "Data não disponível"}
                  </div>
                  <div className="text-sm text-gray-600">
                    Capítulos: {novela.maxEpisode}
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))
        )}
      </div>
    </DefaultLayout>
  );
}
