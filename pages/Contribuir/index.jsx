import { PricingCarousel } from "@/components/hire/pricing/pricing-carousel";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import Link from "next/link";

export default function Home() {
  return (
    <DefaultLayout>
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <section className="flex flex-col items-center justify-center gap-4 py-8 m-10 md:py-10 ">
            <div className="text-center justify-center">
              <div className={title({ color: "brown" })}>
                Escolha um dos planos abaixo &nbsp;
              </div>
              <br />

              <br />

              <h1 className="text-lg text-black/60 mt-1  mx-auto">
                Escolha um dos planos abaixo e me ajude a manter viva a arte de
                escrever contos eróticos{" "}
              </h1>
            </div>
          </section>

          <PricingCarousel />

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
Tem dúvidas ou quer falar pessoalmente? Antes leia as <Link href={"/Regras" }className={"text-brown"}>Regras</Link>             </p>
            <div className="inline-flex items-center justify-center gap-2 text-primary">
              <span className="font-semibold">contos@feminivefanfics.com.br</span>
              <span>•</span>
              <span className="font-semibold"> Whatsapp 21 96786-7385</span>
            </div>
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
}
