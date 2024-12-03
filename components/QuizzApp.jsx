import React, { useState } from "react";
import { RadioGroup, Radio, Button } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default";
import Image from "next/image";
import Link from "next/link";
import { title } from "@/components/primitives";

// Componente QuizPage atualizado para aceitar as props do JSON
const QuizPage = ({ metaQuiz, questions, resultadoQuiz }) => {
  // State hooks para navegação no quiz
  const [isIntroPage, setIsIntroPage] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  // Verifique se questions existe e tem pelo menos uma questão
  const currentQuestion = questions?.[currentQuestionIndex] || {};

  // Função para calcular o resultado final
  const calculateFinalResult = (points) => {
    if (!resultadoQuiz || resultadoQuiz.length === 0) {
      return { retorno: "Nenhum resultado disponível." }; // Mensagem padrão
    }

    const numericPoints = parseInt(points, 10); // Garantir que estamos lidando com um número

    // Lógica de índice com base nos pontos
    let result = resultadoQuiz.find((result) => numericPoints <= result.pontos);

    if (!result) {
      result = resultadoQuiz[resultadoQuiz.length - 1]; // Se não encontrar, usa o último resultado
    }

    return result || { retorno: "Resultado desconhecido" }; // Fallback
  };

  // Função para ir para a próxima pergunta
  const handleNextQuestion = () => {
    if (selectedValue) {
      const selectedAnswer = currentQuestion?.respostas?.find(
        (res) => res.value === selectedValue
      );
      if (selectedAnswer) {
        const answerValue = parseInt(selectedAnswer.value, 10);
        setTotalPoints(totalPoints + answerValue);
      }

      if (currentQuestionIndex === questions.length - 1) {
        setIsQuizCompleted(true);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedValue("");
      }
    }
  };

  // Calcula o resultado final baseado nos pontos
  const finalResult = calculateFinalResult(totalPoints);

  return (
    <DefaultLayout metadata={generateMetadata(metaQuiz)}>
      <div className="flex flex-col items-center w-full gap-4 mx-auto bg-white mt-10 rounded-xl shadow-md container ">
        {isIntroPage ? (
          <div className="flex sm:flex-row flex-col w-full gap-4">
            <div className="sm:w-2/5 w-full flex flex-col bg-brown/20 pt-10 items-center">
              <h1 className="flex flex-col mx-auto">
                <div className="-mb-4">
                  <div className={title({ color: "pink", size: "sm" })}>
                    Bem-vinda
                  </div>
                </div>
                <div className={title({ color: "brown" })}>ao nosso</div>
                <div className={title({ color: "pink" })}>Quiz Especial</div>
              </h1>
              <div className="text-lg text-black/60 text-center">
                Quiz da Feminive
              </div>
              <Image
                src={metaQuiz?.[0]?.img}
                height={300}
                width={300}
                alt={"Será que eu sou lésbica?"}
                className="mx-auto"
              />
            </div>
            <div className="flex items-center justify-center ">
              <div className="sm:w-3/5 w-full flex flex-col items-center justify-center p-4">
                <div className="flex flex-col w-96 p-4">
                  <h1 className={title({ color: "brown", size: "sm" })}>
                    {metaQuiz?.[0]?.title}
                  </h1>
                </div>

                <p className="text-lg hyphens-auto leading-7 text-justify w-full max-w-[80%] mx-auto mt-10">
                  {metaQuiz?.[0]?.description}
                </p>

                <Button
                  onClick={() => setIsIntroPage(false)}
                  className="bg-brown/80 text-white mt-10"
                >
                  Começar Quiz
                </Button>
              </div>
            </div>
          </div>
        ) : !isQuizCompleted ? (
          <div className="flex sm:flex-row flex-col w-full gap-4">
            <div className="sm:w-3/5 w-full flex flex-col items-start p-4 order-1">
              <h2 className="text-lg font-semibold h-20 flex items-center w-full">
                {currentQuestion?.question}
              </h2>
              {currentQuestion?.respostas?.length > 0 ? (
                <RadioGroup
                  value={selectedValue}
                  onValueChange={setSelectedValue}
                  classNames={{ base: "w-full" }}
                >
                  {currentQuestion.respostas.map((resposta) => (
                    <Radio
                      key={resposta.value}
                      value={resposta.value}
                      classNames={{
                        base: "h-20 leading-tight text-md",
                      }}
                    >
                      {resposta.option}
                    </Radio>
                  ))}
                </RadioGroup>
              ) : (
                <div>Não há respostas disponíveis para esta pergunta.</div>
              )}
              <Button
                onClick={handleNextQuestion}
                disabled={!selectedValue}
                className="mt-14 mx-auto flex bg-brown/80 text-white"
              >
                Próximo
              </Button>
            </div>
            <div className="sm:w-2/5 w-full flex flex-col bg-brown/20 pt-10">
              <h1 className="flex flex-col mx-auto text-center px-10 leading-tight mb-10">
                <div className={title({ color: "blue", size: "sm" })}>
                  {metaQuiz?.[0]?.title}
                </div>

                <div className="text-lg text-black/60">Quiz da Feminive</div>
              </h1>
              <Image
                src={metaQuiz?.[0]?.img}
                height={300}
                width={300}
                alt={"Será que eu sou lésbica?"}
                className="mx-auto"
              />
            </div>
          </div>
        ) : (
          <div className="flex sm:flex-row flex-col w-full h-full gap-4 ">
            <div className="sm:w-3/5 w-full flex flex-col items-center justify-center p-4 order-1">
              <div className="flex items-center justify-center w-full flex flex-col">
                <p className="text-lg hyphens-auto leading-7 text-justify mx-auto ">
                  {finalResult.retorno}
                </p>
                <br />
                <p>
                  Quer tal ler uns contos eróticos e ver como você se sente?
                </p>
                <Link
                  className={"hover:cursor-pointer text-brown/60 m-4"}
                  href={"/"}
                >
                  Contos eróticos da Feminive
                </Link>
              </div>
            </div>
            <div className="sm:w-2/5 w-full flex flex-col justify-center items-center bg-brown/20 pt-10 h-[500px]">
              <h1 className="flex flex-col mx-auto">
                <div className={title({ color: "blue", size: "sm" })}>
                  {finalResult.title}
                </div>
              </h1>
              <h1 className="text-md text-black/60 mb-10">Resultado do Quiz</h1>
              <Image
                src={metaQuiz?.[0]?.img}
                height={300}
                width={300}
                alt={finalResult.title}
              />
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

// Função para gerar o metadata para SEO
function generateMetadata(metaQuiz) {
  if (!metaQuiz?.length) {
    return {}; // Retorna um objeto vazio se metaQuiz estiver vazio
  }

  const { title, description, slug, img, published } = metaQuiz[0] || {}; // Desestruturando diretamente

  return {
    title,
    description,
    canonical: `https://feminivefanfics.com.br/Quiz/${slug}`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: description,
      image: img,
      datePublished: published,
      author: {
        "@type": "Person",
        name: "Feminive Fanfics",
      },
    },
  };
}

export default QuizPage;
