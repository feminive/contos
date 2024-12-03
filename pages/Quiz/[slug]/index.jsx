import fs from "fs";
import path from "path";
import QuizApp from "../../../components/QuizzApp";

// Função para definir os caminhos das páginas estáticas
export async function getStaticPaths() {
  const quizDir = path.join(process.cwd(), "data", "quiz");
  const filenames = fs.readdirSync(quizDir);

  const paths = filenames.map((filename) => {
    const slug = filename.replace(".json", "");
    return { params: { slug } };
  });

  return {
    paths,
    fallback: false, // fallback false para gerar erro 404 para slugs não existentes
  };
}

// Função para obter os dados no momento da build
export async function getStaticProps({ params }) {
  const { slug } = params;

  // Resolve o caminho do arquivo JSON
  const filePath = path.join(process.cwd(), "data", "quiz", `${slug}.json`);

  // Lê o arquivo JSON
  let data = { metaQuiz: [], questions: [], resultadoQuiz: [] };
  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    console.error("Erro ao ler o arquivo JSON:", error);
  }

  return {
    props: {
      metaQuiz: data.metaQuiz,
      questions: data.questions,
      resultadoQuiz: data.resultadoQuiz,
      slug,
    },
  };
}

export default function QuizPage({ metaQuiz, questions, resultadoQuiz, slug }) {
  return (
    <div>
      <QuizApp
        slug={slug}
        metaQuiz={metaQuiz}
        questions={questions}
        resultadoQuiz={resultadoQuiz}
      />
    </div>
  );
}
