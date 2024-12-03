import { useEffect } from "react";
import { useRouter } from "next/router";

const CustomError = ({ statusCode }) => {
  const router = useRouter();

  useEffect(() => {
    if (statusCode === 404) {
      router.replace("/"); // Redireciona para a página de erro 410
    }
  }, []);

  return null;
};

CustomError.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomError;
