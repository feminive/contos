export function formatString(str) {
  // Remove acentos
  const noAccent = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const noPunctuation = noAccent.replace(/[^\w\s]|_/g, "");
  return noPunctuation.replace(/\s+/g, "-").toLowerCase();
}
