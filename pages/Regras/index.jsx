import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link'
const metadata = {
  title: "Feminive Fanfics - FAQ",
  description: "Perguntas mais frequentes sobre meus contos eróticos",
  keywords:
    "contos eróticos, fanfics femininas, FAQ, perguntas, mariana responde",

  bookmarks: ["https://feminivefanfics.com.br/FAQ"],
};

export default function Faq() {
  return (
    <DefaultLayout metadata={metadata}>
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-10">
        <div className="inline-block max-w-lg text-center justify-center">
          
          <h2 className={title()}>Regras </h2> <br />
          
          
        </div>
        
      </div>
      <div className="container mx-auto items-center p-10">
  

  <h3 className="font-semibold text-brown/90 text-2xl mt-10">
    Privacidade e limites pessoais
  </h3>
  <p>
    Não compartilho informações pessoais, como endereço, troco fotos, nomes, telefone ou outros dados sensíveis. Respeite minha privacidade, assim como respeitarei a sua.
  </p>

  <h3 className="font-semibold text-brown/90 text-2xl mt-10">
    Sem insistência ou cobranças
  </h3>
  <p>
    Doações são um gesto voluntário e não garantem controle ou influência sobre meu trabalho criativo. É permitido e desejado sugestoões mas pedidos excessivos, insistência ou tentativas de impor mudanças no conteúdo produzido não serão tolerados.
  </p>

  <h3 className="font-semibold text-brown/90 text-2xl mt-10">
    Comportamento apropriado nas interações
  </h3>
  <p>
    Comentários abusivos, preconceituosos, ofensivos ou inadequados resultam no encerramento imediato de qualquer contato e no bloqueio permanente. Não sou prostituta, não envio qualquer tipo de foto e não faço sexting.
  </p>

  <h3 className="font-semibold text-brown/90 text-2xl mt-10">
    Cancelamento de doações
  </h3>
  <p>
    Caso eu sinta que a relação entre criadora e doador não está saudável ou respeitosa, posso optar por encerrar o acesso ou os benefícios associados à doação, mesmo que ela ainda esteja ativa.
  </p>

  <h3 className="font-semibold text-brown/90 text-2xl mt-10">
    Sem favoritismo
  </h3>
  <p>
    O fato de doar não garante prioridade ou favoritismo em relação a outros participantes. Meu trabalho e decisões criativas permanecem independentes.
  </p>

  <h3 className="font-semibold text-brown/90 text-2xl mt-10">
    Sobre reembolsos
  </h3>
  <p>
    Doações não são reembolsáveis, pois representam um apoio voluntário ao meu trabalho. Certifique-se de sua decisão antes de doar.
  </p>

  <h3 className="font-semibold text-brown/90 text-2xl mt-10">
    Termos de uso das plataformas
  </h3>
  <p>
    Além destas regras, você também deve seguir os termos de uso das plataformas que utilizamos para interação e doações. Violações às políticas dessas plataformas não serão toleradas.
  </p>

  <h3 className="font-semibold text-brown/90 text-2xl mt-10">
    Atualização de regras
  </h3>
  <p>
    Estas regras podem ser ajustadas ou atualizadas conforme necessário. Sempre verifique os termos antes de realizar uma nova doação.
  </p>
</div>

    </DefaultLayout>
  );
}
