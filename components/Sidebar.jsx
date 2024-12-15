// @/components/Sidebar.js

import Link from "next/link";
import NovelasSidebar from "@/components/NovelasSidebar";
import TagsSidebar from "@/components/TagsSidebar";
import { Image } from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import {
  XLogo,
  InstagramLogo,
  TelegramLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import Pix from "@/components/Pix";

const Sidebar = ({ posts }) => {
  return (
    <aside className="p-4">
      <div className="items-center bg-[#FEF9FF] justify-center flex flex-col p-4 rounded-2xl">
        <Link href={"/Autora"}>
          <Image
            isZoomed
            src="/eu.jpg"
            alt="avatar"
            width={250}
            height={250}
            className="rounded-xl"
          />
          <div className="mt-4 font-semibold text-xl text-brown">Feminive</div>
        </Link>
        <p className="italic leading-6 text-center mt-2">
          &quot;Writer of provocative erotic tales, exploring passion, desire,
          and intimate fantasies with bold, sensual storytelling.&quot;
        </p>
        <span className="text-brown cursor-pointer flex flex-row gap-2 mt-4">
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
      <div className="bg-[#FEF9FF] justify-center flex flex-col mt-4 p-4 rounded-2xl">
        <TagsSidebar posts={posts} />
      </div>
      {/* <div className="bg-[#FEF9FF] flex flex-col mt-4 p-4 rounded-2xl">
  <Pix/>

      </div> */}
      {/* <div className="bg-[#FEF9FF] justify-center flex flex-col mt-4 p-4 rounded-2xl">
        <NovelasSidebar posts={posts} />
      </div> */}

      {/* <div className="bg-[#FEF9FF] justify-center flex flex-col mt-4 p-4 rounded-2xl">
        <h2 className="text-brown my-9 text-2xl">Quiz</h2>
        <Link
          href={`/Quiz/como-descobrir-se-eu-sou-lesbica`}
          className="text-left w-4/5 hover:bg-brown/70 hover:text-white hover:rounded-lg p-1"
        >
          Será que eu sou Lésbica?
        </Link>{" "}
      </div> */}
      {/* <div className="bg-[#FEF9FF] justify-center flex flex-col mt-4 p-4 rounded-2xl">
        <h2 className="text-brown my-9 text-2xl">Contribua</h2>
        <p>Ao invés de mandar foto de pinto feio você pode mandar uma contribuição para eu pagar servidores e me ajuar a continuar produzindo!</p>
        <Pix/>

      </div> */}
    </aside>
  );
};

export default Sidebar;
