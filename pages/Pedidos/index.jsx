import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import { Card, Input, Textarea, Checkbox, Button } from "@nextui-org/react";
import { Heart } from "@/lib/icons";
// import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Mensagem() {
  const [formData, setFormData] = useState({
    sender: "",
    email: "",
    content: "",
    isAdult: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const { data: session } = useSession();
  // const jwtToken = session?.accessToken;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { sender, email, content, isAdult } = formData;

    if (!sender || !email || !content || !isAdult) {
      toast.info(
        "Por favor, preencha todos os campos e confirme que é maior de 18 anos."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`https://feminivefanfics.com.br/api/mails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          data: { sender, email, content, subject: "Pedido de Conto" },
        }),
      });

      if (!response.ok) throw new Error();

      toast.success("Mensagem enviada com sucesso!");
      setFormData({ sender: "", email: "", content: "", isAdult: false });
    } catch {
      toast.error("Algo deu errado. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <div className={title({ color: "pink" })}>Quer algo&nbsp;</div>
          <div className={title({ color: "brown" })}>especial?&nbsp;</div>
          <br />
          <div className={title({ color: "pink" })}>faça um pedido...</div>
        </div>
        <p className="max-w-96 break-words text-justify">
          Algumas vezes muitas histórias ficam muito grandes e não cabem em um
          conto, então se você quiser saber se a história tem continuação ou
          quer história com outros personagens, dê uma conferida na lista!
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="container flex flex-col flex-wrap gap-4 mx-auto items-center"
      >
        <Card className="w-full md:w-96 gap-4 p-4">
          <Input
            type="text"
            label="Apelido"
            isRequired
            name="sender"
            className="border-2 rounded-xl border-brown/40"
            value={formData.sender}
            onChange={handleChange}
          />
          <Input
            type="email"
            label="Email"
            isRequired
            name="email"
            className="border-2 rounded-xl border-brown/40"
            value={formData.email}
            onChange={handleChange}
          />
          <Textarea
            isRequired
            label="Mensagem"
            name="content"
            className="border-2 rounded-xl border-brown/40"
            value={formData.content}
            onChange={handleChange}
          />
          <Checkbox
            icon={<Heart />}
            className="mx-auto text-sm text-white"
            name="isAdult"
            isChecked={formData.isAdult}
            onChange={handleChange}
          >
            <small>Eu sou maior de 18 anos.</small>
          </Checkbox>
          <Button
            type="submit"
            color="primary"
            className="text-white"
            isLoading={isSubmitting}
          >
            Enviar
          </Button>
        </Card>
      </form>
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
