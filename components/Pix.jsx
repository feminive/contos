import { Link } from "@nextui-org/react";
import Image from "next/image";

export default function Pix() {
    return(
<div>
        <h2 className="text-brown my-9 text-2xl border-s-4 border-[#ff6790] pl-4">Ajude</h2>
        <p className="pl-0 mb-4  break-words text-justify hyphens-auto text-black/80">Gostou dos contos? Ajude a manter o servidor para eu continuar escrevendo aqui. Aponte o QR ou clique pelo <Link href={"https://livepix.gg/feminivefanfics"}> livepix. </Link></p>
        <div className="flex items-center justify-center flex-col">
                 

    <Image src={'/pix.png'} height={200} width={200}/>
    </div>
    </div>
)}