export function readingTime(texto) {
  const caracteres = texto.length; // Conta os caracteres do texto
  const tempoLeituraMinutos = 1 + 5 / 60; // 1:05 em minutos
  const tempoPorCaractere = (tempoLeituraMinutos * 60) / caracteres; // tempo em segundos por caractere
  return tempoPorCaractere;
}
