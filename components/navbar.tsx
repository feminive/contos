import {
  Image,
  Link,
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  Button,
  NavbarMenuToggle,
  NavbarItem,
  NavbarMenuItem,
  link as linkStyles,
} from "@nextui-org/react";
import NextLink from "next/link";
import Search from "@/components/search";
import { HeartFilledIcon } from "./icons";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import DropdownNav from "@/components/dropdownNav";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NextUINavbar
      maxWidth="lg"
      position="sticky"
      className={"bg-brown opacity-60"}
    >
      <NavbarContent className="">
        <div className="hidden lg:flex gap-8 ">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "secondary" }),
                  "data-[active=true]:text-secondary text-white  data-[active=true]:font-medium "
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </div>

        {/* <DropdownNav /> */}
      </NavbarContent>
      <NavbarContent className="sm:hidden" justify="center">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full "
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2 ">
        </NavbarItem>
      </NavbarContent>
      {/* <Search /> */}
      <NavbarItem className="hidden md:flex">
        <Button
          isExternal
          as={Link}
          className="text-sm font-normal text-default-600 bg-default-100 h-8"
          href={siteConfig.links.sponsor}
          startContent={<HeartFilledIcon className="text-danger" />}
          variant="flat"
        >
          Sponsor
        </Button>
      </NavbarItem>
      {/* Avatar */}
      <NavbarMenu>
        <div className="mx-auto mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link href={item.href} size="sm" className="text-black">

                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>

    </NextUINavbar>
  );
};
