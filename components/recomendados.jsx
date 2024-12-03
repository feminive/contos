import React from "react";
import { useData } from "@/context/DataContext";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
} from "@nextui-org/react";
import Link from "next/link";

export default function Recomendado() {
  const { data, loading } = useData();

  if (loading) {
    return <div>Carregando...</div>;
  }

  // Embaralhar os posts aleatoriamente
  const shuffledPosts = data.sort(() => 0.5 - Math.random());

  // Selecionar os primeiros 4 posts
  const randomPosts = shuffledPosts.slice(0, 5);

  return (
    <div className="flex flex-col">
      <h2 className="flex mt-8 mb-2  ml-8 mx-auto  text-[brown]/70  text-lg font-bold">
        Recomendados{" "}
      </h2>
      {randomPosts.map((post) => (
        <Link key={post.id} href={`/ContoErotico/${post.slug}`} passHref>
          <Card className="border-none shadow-none  hover:bg-brown/10 bg-[#fef9ff]">
            <CardHeader className="flex -mb-7">
              <h2 className="text-brown font-semibold leading-tight text-md mb-2">
                {post.title}
              </h2>
            </CardHeader>
            <CardBody className="-mb-4">
              <div className="text-left text-sm leading-tight line-clamp-2">
                <p dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </CardBody>
            <CardFooter className="flex flex-row gap-1 items-start justify-start text-left ">
              {post.categorias.map((categoria) => (
                <div key={categoria.id}>
                  <Chip
                    size="sm"
                    className="border-brown text-[brown] text-[0.7rem]  border rounded-lg   bg-transparent  hover:bg-[pink]/20 hover:cursor-pointer"
                  >
                    {categoria.type}
                  </Chip>
                </div>
              ))}
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
