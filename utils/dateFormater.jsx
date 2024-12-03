export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.toLocaleString("pt-BR", { month: "long" });
  const year = date.getFullYear();

  return `${day} de ${month.charAt(0).toUpperCase() + month.slice(1)} de ${year}`;
};
