import React, { useState, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { userData } from "@/context/userData";
import { title } from "@/components/primitives";
import { Eye, Eye2 } from "@/lib/icons";

export default function Resetar() {
  const { theme, setTheme } = useTheme();
  const { user } = userData();
  const router = useRouter();

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    resetCode: "",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const resetCode = urlParams.get("code");
    if (resetCode) {
      setFormData((formData) => ({ ...formData, resetCode }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PRIVATE_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: formData.resetCode,
        password: formData.password,
        passwordConfirmation: formData.password, // Assuming this is still required
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success("Senha redefinida com sucesso!");
          router.push("/login"); // Redirect to the main page
        } else {
          toast.error("Erro ao redefinir a senha");
        }
      })
      .catch((error) => {
        toast.error("Erro ao definir a senha");
      });
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1
          className={title({
            size: "md",
            color: "brown",
          })}
        >
          Redefinir Senha&nbsp;
        </h1>
        <p>Insira sua nova senha e guarde ela com carinho! </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-80"
        >
          <Input
            isRequired
            id="password"
            name="password"
            label="Nova Senha"
            value={formData.password}
            onChange={handleChange}
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
          <Button type="submit" color={"primary"} className="text-white">
            Redefinir
          </Button>
        </form>
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
        theme={theme}
      />
    </>
  );
}
