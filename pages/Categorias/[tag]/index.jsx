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

export default function TagFilteredPosts({
  posts,
  allPosts,
  tag,
  allCategories,
}) {
  return (
    <DefaultLayout>
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/4 w-full sm:order-1 order-2">
          <div className="p-4">
            {posts.length > 0 ? (
              <>
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
                    &quot;{posts[0].novelaDesc || "Xereca"}&quot;
                  </p>
                  <span className="text-brown cursor-pointer flex flex-row gap-2 mt-4 w-full justify-center p-2 rounded-xl">
                    <Link
                      href="/instagram"
                      target="_blank"
                      aria-label="instagram"
                    >
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
              </>
            ) : (
              <p>Nenhum post encontrado para a tag &quot;{tag}&quot;.</p>
            )}
            <div className="bg-[#FEF9FF] justify-center flex flex-col mt-10 p-4 rounded-2xl">
              <NovelasSidebar posts={allPosts} />
            </div>
            <div className="bg-[#FEF9FF] justify-center flex flex-col mt-10 p-4 rounded-2xl">
              <TagsSidebar posts={allPosts} />
            </div>
          </div>
        </div>
        <div className="sm:w-3/4 p-4 sm:order-2 order-1 gap-4 flex flex-col ">
          {posts.length > 0 ? (
            posts.map((post) => <Post key={post.slug} post={post} />)
          ) : (
            <p>Nenhum post encontrado para a tag &quot;{tag}&quot;.</p>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const markdownFiles = getAllMarkdownFiles(postsDirectory);

  const tags = new Set();

  markdownFiles.forEach((filePath) => {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    if (data.category) {
      data.category.split(",").forEach((tag) => tags.add(tag.trim()));
    }
  });

  const paths = Array.from(tags).map((tag) => ({
    params: { tag: tag },
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

  const allCategories = new Set(); // Adiciona um Set para coletar todas as categorias

  allPosts.forEach((post) => {
    if (post.category) {
      post.category.split(",").forEach((category) => {
        allCategories.add(category.trim());
      });
    }
  });

  // Filtra posts pela categoria recebida
  const filteredPosts = allPosts.filter((p) => {
    const categories = p.category
      ? p.category.split(",").map((tag) => tag.trim())
      : [];
    return categories.includes(params.tag.replace(/-/g, " "));
  });

  return {
    props: {
      posts: filteredPosts,
      allPosts,
      tag: params.tag,
      allCategories: Array.from(allCategories), // Envia as categorias para o componente
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
