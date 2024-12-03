import React from "react";
import { title, subtitle } from "@/components/primitives";
import { Card, CardBody, Image, Button } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default";
export function generateMetadata(data) {
  const { username, createdAt, id } = data;
  const url = data.avatar.url;
  return {
    title: `Perfil de ${username}`,
    description: `Perfil de ${username} em Feminive Fanfics Contos Eróticos`,
    canonical: `https://feminivefanfics.com.br/perfil/${id}`,

    openGraph: {
      title: url,
      publishedTime: createdAt,
      authors: username,
      url: `https://feminivefanfics.com.br/perfil/${id}`,
      type: "article",
      images: {
        url: `https://feminivefanfics.com.br/${url}`,
        height: 600,
        alt: "Imagem do Post",
      },
    },
  };
}
const Perfil = ({ data }) => {
  const metadata = generateMetadata(data[0]);

  const { username, createdAt } = data[0];
  const url = data[0].avatar.url;

  return (
    <DefaultLayout metadata={metadata}>
      <div className="container  mx-auto p-4 rounded-lg">
        <section className="flex flex-col items-center justify-center gap-4 py-8 m-10 md:py-10 ">
          <div className="inline-block max-w-lg text-center justify-center">
            <div className={title({ color: "pink" })}>Oi! Eu sou&nbsp;</div>
            <br />

            <div className={title({ color: "brown" })}>{username}&nbsp;</div>
            <div className={title({ color: "pink" })}>e esse&nbsp;</div>

            <br />

            <div className={title({ color: "pink" })}> é o meu perfil </div>
          </div>
        </section>
        <div className="rounded-xl p-4 max-w-[800px] mx-auto bg-[#fef9ff]">
          <div className="flex sm:flex-row flex-col items-center">
            <Image
              alt="Leitora do Feminive Fanfics"
              className="object-cover min-w-[200px]"
              height={200}
              src={`${process.env.NEXT_PRIVATE_URL}${url}`}
              width={200}
            />
            <div className=" px-3 py-0 text-small text-default-400">
              <p className="font-semibold text-lg text-brown md:text-left text-center m-4 md:m-1">
                Quem sou:
              </p>
              <p className=" text-md text-black font-sans mt-3 text-justify hyphens ">
                Mariana, uma profissional altamente frustrada durante o dia, se
                transforma em uma escritora ousada nas noites tranquilas. Sua
                paixão secreta são os contos eróticos, onde explora desejos
                proibidos e fantasias intensas com uma habilidade que mistura
                sedução e suspense. Entre relatórios e prazos, encontra
                inspiração nas nuances da vida cotidiana para criar ou
                simplesmente narrar histórias que desafiam convenções e
                despertam os sentidos.
              </p>
              <span className="pt-2 ">
                #ContosEróticos
                <span className="p-2" aria-label="heart" role="img">
                  💕
                </span>
              </span>
            </div>{" "}
          </div>
        </div>
        <section className="flex flex-col items-center justify-center gap-4 m-20 md:py-10 ">
          <Image src={"/plantas.png"} weight={100} width={200} />{" "}
        </section>
      </div>
    </DefaultLayout>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  const token = process.env.TOKEN;

  const apiUrl = `${process.env.NEXT_PRIVATE_URL}/api/users/?filters[id][$eq]=${id}&populate[avatar][fields][0]=url&fields[0]=id&fields[1]=username&fields[2]=createdAt&pagination[pageSize]=10&pagination[page]=1`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        data: null, // You can handle errors gracefully in your component
      },
    };
  }
};

export default Perfil;
