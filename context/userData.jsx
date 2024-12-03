import React, { createContext, useContext, useState, useEffect } from "react";
// import { useSession } from "next-auth/react";

const UserContext = createContext();

export function userData() {
  return useContext(UserContext);
}

export function DataUserProvider({ children }) {
  const [user, setUser] = useState(null);
  const { data: session, status: sessionStatus } = useSession();

  async function fetchData() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PRIVATE_URL}/api/users?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TOKEN}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      return null;
    }
  }

  async function deserializeData() {
    if (session && sessionStatus === "authenticated") {
      const apiData = await fetchData();
      if (Array.isArray(apiData)) {
        const userData = apiData.find(
          (item) => item.email === session.user.email
        );
        if (userData) {
          // Seleciona apenas as propriedades necessárias
          const { id, avatar, email, username } = userData;
          setUser({ id, avatar, email, username });
        }
      } else {
        console.error(
          "Data is not available or not in expected format:",
          apiData
        );
      }
    }
  }

  useEffect(() => {
    deserializeData();
  }, [session, sessionStatus]);

  return (
    <UserContext.Provider
      value={{ user, loading: sessionStatus === "loading" }}
    >
      {children}
    </UserContext.Provider>
  );
}
