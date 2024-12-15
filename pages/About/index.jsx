"use client";
import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";

import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import {
  Globe,
  TwitterLogo,
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  RedditLogo,
  TelegramLogo,
} from "phosphor-react";

export default function Autora() {
  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-10 p-4 container w-max-7xl ">
        <h1 className="inline-block max-w-lg text-center justify-center">
          <div className={title({ color: "pink" })}>Quem é a &nbsp;</div>
          <div className={title({ color: "brown" })}>Autora?&nbsp;</div>
          <br />
        </h1>
        <div className="text-lg hyphens-auto leading-7 text-justify w-full space-y-4 mt-10">
          <p>
            Sou uma jovem mulher que casou cedo com um homem imerso em sua
            formação acadêmica. No meu tempo livre, aprecio escrever e interagir
            com pessoas que compartilham os mesmos interesses que eu. O universo
            do erótico despertou em mim após a leitura de renomados autores
            desse gênero, instigando-me a tentar por mim mesma. Meus primeiros
            contos, criados aos 19 anos, isso foi quase 6 anos atrás, eram
            bastante rudimentares e excessivamente gráficos, contudo, com
            dedicação e aperfeiçoamento, evoluí na minha escrita.
          </p>

          <p>
            Nunca tive e não tenho aspirações à fama, apenas o desejo de ser
            lida e provocar o desejo inexorável do desejar nas pessoas. Aprecio
            conduzir pessoas, por meio da imaginação, a destinos onde nunca
            poderiam estar, proporcionando-lhes assim, alguns instantes de
            alegria e contentamento.
          </p>

          <p>
            Escolho preservar meu anonimato para evitar a crueldade e o
            preconceito do mundo, protegendo assim o que construí. Eu entendo,
            que muitos de vocês tem curiosidades sobre mim, mas lembrem-se, a
            curiosidade é o primeiro passo para o desejo.
          </p>
          <p>
            Muito mais coisas sobre mim você pode ler nesse pequeno <Link href={'/FAQ'} className="text-brown">FAQ</Link> ou
            você pode mandar uma mensagem para mim nas redes sociais !{" "}
          </p>
        </div>
        <div className="text-brown textl-lg mt-10" ><Link href={'/'}>Página Inicial</Link></div>
      </div>
      <div className="flex flex-col  min-h-screen "></div>
    </DefaultLayout>
  );
}
