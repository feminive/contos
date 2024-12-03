import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import Pix from "@/components/Pix"

export default function Contribua() {
  
  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <div className={title({ color: "pink" })}>Quer mandar&nbsp;</div>
          <div className={title({ color: "brown" })}>Nudes?&nbsp;</div>
          <br />
          <div className={title({ color: "pink" })}>faça melhor que isso...</div>
        </div>
        <p className="max-w-96 break-words hyphens text-justify mt-10">
          O moço da internet não aceita os nudes que vocês me mandam, infelizmente sempre são uns pintos muito feios! Então podem me mandar dinheiro que é melhor! 
          Falando sério, os custos para manter um site são muito altos e você pode me ajudar! Qualquer contribuição será muito legal e você pode pedir um conto só para você!</p>
          <div className="mt-10">
          <Pix />
          </div>
      </div>


     
          </DefaultLayout>
  );
}
