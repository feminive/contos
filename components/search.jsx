import React, { useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useRouter } from "next/router";
import { Heart } from "@/lib/icons";

export default function Search() {
  const router = useRouter();

  // Controle manual do filtro de pesquisa
  const [filterText, setFilterText] = useState(""); // Estado local para o texto de busca
  const [items, setItems] = useState([]); // Estado local para os itens filtrados
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento

  // Função para buscar os dados com base no filtro
  const searchPosts = async (filterText) => {
    setIsLoading(true);
    try {
      let res = await fetch("/posts.json");

      if (!res.ok) throw new Error("Falha ao carregar posts");

      let json = await res.json();

      // Filtra os posts pelo título ou autor
      const filteredItems = json.filter(
        (item) =>
          item.title.toLowerCase().includes(filterText.toLowerCase()) ||
          item.author.toLowerCase().includes(filterText.toLowerCase())
      );

      // Atualiza os itens filtrados
      setItems(
        filteredItems.map((item) => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
        }))
      );
    } catch (error) {
      console.error("Falha ao buscar dados", error);
      setItems([]); // Caso ocorra erro, reseta a lista
    } finally {
      setIsLoading(false);
    }
  };

  // Chamado sempre que o texto de busca é alterado
  const handleInputChange = (value) => {
    setFilterText(value); // Atualiza o texto do campo de busca
    searchPosts(value); // Realiza a busca
  };

  const handleSelection = (slug) => {
    router.push(`/EroticStories/${slug}`); // Redireciona ao selecionar o post
  };

  return (
    <Autocomplete
      className="w-96 bg-[#fef9ff] rounded-xl"
      startContent={<Heart className="text-xl fill-primary" />}
      inputValue={filterText} // Texto do campo de pesquisa
      isLoading={isLoading} // Exibe o carregamento
      items={items} // Itens filtrados
      size={"sm"}
      placeholder="Search"
      variant="bordered"
      onInputChange={handleInputChange} // Atualiza filtro e faz busca
      aria-label="Campo de pesquisa"
    >
      {(item) => (
        <AutocompleteItem
          key={item.id}
          className="capitalize"
          onClick={() => handleSelection(item.slug)} // Redireciona ao selecionar
        >
          {item.title}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
