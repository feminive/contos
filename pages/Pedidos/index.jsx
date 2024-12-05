import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import { Card, Input, Textarea, Checkbox, Button } from "@nextui-org/react";
import { Heart } from "@/lib/icons";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import "react-toastify/dist/ReactToastify.css";

export default function Mensagem() {
  const [formData, setFormData] = useState({
    from_name: "",
    to_name: "Equipe de Contos", // Valor fixo como destinatário
    message: "",
    reply_to: "",
    isAdult: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { from_name, reply_to, message, isAdult } = formData;

    if (!from_name || !reply_to || !message || !isAdult) {
      toast.info(
        "Por favor, preencha todos os campos e confirme que é maior de 18 anos."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Configurações do EmailJS
      const serviceId = "service_7atpyxb"; // Substitua pelo seu Service ID
      const templateId = "template_dmniykd"; // Substitua pelo seu Template ID
      const publicKey = "jj7LO7dHGgPDbsogl"; // Substitua pelo seu Public Key

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.from_name,
          to_name: formData.to_name,
          message: formData.message,
          reply_to: formData.reply_to,
        },
        publicKey
      );

      toast.success("Mensagem enviada com sucesso!");
      setFormData({
        from_name: "",
        to_name: "Equipe de Contos",
        message: "",
        reply_to: "",
        isAdult: false,
      });
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      toast.error("Algo deu errado. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-10 container p-4">
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
        className="container flex flex-col flex-wrap gap-4 mx-auto items-center p-4"
      >
        <Card className="w-full md:w-96 gap-4 p-4">
          <Input
            type="text"
            label="Seu Nome (Apelido)"
            isRequired
            name="from_name"
            className="border-2 rounded-xl border-brown/40"
            value={formData.from_name}
            onChange={handleChange}
          />
          <Input
            type="email"
            label="Seu Email"
            isRequired
            name="reply_to"
            className="border-2 rounded-xl border-brown/40"
            value={formData.reply_to}
            onChange={handleChange}
          />
          <Textarea
            isRequired
            label="Mensagem"
            name="message"
            className="border-2 rounded-xl border-brown/40"
            value={formData.message}
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
