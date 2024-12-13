"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/hire/ui/carousel";
import { PriceCard } from "./price-card";

const pricingPlans = [
  {
    title: "Apoiador",
    price: "R$10",
    description: "Faça parte do grupo de apoiadores me ajudando a manter o trabalho mensalmente",
    link: "https://livepix.gg/feminivefanfics/Apoiador", 
    features: ["Meus sinceros agradecimentos", "Votação para novos temas", "Contato direto"],
  },
  {
    title: "Faça um Pix",
    price: "Livre",
    description: "Não há nenhum tipo de assinatura, apenas um pix demonstrando sua apreciação pelo meu trabalho!",
    popular: true,
    link: "https://livepix.gg/feminivefanfics", 
    features: ["Meus sinceros agradecimentos", "Sugestão de temas para um novo conto."],
  },
  {
    title: "Mecenas",
    price: "R$25",
    description: "Para quem realmente é um entusiasta e ama trocar ideias sobre o assunto",
    link: "https://livepix.gg/feminivefanfics/mecenas", 
    features: ["Meus sinceros agradecimentos", "Votação para novos temas", "Contato direto", "Receba os contos antecipadamente por email", "Contato direto com a autora"],
  },
];

export function PricingCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-5xl mx-auto"
    >
      <CarouselContent>
        {pricingPlans.map((plan, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-2">
              <PriceCard {...plan} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
