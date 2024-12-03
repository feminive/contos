const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Configuração inicial
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Pergunta para o usuário
const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

// Caminho do diretório onde os arquivos serão salvos
const POST_DIR = path.join(__dirname, "../posts");

// Verifica se o diretório existe, senão cria
if (!fs.existsSync(POST_DIR)) {
  fs.mkdirSync(POST_DIR, { recursive: true });
}

// Função principal
(async () => {
  try {
    // Coleta os dados do usuário
    const title = await question("Título: ");
    const author = await question("Autor: ");
    const slug = await question("Slug: ");
    const published = await question("Data de publicação (YYYY-MM-DD): ");
    const description = await question("Descrição: ");
    const episode = await question("Número do episódio: ");
    const novela = await question("Novela: ");
    const novelSlug = await question("Slug da novela: ");
    const category = await question("Categorias (separadas por vírgula): ");
    const img = await question("Imagem (nome do arquivo): ");
    const novelaDesc = await question("Descrição da novela: ");

    // Conteúdo do arquivo
    const content = `---
title: ${title}
author: ${author}
slug: ${slug}
published: ${published}
description: ${description}
episode: ${episode}
novela: ${novela}
novelSlug: ${novelSlug}
category: ${category}
img: ${img}
novelaDesc: ${novelaDesc}
---
`;

    // Caminho do arquivo
    const filePath = path.join(POST_DIR, `${slug}.md`);

    // Cria o arquivo
    fs.writeFileSync(filePath, content);

    console.log(`Arquivo criado com sucesso: ${filePath}`);
  } catch (error) {
    console.error("Erro ao criar o arquivo:", error);
  } finally {
    rl.close();
  }
})();
