import fs from "fs";
import path from "path";
import matter from "gray-matter";
import DefaultLayout from "@/layouts/default";
import Post from "@/components/Post";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import NovelasSidebar from "@/components/NovelasSidebar";
import TagsSidebar from "@/components/TagsSidebar";
import { Instagram, Twitter, Mail } from "@/lib/icons";
import { useState } from "react";
import { Pagination } from "@/components/Pagination";

const POSTS_PER_PAGE = 7; // Número de posts por página

export default function NovelaPosts({ posts, allPosts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAscending, setIsAscending] = useState(true); // Estado para controlar a ordem de ordenação

  // Alternar ordenação crescente/decrescente
  const toggleSortOrder = () => {
    setIsAscending((prev) => !prev);
  };

  // Ordenar os posts com base no estado atual
  const sortedPosts = [...posts].sort((a, b) => {
    const comparison = (a.episode || 0) - (b.episode || 0);
    return isAscending ? comparison : -comparison;
  });

  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!posts || posts.length === 0) {
    return <p>Nenhum post encontrado para esta novela.</p>;
  }

  return (
    <DefaultLayout>
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/4 w-full sm:order-1 order-2">
          <div className="p-4">
            <div className="items-center bg-[#FEF9FF] justify-center flex flex-col p-4 rounded-2xl">
              <Image
                isZoomed
                src={`/${posts[0].img}`}
                alt="avatar"
                width={250}
                height={250}
                className="rounded-xl"
              />
              <div className="mt-4 font-semibold text-xl text-brown">
                {posts[0].novela}
              </div>
              <p className="italic leading-6 text-center mt-2">
                &quot;{posts[0].novelaDesc || "Descrição indisponível"}&quot;
              </p>
              <span className="text-brown cursor-pointer flex flex-row gap-2 mt-4 w-full justify-center p-2 rounded-xl">
                <Link href="/instagram" target="_blank" aria-label="instagram">
                  <Instagram
                    size={24}
                    fill="brown"
                    className="hover:text-brown/50 opacity-50"
                  />
                </Link>
                <Link href="/twitter" target="_blank" aria-label="twitter">
                  <Twitter
                    size={24}
                    fill="brown"
                    className="hover:text-brown/50 opacity-50"
                  />
                </Link>
                <Link href="/email" target="_blank" aria-label="email">
                  <Mail
                    size={24}
                    fill="brown"
                    className="hover:text-brown/50 opacity-50"
                  />
                </Link>
              </span>
            </div>
            <div className="bg-[#FEF9FF] justify-center flex flex-col mt-10 p-4 rounded-2xl">
              <NovelasSidebar posts={allPosts} />
            </div>
            <div className="bg-[#FEF9FF] justify-center flex flex-col mt-10 p-4 rounded-2xl">
              <TagsSidebar posts={posts} />
            </div>
          </div>
        </div>
        {/* Lista de posts */}
        <div className="sm:w-3/4 h-[1800px]  mt-4 p-4 sm:order-2 order-1 gap-4 flex flex-col justify-between">
          <div className="flex justify-end">
            <button
              onClick={toggleSortOrder}
              className="px-4 py-2 bg-brown/80 text-white text-sm rounded-lg"
            >
              Ordenar: {isAscending ? "Mais antigos" : "Mais recentes"}
            </button>
          </div>
          {currentPosts.map((post) => (
            <Post key={post.slug} post={post} />
          ))}
          {/* Paginação centralizada e no fundo */}
          <div className="flex justify-center items-end mt-auto mb-4">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

// getStaticPaths e getStaticProps continuam iguais
export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const markdownFiles = getAllMarkdownFiles(postsDirectory);

  const slugs = new Set();

  markdownFiles.forEach((filePath) => {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    if (data.novelaSlug) {
      slugs.add(data.novelaSlug);
    }
  });

  const paths = Array.from(slugs).map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const postsDirectory = path.join(process.cwd(), "posts");
  const markdownFiles = getAllMarkdownFiles(postsDirectory);

  const allPosts = markdownFiles.map((filePath) => {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      id: path.basename(filePath, ".md"),
      ...data,
      published: data.published ? new Date(data.published).toISOString() : null,
      content,
    };
  });

  const filteredPosts = allPosts.filter((p) => p.novelaSlug === params.slug);

  const sortedPosts = filteredPosts.sort(
    (a, b) => (a.episode || 0) - (b.episode || 0)
  );

  if (!sortedPosts.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts: sortedPosts,
      allPosts,
    },
    revalidate: 60,
  };
}

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
