import { useEffect, useState } from "react";

const useIncrementOnButtonClick = (initialPage) => {
  const [page, setPage] = useState(initialPage);

  const incrementVisit = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PRIVATE_URL}/api/visitor/increment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ page }),
        }
      );

      if (!response.ok) {
        console.error("Failed to increment visit", response.statusText);
      }
    } catch (error) {
      console.error("Error incrementing visit", error);
    }
  };

  useEffect(() => {
    const handleClick = () => {
      incrementVisit();
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []); // Efeito executado uma vez apenas, sem dependências

  return {
    setPage,
    incrementVisit,
  };
};

export default useIncrementOnButtonClick;
