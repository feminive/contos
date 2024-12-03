import React from "react";
import {
  NavbarContent,
  NavbarItem,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/react";

export default function App() {
  return (
    <>
      <NavbarContent>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-white text-md hidden lg:flex "
                radius="sm"
                variant="light"
              >
                Outros
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4 ",
              title: "text-lg text-brown ",
            }}
          >
            <DropdownItem
              key="pedidos"
              href="/Pedidos"
              description="Quer fazer um pedido de conto com a sua fantasia? Me conta que eu escrevo."
              className="text-lg"
              color="none"
            >
              Pedidos
            </DropdownItem>

            <DropdownItem
              key="contatos"
              href="/Contatos"
              description="Problemas no site ou precisa falar com para uma parceria? Entre em contato! "
              className="text-lg"
              color="none"
            >
              Contato
            </DropdownItem>
            <DropdownItem
              href="/FAQ"
              key="faq"
              description="Aqui eu respondo as perguntas mais frequentes que me fazem! "
              className="text-lg"
              color="none"
            >
              Perguntas Frequentes
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </>
  );
}
