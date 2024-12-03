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
          <h2 className={title({ color: "pink" })}>
            Perguntas frequentes &nbsp;
          </h2>
          <h2 className={title({ color: "pink" })}>sobre os meus </h2> <br />
          <h1 className={title({ color: "brown" })}>Contos eróticos&nbsp;</h1>
          <br />
        </div>
        <p className=" break-words text-justify">
          Você também pode enviar sua pergunta caso queira tirar uma dúvida!
        </p>
      </div>
      <div className="container mx-auto items-center p-10">
        <h3 className="font-semibold text-brown/90 text-2xl">
          Os contos eróticos são verdadeiros?{" "}
        </h3>
        <p>
          A grande maioria sim, ou aconteceram integralmente ou são parte de
          histórias que aconteceram com amigas próximas.
        </p>
        <h3 className="font-semibold text-brown/90 text-2xl mt-10">
          É você nos contos eróticos?
        </h3>
        <p>
          Muitos sim, algumas vezes eu mudo algumas coisas, deixo mais
          interessante, coloco coisas que eu gostaria de ter falado ou ter
          feito. Muitas experiências minhas não foram boas mas a situação foi
          interessante, e quando é assim eu dou uma melhoradinha. Em alguns
          outros contos talvez seja somente meu <i>Alter Ego</i>.
        </p>
        <h3 className="font-semibold text-brown/90 text-2xl mt-10">
          Alguns contos eróticos são escritos de formas diferente, você escreveu
          todos eles?
        </h3>
        <p>
          Todos foram escritos por mim, alguns eu escrevi há anos atrás e apenas
          copiei e colei aqui no blog. Eu sempre tive um sonho de escrever um
          blog do meu jeito, e o exercício de escrever está me fazendo melhorar.
          Ah! E mesmo os que tem o POV masculino, também sou eu que escrevo, é
          uma tara minha, queria ter nascido homem eu acho.
        </p>{" "}
        <h3 className="font-semibold text-brown/90 text-2xl mt-10">
          Você é Bi, lésbica ou hétera?
        </h3>
        <p>
          Olha, eu tenho momentos! Já namorei meninas, mas gosto e tendo muito a
          prefirir a tosquice dos homens, infelizmente eu tenho esse defeito.
        </p>
        <h3 className="font-semibold text-brown/90 text-2xl mt-10">
          No seus contos eróticos ninguém usa camisinha?
        </h3>
        <p>
          Todo mundo é grandinho e sabe que tem que se proteger, eu não vou
          ficar narrando homem brigando para colocar camisinha no pau duranta a
          foda né gente!
        </p>
        <h3 className="font-semibold text-brown/90 text-2xl mt-10">
          Você tem redes sociais?
        </h3>
        <p>
          Sim, mas não vou divulgar minhas redes, prefiro manter meu perfil
          pessoal escondido. Hoje eu sou bem casada e não pretendo conhecer nem
          homens e nem mulheres. Tão pouco quero receber ou trocar fotos, videos
          ou qualquer coisa do tipo! Se quiser me mandar contos que você
          escreveu pode me procurar em qualquer link disponível no site.
        </p>
        <h3 className="font-semibold text-brown/90 text-2xl mt-10">
          Eu posso pedir um conto erótico com um tema especial? É gratuito?
        </h3>
        <p>
          Eu adoraria fazer o exercício de pensar na sua ideia se estiver dentro
          de minhas capacidades e vivências. Eu só não topo, pedofilia, animais,
          gore, essas bizarrices... E sim, é gratuito, mas se puder contribua para manter os custos do site <Link href={'/Contribua' }className='text-brown'>clicando aqui</Link>
        </p>
             <h3 className="font-semibold text-brown/90 text-2xl mt-10">
Posso te mandar nudes e videos?        </h3>
        <p>
          Prefiro que mande dinheiro se quiser minha atenção! Foto de pinto e pepeca, na internet tem muitos mais bonitos que o seus e a minha.
        </p>
      </div>
    </DefaultLayout>
  );
}
