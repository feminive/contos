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
  TelegramLogo
} from "phosphor-react";


export default function Mensagem() {

  const links = [
    {
      name: "Telegram",
      url: "https://t.me/feminivefanfic",
      logo: <TelegramLogo size={32} />,
    },
    {
      name: "Threads",
      url: "https://www.threads.net/@feminivecontos",
      logo: <FacebookLogo size={32} />,
    },
    {
      name: "Twitter",
      url: "https://x.com/feminivefanfics",
      logo: <TwitterLogo size={32} />,
    },
    {
      name: "Instagram",
      url: "https://instagram.com.br/feminivecontos",
      logo: <InstagramLogo size={32} />,
    },
    {
      name: "Reddit",
      url: "https://instagram.com.br/feminivecontos",
      logo: <RedditLogo size={32} />,
    },
    { name: "Site", url: "/", logo: <Globe size={32} /> },
    {
      name: "Email",
      url: "mailto:contos@feminive.com.br",
      logo: <EnvelopeSimple size={32} />,
    },
  ];
  const [sender, setSender] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [isAdult, setIsAdult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const { data: session } = useSession(); // Comentado
  // const jwtToken = session?.jwt; // Comentado
  const subject = "Pedido de Conto";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sender || !email || !content || !isAdult) {
      toast.info(
        "Por favor, preencha todos os campos e confirme que é maior de 18 anos."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`https://feminivefanfics.com.br/api/mails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${jwtToken}`, // Comentado
        },
        body: JSON.stringify({
          data: {
            sender: sender,
            email: email,
            content: content,
            subject: subject,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(
          toast.error("Algo deu errado. Por favor, tente novamente.")
        );
      }

      toast.success("Mensagem enviada com sucesso!");
      setSender("");
      setEmail("");
      setContent("");
      setIsAdult(false);
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DefaultLayout>
      
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-10">
        <h1 className="inline-block max-w-lg text-center justify-center">
          <div className={title({ color: "pink" })}>Quer falar&nbsp;</div>
          <div className={title({ color: "brown" })}>comigo?&nbsp;</div>
          <br />
          {/* <div className={title({ color: "pink" })}>faça uma pergunta...</h1> */}
        </h1>
        <p className="max-w-96 break-words text-justify">
        Você consegue me encontrar em algum desses canais, manda uma mensagem pra mim.        </p>
      </div>
      <div className="flex flex-col  min-h-screen">
      <div className="mx-auto container  max-w-7xl justify-center items-center flex flex-col ">
        {links.map((link) => (
          <Link href={link.url} key={link.name}>
            <div className="flex flex-row items-center space-x-2 p-4 mt-2 rounded-2xl bg-[#fef9ff] w-96 hover:shadow-sm hover:scale-105 transition-transform duration-200 text-brown hover:text-purple">
              <span>{link.logo}</span>
              <span>{link.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </DefaultLayout>
  );
}
