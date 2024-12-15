'use client'
import dynamic from "next/dynamic";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";
import Link from "next/link";
import DefaultLayout from "@/layouts/default";
import Post from "@/components/Post";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Pagination } from "@/components/Pagination";
import { XLogo, InstagramLogo,TelegramLogo, EnvelopeSimple } from "@phosphor-icons/react";
import Toast from "@/components/CustomToast";
import Sidebar from "@/components/Sidebar"
const POSTS_PER_PAGE = 8;

// Carregando o Sidebar dinamicamente com next/dynamic esse bagulho é muito maneiro 


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

export default function IndexPage({ posts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <DefaultLayout metadata={null}>
      <Toast />
      <div className="bg-[#f4f4f4]">
        <section className="bg-brown/10 flex sm:flex-row flex-col justify-center sm:gap-20 gap-4">
          <div className="flex flex-col sm:my-16 my-10 sm:ml-40 mx-auto">
            <div className={title({ color: "pink" })}>The inevitable&nbsp;</div>
            <div className={title({ color: "brown" })}>Beauty&nbsp;</div>
            <div className={title({ color: "pink" })}>of longing to desire</div>
            <h1 className="text-lg text-black/60 mt-1">
            Female Erotic Stories
</h1>
          </div>
          <div className="flex items-end mx-auto">
            <Image
              alt="Hero!"
              src="/front.webp"
              width={250}
              height={280}
              className="z-0 opacity-60"
              priority
              quality={85}
            />
          </div>
        </section>

        <section className="w-full h-30 bg-brown/30 mb-2 flex flex-grow">
          <div className="w-full flex items-center justify-center py-3">
            <span className="text-brown cursor-pointer flex flex-row gap-4">
              <Link
                href={siteConfig.links.instagram}
                target="_blank"
                aria-label="instagram"
              >
                <InstagramLogo
                  size={24}
                  fill="brown"
                  className="hover:text-brown/50 opacity-50"
                />
              </Link>
              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                aria-label="twitter"
              >
                <XLogo
                  size={24}
                  fill="brown"
                  className="hover:text-brown/50 opacity-50"
                />
              </Link>
              <Link
                href={siteConfig.links.email}
                target="_blank"
                aria-label="email"
              >
                <EnvelopeSimple
                  size={24}
                  fill="brown"
                  className="hover:text-brown/50 opacity-50"
                />
                 </Link>
                   <Link
                href={siteConfig.links.telegram}
                target="_blank"
                aria-label="email"
              >
                <TelegramLogo
                  size={24}
                  fill="brown"
                  className="hover:text-brown/50 opacity-50"
                />
              </Link>
            </span>
          </div>
        </section>

        <div className="w-full flex justify-center my-20">
          <div className={title({ color: "pink", size: "sm" })}>
            I Have {posts.length} &nbsp;
          </div>
          <h1 className={title({ color: "brown", size: "sm" })}>
            Erotic Stories&nbsp;
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-1/4 w-full sm:order-1 order-2">
            <Sidebar posts={posts} />
          </div>
          <main className="sm:w-3/4  pl-4 sm:pl-2 pr-4 pt-3 sm:order-2 order-1">
            <div className="flex flex-col gap-4">
              {currentPosts.map((post) => (
                <Post key={post.title} post={post} />
              ))}
            </div>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              paginate={paginate}
            />
          </main>
        </div>
      </div>
    </DefaultLayout>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const markdownFiles = await getAllMarkdownFiles(postsDirectory);

  const posts = await Promise.all(
    markdownFiles.map(async (filePath) => {
      const fileContents = await fs.readFile(filePath, "utf8");
      const { data, content } = matter(fileContents);
      return {
        id: path.basename(filePath, ".md"),
        ...data,
        content,
        published: data.published ? data.published.toString() : "",
      };
    })
  );

  posts.sort((a, b) => new Date(b.published) - new Date(a.published));

  return {
    props: { posts },
  };
}
