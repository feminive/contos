import Link from "next/link";
import {
  Globe,
  TwitterLogo,
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
} from "phosphor-react";

export default function Redes() {
  const links = [
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
    { name: "Site", url: "/", logo: <Globe size={32} /> },
    {
      name: "Contato",
      url: "mailto:contos@feminive.com.br",
      logo: <EnvelopeSimple size={32} />,
    },
  ];

  return (
    <div className="flex flex-col bg-[#e1babb] min-h-screen">
      <div className="mx-auto container m-40 max-w-7xl justify-center items-center flex flex-col ">
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
  );
}
