import React from "react";

import { useSession, signOut } from "next-auth/react";

import {
  NavbarContent,
  DropdownMenu,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownItem,
} from "@nextui-org/react";

import { userData, DataUserProvider } from "@/context/userData";

export default function UserLoggedAvatar() {
  const { user } = userData();
  // const { data: session, status } = useSession();
  const handleLogout = async () => {
    await signOut();
  };

  // Verifica se a sessão está carregando ou se os dados da sessão estão vazios
  if (status === "loading" || !session) {
    return null;
  }
  return (
    <NavbarContent as="div" justify="end">
      <DataUserProvider>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              as="button"
              src={
                user && user.avatar
                  ? `https://feminivefanfics.com.br${user.avatar.url}`
                  : undefined
              }
              size="md"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            {/* Exibe o email do usuário */}
            <DropdownItem key="profile" className="h-14 ">
              <p className="font-semibold text-velvet text-lg">
                {session.user?.username}
              </p>

              <small className="font text">{session.user?.email}</small>
            </DropdownItem>
            {/* Adicione outros itens de menu conforme necessário */}

            <DropdownItem href={"/painel"} key="Painel">
              Painel de Controle
            </DropdownItem>

            {/* <DropdownItem href={"/perfil"} key="Perfil">
              Editar Perfil
            </DropdownItem> */}

            {/* <DropdownItem href={"/FAQ"} key="help_and_feedback">
              Perguntas Frequentes{" "}
            </DropdownItem> */}

            {/* Item de menu para fazer logout */}
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Deslogar{" "}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </DataUserProvider>
    </NavbarContent>
  );
}
