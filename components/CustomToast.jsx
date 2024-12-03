import React, { useEffect, useState } from "react";
import { XCircle } from "@phosphor-icons/react";
import Subscribe from "@/components/subscribe";

const Toast = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Comente as próximas duas linhas para não usar localStorage
    const lastShownDate = localStorage.getItem("lastToastDate");
    const currentDate = new Date().toLocaleDateString();

    //Se não existe a data ou se a data é diferente do dia de hoje, exibe o Toast
    //Comente a linha abaixo para forçar o Toast a aparecer sempre em desenvolvimento
    if (lastShownDate !== currentDate) {
      setIsVisible(true); // Aqui você força o Toast a aparecer sempre
    }
  }, []);

  const handleCloseToast = () => {
    // Comente as próximas duas linhas para não salvar a data no localStorage
    const currentDate = new Date().toLocaleDateString();
    localStorage.setItem("lastToastDate", currentDate);
    setIsVisible(false); // Fecha o Toast
  };

  return (
    isVisible && (
      <div className="fixed bottom-2 left-2 z-50">
        <div className="flex">
          {/* <div className="text-white/80  rounded-lg w-full">
            Você pode acompanhar seus contos em ordem clicando em Fanfics!
          </div>
          <a
            onClick={handleCloseToast}
            className="text-gray-300 hover:text-white transition duration-200 text-xl hover:cursor-pointer"
          >
            <XCircle size={22} />
          </a> */}
          <Subscribe />
        </div>
      </div>
    )
  );
};

export default Toast;
