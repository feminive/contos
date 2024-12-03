import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
} from "@nextui-org/react";

import DefaultLayout from "@/layouts/default";

import { title } from "@/components/primitives";

import fs from "fs";

import path from "path";

import Link from "next/link";

export async function getStaticProps() {
  const quizDir = path.join(process.cwd(), "data", "quiz");

  // Read all filenames in the directory
  const filenames = fs.readdirSync(quizDir);

  // Attempt to parse each JSON file and filter out invalid ones
  const quizzes = filenames.reduce((acc, filename) => {
    const filePath = path.join(quizDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");

    try {
      // Attempt to parse JSON content
      const quizData = JSON.parse(fileContents);
      acc.push(quizData);
    } catch (error) {
      console.error(`Error parsing JSON file ${filename}:`, error.message);
    }

    return acc;
  }, []);

  return {
    props: {
      quizzes,
    },
  };
}

export default function Quizzes({ quizzes }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };
  return (
    <DefaultLayout>
      <div className="novelas-page container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl p-4 bg-brown/10">
        {quizzes.map((quiz, index) => (
          <Link
            key={quiz.metaQuiz[0].slug}
            href={`/Quiz/${quiz.metaQuiz[0].slug}`}
          >
            <Card key={index} className="w-full shadow-md hover:cursor-pointer">
              <CardHeader className="flex flex-col items-start justify-start  h-[70px] leading-tight">
                <div className={title({ color: "blue", size: "card" })}>
                  {quiz.metaQuiz[0].title}
                </div>
              </CardHeader>
              <CardBody className="overflow-visible">
                <div className="w-full h-68">
                  <Image
                    alt="Quiz image"
                    className="object-cover rounded-xl w-full h-full"
                    src={`${quiz.metaQuiz[0].img}`}
                    layout="responsive"
                    width={500}
                    height={280}
                  />
                </div>
                <p className="text-md mt-4">{quiz.metaQuiz[0].description}</p>
              </CardBody>
              <CardFooter className="flex flex-row justify-between">
                <div className="text-sm text-gray-600">
                  <p className="text-sm italic">
                    Publicado em {formatDate(quiz.metaQuiz[0].published)}
                  </p>{" "}
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </DefaultLayout>
  );
}
