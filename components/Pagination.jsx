// Componente de Paginação
export function Pagination({ totalPages, currentPage, paginate }) {
  const pages = [];
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 3);

  // Adiciona a página 1 se necessário
  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) pages.push("..."); // Adiciona os pontos se houver páginas intermediárias
  }

  // Adiciona as páginas do intervalo
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Adiciona a última página se necessário
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) pages.push("..."); // Adiciona os pontos se houver páginas intermediárias
    pages.push(totalPages);
  }

  return (
    <div className="flex justify-center my-10">
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && paginate(page)}
          className={`text-smh-6 w-6 mx-1 ${
            currentPage === page
              ? "bg-brown/80 text-white"
              : "bg-gray-200 text-gray-600"
          } rounded`}
          disabled={page === "..."} // Desabilita o botão de '...' para evitar cliques
        >
          {page}
        </button>
      ))}
    </div>
  );
}
