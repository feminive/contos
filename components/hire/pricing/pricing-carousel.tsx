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
    description: "Perfect for small businesses just getting started",
    features: ["Meus sinceros agradecimentos"],
    link: "/plan/starter", // URL exclusiva do plano Starter
  },
  {
    title: "Apoio Único",
    price: "Livre",
    description: "Você não assina nada, mas pode contribuir com o valor que desejar.",
    features: ["Meus sinceros agradecimentos"],
    popular: true,
    link: "/plan/professional", // URL exclusiva do plano Professional
  },
  {
    title: "Mecenas",
    price: "R$25",
    description: "For large organizations with advanced needs",
    features: ["Meus sinceros agradecimentos"],
    link: "/plan/enterprise", // URL exclusiva do plano Enterprise
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
