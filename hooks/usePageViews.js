import { useEffect } from "react";

const usePageView = (page) => {
  useEffect(() => {
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

    incrementVisit();
  }, [page]); // Dependência para o useEffect
};

export default usePageView;
