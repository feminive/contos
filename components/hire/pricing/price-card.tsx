"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/hire/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/hire/ui/card";

interface PriceCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export function PriceCard({ title, price, description, features, popular }: PriceCardProps) {
  return (
    <Card className={`w-[300px] ${popular ? 'border-primary shadow-lg' : ''}`}>
      <CardHeader>
        {popular && (
          <div className="px-3 py-1 text-sm text-white bg-primary rounded-full w-fit mb-2">
            Popular
          </div>
        )}
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-muted-foreground">
            {price === "Livre" ? "/único" : "/mensal"}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={popular ? "default" : "outline"}>
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
}
