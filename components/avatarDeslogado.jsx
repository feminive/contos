import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  DropdownMenu,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
} from "@nextui-org/react";
export default function UserUnlogedAvatar() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/Login");
  };

  return (
    <>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button size={"sm"} className="text-black/80 bg-white/60">
              Login
            </Button>
          </DropdownTrigger>

          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem
              key="logout"
              color="success"
              onClick={handleLoginClick}
            >
              Logar
            </DropdownItem>

            <DropdownItem href={"/FAQ"} key="help_and_feedback">
              Perguntas Frequentes{" "}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      {/* Avatar */}
    </>
  );
}
