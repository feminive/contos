import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { userData } from "@/context/userData";
import { title } from "@/components/primitives";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Input, Button, Card, CardBody, Image } from "@nextui-org/react";
export default function Resetar() {
  const [formData, setFormData] = useState({ email: "" });
  const { user } = userData();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PRIVATE_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Exibir uma mensagem de sucesso para o usuário
        toast.success("Um email para redefinição de senha foi enviado.");
      })
      .catch((error) => {
        console.error("Erro ao redefinir a senha:", error);
        // Lidar com erros, como mostrar uma mensagem de erro para o usuário
        toast.error("Erro ao redefinir a senha. Por favor, tente novamente.");
      });
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mx-auto mt-20">
        <div className="flex flex-col w-full">
          <Card className="max-w-full w-[340px] h-[400px] mx-auto p-4">
            <CardBody className="overflow-hidden mx-auto flex items-center">
              <Image
                alt={"feminive"}
                src={"/feminive.png"}
                width={80}
                height={80}
                className="flex  mx-auto mt-4"
              />{" "}
              <div className="flex mx-auto mt-4">
                <h1
                  className={title({
                    size: "sm",
                    color: "brown",
                  })}
                >
                  Resetar Senha&nbsp;
                </h1>
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 "
              >
                <Input
                  isRequired
                  type="email"
                  id="email"
                  name="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border-1 rounded-xl"
                />
                <Button
                  type="submit"
                  color={"primary"}
                  className="mt-5 text-white"
                >
                  Resetar
                </Button>
              </form>
            </CardBody>
          </Card>
        </div>
      </section>
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
      />
    </DefaultLayout>
  );
}
