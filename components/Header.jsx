import { Image } from "@nextui-org/react";
import NextLink from "next/link";
export default function Header() {
  return (
    <div className="flex  items-center justify-center gap-4  h-[180px]  bg-skin">
      <NextLink href={"/"}>
        <Image
          src={"/feminive.png"}
          width={120}
          height={120}
          alt={"Rolandoo dados Logo"}
        />
      </NextLink>
    </div>
  );
}
