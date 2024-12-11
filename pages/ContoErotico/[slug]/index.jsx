import fs from "fs";
import path from "path";
import matter from "gray-matter";
import DefaultLayout from "@/layouts/default";
import { title, subtitle } from "@/components/primitives";
import { formatDate } from "@/utils/dateFormater";
import { MagnifyingGlassMinus, MagnifyingGlassPlus } from "phosphor-react";
import React, { useState } from "react";
import NavegadorNovela from "@/components/NavegadorNovela";
import Markdown from "react-markdown";
import SidebarSlug from "@/components/Sidebar";
import { truncateContent } from "../../../utils/truncate";
import readingTime from "reading-time";
import { Eye, Heart, Timer, Article } from "@phosphor-icons/react";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import FirstEpisodeBanner from "@/components/FirstEpisodeBanner";
import { ReadingProgressBar } from '@/components/progress-bar';


// Função para gerar os metadados do post
function generateMetadata(post) {
  const truncado = truncateContent(post.content);
  return {
    title: post.title,
    description: `Conto Eróticos femininos feito na medida paras mulheres com o tema: ${post.category} `,
    canonical: `https://feminivefanfics.com.br/ContoErotico${post.slug}`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      alternativeHeadline: "Feminive Fanfics - Contos Eróticos",
      image: `https://feminivefanfics.com.br/${post.img}`,
      award: "Melhor conto erótico do Blog",
      editor: "Mariana",
      genre: "Contos Eróticos",
      wordcount: "1120",
      publisher: "Feminive Fanfics",
      url: `https://feminivefanfics.com.br/ContoErotico/${post.slug}`,
      datePublished: post.published,
      dateCreated: post.published,
      dateModified: post.published,
      description: truncado,
      articleBody: post.content,
      author: {
        "@type": "Person",
        name: "Mariana",
      },
    },
    keywords: [`${post.category}`],
    openGraph: {
      title: post.title,
      description: truncado,
      publishedTime: post.published,
      authors: "Feminive",
      url: `https://feminivefanfics.com.br/ContoErotico/${post.slug}`,
      type: "article",
      images: {
        url: `https://feminivefanfics.com.br/${post.img}`,
        height: 600,
        alt: "Imagem do Post",
      },
    },
  };
}

// Função para ler todos os arquivos Markdown
function getAllMarkdownFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllMarkdownFiles(filePath));
    } else if (file.endsWith(".md")) {
      results.push(filePath);
    }
  });

  return results;
}

// Componente principal
export default function BlogPost({ post, posts }) {
  const stats = readingTime(post.content);
  const readingTimeText = stats.text.replace("min read", "minutos");
  const formattedDate = post ? formatDate(post.published) : "";
  const [fontSize, setFontSize] = useState(16);

  if (!post) return <p>Loading...</p>;

  return (
    <DefaultLayout metadata={generateMetadata(post)}>

      <ScrollToTopButton />
      <div className="flex flex-col sm:flex-row sm:mt-10 mt-0">

        <section className="sm:w-3/4 sm:order-2 order-1 sm:mt-4 mt-0 sm:mr-4 mr-0">
        <div className="novela-page">

<FirstEpisodeBanner post={post} posts={posts} />
</div>

          <div className="bg-white rounded-2xl sm:p-2 md:p-10 p-4 w-full h-full border-brown/10">
            <div className="flex flex-row gap-4">
              <small className="text-black/60 flex items-center">
                <Timer size={18} />
                {readingTimeText}
              </small>
              <small className="text-black/60 flex items-center">
                <Article size={18} />
                {post.content.trim().split(/\s+/).length} palavras
              </small>
            </div>
            <div className="flex container max-w items-center justify-center mt-10">
              <h1 className={title({ color: "brown" })}>{post.title}</h1>
              <br />
              <h4 className={subtitle({ color: "velvet", class: "mt-1" })}></h4>
            </div>
            <small>{formattedDate}</small>
            <div className="flex justify-end gap-4 mb-4">
              <button
                onClick={() => setFontSize((s) => Math.max(s - 2, 10))}
                className="text-brown hover:cursor-pointer"
              >
                <MagnifyingGlassMinus size={32} />
              </button>
              <button
                onClick={() => setFontSize((s) => s + 2)}
                className="text-brown hover:cursor-pointer"
              >
                <MagnifyingGlassPlus size={32} />
              </button>
            </div>
            <div className="tinyMCE" style={{ fontSize: `${fontSize}px` }}>
              <Markdown>{post.content}</Markdown>
            </div>
            <NavegadorNovela currentPost={post} allPosts={posts} />
          </div>
        </section>

        <div className="sm:w-1/4 w-full sm:order-1 order-2">
          <SidebarSlug posts={posts} post={post} />
        </div>
        <ReadingProgressBar />

      </div>

    </DefaultLayout>
  );
}

// Função para obter os dados do post
export async function getStaticProps({ params }) {
  const postsDirectory = path.join(process.cwd(), "posts");
  const markdownFiles = getAllMarkdownFiles(postsDirectory);

  const posts = markdownFiles.map((filePath) => {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      id: path.basename(filePath, ".md"),
      ...data,
      published: data.published ? new Date(data.published).toISOString() : null,
      content,
    };
  });

  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post, posts },
    revalidate: 60,
  };
}

// Função para gerar os caminhos estáticos
export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const markdownFiles = getAllMarkdownFiles(postsDirectory);

  const paths = markdownFiles.map((filePath) => {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return { params: { slug: data.slug } };
  });

  return {
    paths,
    fallback: "blocking",
  };
}
