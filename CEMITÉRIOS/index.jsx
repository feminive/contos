import React, { useState } from "react";
import { RadioGroup, Radio, Button } from "@nextui-org/react";
import { questions, resultadoQuiz, intro, metaQuiz } from "@/quiz/lesbica"; // Importando as perguntas e resultados do quiz
import DefaultLayout from "@/layouts/default";
import Image from "next/image";
import { title } from "@/components/primitives";
import Link from "next/link";

function generateMetadata(metaQuiz) {
  // Acessando o primeiro item do array meta
  const firstMetaItem = metaQuiz[0];

  return {
    title: firstMetaItem.title,
    description: firstMetaItem.description,
    canonical: `https://feminivefanfics.com.br/Quiz/${firstMetaItem.slug}`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: firstMetaItem.title,
      alternativeHeadline: "Feminive Fanfics - Contos Eróticos",
      image: `https://feminivefanfics.com.bg/${firstMetaItem.img}`,
      award: "Os melhores quizzes da internet",
      editor: "Mariana",
      genre: "Quiz",
      wordcount: "1120",
      publisher: "Feminive Fanfics",
      url: `https://feminivefanfics.com.br/EroticStories/${firstMetaItem.slug}`,
      datePublished: firstMetaItem.published,
      dateCreated: firstMetaItem.published,
      dateModified: firstMetaItem.published,
      description: firstMetaItem.description,
      articleBody: firstMetaItem.content,
      author: {
        "@type": "Person",
        name: "Mariana",
      },
    },
    openGraph: {
      title: firstMetaItem.title,
      description: firstMetaItem.description,
      publishedTime: firstMetaItem.published,
      authors: "Feminive",
      url: `https://feminivefanfics.com.br/Quiz/${firstMetaItem.slug}`,
      type: "article",
      images: {
        url: `https://feminivefanfics.com.br/${firstMetaItem.img}`,
        height: 600,
        alt: "Imagem do Post",
      },
    },
  };
}

function QuizApp() {
  const [isIntroPage, setIsIntroPage] = useState(true); // Estado para página inicial
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const currentQuestion = questions[currentQuestionIndex];

  const calculateFinalResult = (points) => {
    let resultIndex = 0;
    if (points <= 10) {
      resultIndex = 0;
    } else if (points > 10 && points <= 20) {
      resultIndex = 1;
    } else if (points > 20 && points <= 30) {
      resultIndex = 2;
    } else if (points > 30) {
      resultIndex = 3;
    }
    return resultadoQuiz[resultIndex];
  };

  const handleNextQuestion = () => {
    if (selectedValue) {
      const selectedAnswer = currentQuestion.respostas?.find(
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

  const finalResult = calculateFinalResult(totalPoints);

  return (
    <DefaultLayout metadata={generateMetadata(metaQuiz)}>
      <div className="flex flex-col items-center w-full gap-4 mx-auto bg-white mt-10 rounded-xl shadow-md container">
        {isIntroPage ? (
          // Página de introdução
          <div className="flex flex-col items-center text-center p-8">
            <div className={title({ color: "brown" })}>{intro[0].title}</div>

            <p className="text-lg hyphens-auto leading-7 text-justify w-full max-w-[80%] mx-auto mt-10">
              {intro[0].text}{" "}
            </p>
            <Button
              onClick={() => setIsIntroPage(false)}
              className="bg-brown/80 text-white mt-10"
            >
              Começar Quiz
            </Button>
          </div>
        ) : !isQuizCompleted ? (
          // Exibindo as perguntas enquanto o quiz não estiver completo
          <div className="flex sm:flex-row flex-col w-full gap-4">
            <div className="sm:w-3/5 w-full flex flex-col items-start p-4 order-1 ">
              <h2 className="text-lg font-semibold h-20 flex items-center w-full">
                {currentQuestion.question}
              </h2>

              {currentQuestion.respostas &&
              currentQuestion.respostas.length > 0 ? (
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
              <h1 className="flex flex-col mx-auto">
                <div className={title({ color: "pink", size: "sm" })}>
                  A Beleza
                </div>
                <div className={title({ color: "brown" })}>inexorável</div>
                <div className={title({ color: "pink" })}>
                  do querer desejar
                </div>
                <div className="text-lg text-black/60">Quiz da Feminive</div>
              </h1>
              <Image
                src={"/quiz/lesbicas-quiz.webp"}
                height={300}
                width={300}
                alt={"Será que eu sou lésbica?"}
                className="mx-auto"
              />
            </div>
          </div>
        ) : (
          <div className="flex sm:flex-row flex-col w-full gap-4">
            <div className="sm:w-3/5 w-full flex flex-col items-center justify-center p-4 order-1">
              <div className="flex items-center justify-center w-full flex flex-col">
                <p className="text-lg hyphens-auto leading-7 text-justify  mx-auto ">
                  {finalResult.retorno}
                </p>{" "}
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
            <div className="sm:w-2/5 w-full flex flex-col justify-center items-center bg-brown/20 pt-10">
              <h1 className="flex flex-col mx-auto">
                <div className={title({ color: "blue", size: "sm" })}>
                  {finalResult.title}
                </div>
              </h1>
              <h1 className="text-md text-black/60">Resultado do Quiz</h1>
              <Image
                src={"/quiz/lesbicas-quiz.webp"}
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
}

export default QuizApp;
