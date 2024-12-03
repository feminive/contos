import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bell } from "phosphor-react";

export default function Subscribe() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Escolhe"]));
  const [isOver18Checked, setIsOver18Checked] = React.useState(false);

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const handleSubmit = async () => {
    // Validar email
    if (!validateEmail(email)) {
      toast.error("Por favor, insira um email válido.");
      return;
    }

    // Validar checkbox de maior de 18 anos
    if (!isOver18Checked) {
      toast.error("Você deve declarar ser maior de 18 anos.");
      return;
    }

    // Se tudo estiver válido, prosseguir com o envio
    const payload = {
      data: {
        email: email,
      },
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PRIVATE_URL}/api/subscribers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        toast.error(
          "Erro ao enviar inscrição. Por favor, tente novamente mais tarde."
        );
      } else {
        toast.success("Inscrição realizada com sucesso!");
        onClose(); // Fechar modal após sucesso
      }
    } catch (error) {
      toast.error("Algo deu errado ao enviar a inscrição.");
    }
  };

  // Função para validar formato de email
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <>
      <div
        onClick={onOpen}
        className="flex items-center justify-center text-white bg-brown p-4 rounded-full w-full cursor-pointer"
      >
        <Bell size={32} />
      </div>

      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Cadastrar newsletter
          </ModalHeader>
          <ModalBody>
            <Input
              label="Email"
              variant="bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex py-2 px-1 justify-between">
              <Checkbox
                checked={isOver18Checked}
                onChange={(e) => setIsOver18Checked(e.target.checked)}
                classNames={{
                  label: "text-small",
                }}
              >
                <span className="text-brown">
                  {" "}
                  Declaro ser maior de 18 anos!
                </span>
              </Checkbox>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Fechar{" "}
            </Button>
            <Button
              color="primary"
              onPress={handleSubmit}
              className="text-white"
            >
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
