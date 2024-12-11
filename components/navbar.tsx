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
//import UserLogedAvatar from "@/components/avatarLogado";
// import UserUnlogedAvatar from "@/components/avatarDeslogado";
import { siteConfig } from "@/config/site";
import DropdownNav from "@/components/dropdownNav";
import { useSession } from "next-auth/react";
import { useState } from "react";
// import { ReadingProgressBar } from '@/components/progress-bar';
export const Navbar = () => {
  //const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NextUINavbar
      maxWidth="lg"
      position="sticky"
      className={"bg-brown opacity-60"}
    >
      <NavbarContent className="">
        {/* <NavbarBrand className="gap-4 max-w-fit">
          <NextLink
            className="sm:hidden flex justify-start items-center gap-1"
            href="/"
          >
            <Image src={"/feminive.png"} alt={"Logo"} height={50} width={50} />
          </NextLink>
        </NavbarBrand> */}
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

        <DropdownNav />
      </NavbarContent>
      <NavbarContent className="sm:hidden" justify="center">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full "
         justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2 " >
          {/* <Link isExternal href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link> */}
        </NavbarItem>
        {/* <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem> */}
        
      </NavbarContent>
      <Search />
      <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100 h-8"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Patrocine
          </Button>
        </NavbarItem>
      {/* Avatar */}
      <NavbarMenu>
        <div className="mx-auto mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link href={item.href} size="sm" className="text-black">
                {/* testei um li para ver se tira o erro qualquer coisa errada o problema é aqui  */}
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
   
      </NavbarMenu>

      {/* {status === "authenticated" ? <UserLogedAvatar /> : <UserUnlogedAvatar />} */}
      {/* <ReadingProgressBar /> */}

    </NextUINavbar>
  );
};
