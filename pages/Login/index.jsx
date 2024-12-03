import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Eye, Eye2 } from "@/lib/icons";
import DefaultLayout from "@/layouts/default";
import Image from "next/image";

import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
} from "@nextui-org/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [selected, setSelected] = useState("login");
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (result.ok) {
      router.replace("/");
    } else {
      toast.error("Senha incorreta, tente novamente!");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const jsonData = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    };

    try {
      const req = await fetch(
        `${process.env.NEXT_PRIVATE_URL}/api/auth/local/register`,
        reqOptions
      );
      const res = await req.json();

      if (res.error) {
        toast.error(res.error.message);
      } else {
        toast.success("Registro realizado com sucesso! Verifique seu email.");
      }
    } catch (error) {
      toast.error("Erro ao registrar. Tente novamente mais tarde.");
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mx-auto mt-20">
        <div className="flex flex-col w-full">
          <Card className="max-w-full w-[340px] h-[400px] mx-auto">
            <CardBody className="overflow-hidden">
              <Tabs
                fullWidth
                size="md"
                aria-label="Tabs form"
                selectedKey={selected}
                onSelectionChange={setSelected}
              >
                <Tab key="login" title="Logar">
                  <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <Image
                      src={"/feminive.png"}
                      width={80}
                      height={80}
                      className="flex  mx-auto"
                      alt={"Avatar Rolando Dados!"}
                    />
                    <Input
                      name="email"
                      isRequired
                      label="Email"
                      placeholder="Insira seu email"
                      type="email"
                    />
                    <Input
                      name="password"
                      isRequired
                      label="Password"
                      placeholder="Insira sua senha"
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <Eye className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <Eye2 className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      type={isVisible ? "text" : "password"}
                    />
                    <p className="text-center text-small">
                      Não tem uma conta?{" "}
                      <Link
                        className={"cursor-pointer"}
                        size="sm"
                        onPress={() => setSelected("sign-up")}
                      >
                        Crie uma conta.
                      </Link>
                    </p>
                    <div className="flex gap-2 justify-end">
                      <Button
                        fullWidth
                        color="primary"
                        type="submit"
                        className="text-white"
                      >
                        {" "}
                        Logar
                      </Button>
                    </div>
                  </form>
                </Tab>
                <Tab key="sign-up" title="Registrar">
                  <form
                    onSubmit={handleRegister}
                    className="flex flex-col gap-4 h-[300px]"
                  >
                    <Input
                      name="username"
                      isRequired
                      label="Nome"
                      placeholder="Escolha um Apelido"
                      type="text"
                      className="mt-6"
                    />
                    <Input
                      name="email"
                      isRequired
                      label="Email"
                      placeholder="Digite seu email"
                      type="email"
                    />
                    <Input
                      name="password"
                      isRequired
                      label="Password"
                      placeholder="Digite sua senha"
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <Eye className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <Eye2 className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      type={isVisible ? "text" : "password"}
                    />
                    <p className="text-center text-small">
                      Já tem uma conta?{" "}
                      <Link
                        size="sm"
                        className={"cursor-pointer"}
                        onPress={() => setSelected("login")}
                      >
                        Logar
                      </Link>
                    </p>
                    <div className="flex gap-2 justify-end">
                      <Button
                        fullWidth
                        color="primary"
                        type="submit"
                        className="text-white"
                      >
                        Registrar
                      </Button>
                    </div>
                  </form>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
          <p className="text-center text-small mt-3">
            Perdeu sua senha?{" "}
            <a
              className={"cursor-pointer text-blue-500"}
              href={"/auth/resetar"}
            >
              Resetar
            </a>
          </p>
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
        theme="light"
      />
    </DefaultLayout>
  );
}
