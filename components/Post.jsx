import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import Link from "next/link";
import readingTime from "reading-time";
import { Heart, CalendarBlank, Star } from "@phosphor-icons/react";

export default function Post({ post }) {
  const stats = readingTime(post.content);
  const readingTimeText = stats.text.replace("min read", "minutes");
  const [isNewPost, setIsNewPost] = useState(false);

  useEffect(() => {
    // Converte a string da data publicada para um objeto Date
    const publishedDate = new Date(post.published);
    const currentDate = new Date();
    const differenceInTime = currentDate - publishedDate;
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    // Verifica se o post é novo
    if (differenceInDays < 15) {
      setIsNewPost(true);
    }
  }, [post.published]);
  
  const categories = post.category || ''; // Garante que categories seja uma string vazia caso seja undefined ou null
  const formattedCategories = categories
    .split(", ")
    .map((category) => `${category}`)
    .join(" ");

  return (
    <Link href={`/EroticStories/${post.slug}`} passHref key={post.id}>
      <Card className="w-full shadow-none bg-[#fef9ff] hover:bg-[#fff] cursor-pointer">
        <CardHeader className="flex justify-between items-start">
          <h2 className="sm:text-2xl text-lg text-brown flex justify-between w-full">
            {post.title}
            {isNewPost && (
              <span className="ml-2 text-yellow-500">
                <Star />
              </span>
            )}
          </h2>
        </CardHeader>
        <div className="flex gap-2 mb-1 ml-3 items-center">
          <Heart size={15} color={"#c88687"} />
          <small className="text-primary -ml-1">{post.author}</small>

          <CalendarBlank size={15} color={"#c88687"} />
          <small className="text-primary -ml-1">
            {post.published
              ? new Intl.DateTimeFormat("en-US", {
                  month: "short", // Mês abreviado (exemplo: Jan, Feb, Mar)
                  day: "numeric", // Dia como número (exemplo: 15)
                  year: "numeric", // Ano com 4 dígitos
                }).format(new Date(post.published))
              : "Publication date not available"}
          </small>
        </div>
        <CardBody className="relative">
          {/* Texto sobre a imagem e o gradiente */}
          <div className="relative z-10">
            <div className="text-left hyphens leading-6 sm:line-clamp-2 md:line-clamp-3 lg:line-clamp-4 line-clamp-3 sm:text-md text-sm">
              <div className="text-black/80">{post.content}</div>
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <small className="text-black/60">{readingTimeText} </small>
          <small className="text-black/60 ml-4 ">
            {post.content.trim().split(/\s+/).length} words
          </small>
          <small className="text-black/60 ml-4">{formattedCategories}</small>
        </CardFooter>

        {/* Container da imagem com o gradiente */}
        <div
          className="absolute right-0 top-0 bottom-0 w-[260px] bg-cover bg-center rounded-tr-lg"
          style={{
            backgroundImage: `url(${post.img})`, // Adicionando a imagem
            backgroundBlendMode: "overlay", // Aplica o blend com a sobreposição
            opacity: 0.4, // Aplica a opacidade de 70% na imagem
          }}
        >
          {/* Gradiente sobre a imagem */}
          <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent " />
        </div>
      </Card>
    </Link>
  );
}
