import { title, subtitle } from "@/components/primitives";

import { Voltar } from "@/lib/icons";
import { Link } from "@nextui-org/react";
export default function NotFound() {
  return (
    <div className="bg-brown min-h-screen min-w-full">
      <section
        className="flex flex-col items-center  justify-center  "
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="inline-block max-w-lg  align-middle text-center justify-center">
          <h1 className={title({ color: "white" })}>O erro é &nbsp;</h1>
          <h1 className={title({ color: "pale" })}>404&nbsp;</h1>
          <br />
          <h1 className={title({ color: "white" })}>Página não encontrada</h1>

          <h2 className={subtitle()}>Quer ler mais contos? </h2>
        </div>
        <Link href={"/"}>
          <Voltar size={50} fill={"pink"} />
        </Link>
      </section>
    </div>
  );
}
