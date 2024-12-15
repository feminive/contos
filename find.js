const fs = require("fs/promises");
const path = require("path");
const matter = require("gray-matter");

// Função recursiva para encontrar todos os arquivos Markdown
async function getAllMarkdownFiles(dir) {
  let results = [];
  const list = await fs.readdir(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      // Se for diretório, busca recursivamente
      results = results.concat(await getAllMarkdownFiles(filePath));
    } else if (file.endsWith(".md")) {
      // Se for um arquivo Markdown, adiciona na lista
      results.push(filePath);
    }
  }
  return results;
}

// Função para organizar os dados por novela e títulos
async function organizeNovelsAndTitles(markdownFiles) {
  const novelas = {};

  for (const filePath of markdownFiles) {
    const fileContents = await fs.readFile(filePath, "utf8");
    const { data } = matter(fileContents);

    if (data.novela && data.title) {
      if (!novelas[data.novela]) {
        novelas[data.novela] = [];
      }
      novelas[data.novela].push(data.title);
    }
  }

  return novelas;
}

// Exemplo de uso
(async () => {
  try {
    const directory = path.join(__dirname, "posts"); // Substitua "posts" pelo diretório desejado
    const markdownFiles = await getAllMarkdownFiles(directory);
    const novelasAndTitles = await organizeNovelsAndTitles(markdownFiles);

    console.log("Novelas e Títulos:");
    for (const [novela, titles] of Object.entries(novelasAndTitles)) {
      console.log(novela);
      titles.forEach(title => console.log(`  - ${title}`));
    }
  } catch (error) {
    console.error("Erro ao processar os arquivos Markdown:", error);
  }
})();
