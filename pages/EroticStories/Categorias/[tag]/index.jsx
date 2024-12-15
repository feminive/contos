import React, { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import "react-toastify/dist/ReactToastify.css";

import { Calendar, Heart, Time, Eye } from "@/lib/icons";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { Pagination } from "@nextui-org/react";
// import { Rating, RoundedStar } from "@smastrom/react-rating";
import readingTime from "reading-time";

export async function getServerSideProps({ params }) {
  let tags = params;

  let post = await getPostByTag("/api/posts", params);
  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post, tags },
  };
}

export default function Categories({ post, tags }) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [postsToShow, setPostsToShow] = useState([]);
  // const [ratings, setRatings] = useState({});
  const myStyles = {
    itemShapes: RoundedStar,
    activeFillColor: "#ffab18",
    inactiveFillColor: "lightgray",
  };

  // useEffect(() => {
  //   setPostsToShow(post.data); // Assuming post.data contains the array of posts

  //   fetch(`${process.env.NEXT_PRIVATE_URL}/api/votos`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const ratingsData = {};
  //       data.data.forEach((item) => {
  //         const { slug, votos } = item.attributes;
  //         const totalVotes = votos.length;
  //         const totalSum = votos.reduce(
  //           (sum, vote) => sum + vote.review.vote,
  //           0
  //         );
  //         ratingsData[slug] = totalSum / totalVotes;
  //       });
  //       setRatings(ratingsData);
  //     })
  //     .catch((error) => {
  //     });
  // }, [post]);

  return (
    <DefaultLayout>
      <div div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-10">
          <div className="inline-block max-w-lg text-center justify-center">
            <h1 className={title({ color: "pink" })}>Você está vendo contos</h1>

            <h2 className={title({ color: "pink" })}> com tema &nbsp;</h2>
            <h2 className={title({ color: "brown" })}>{tags.tag}</h2>
            <br />
          </div>
          {/* <p className="max-w-96 break-words text-justify">
            Algumas vezes muitas histórias ficam muito grandes e não cabem em um
            conto, então se você quiser saber se a história tem continuação ou
            quer história com outros personagens, dê uma conferida na lista!
          </p> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-4">
          {postsToShow.map((post) => {
            const stats = readingTime(post.content);
            const readingTimeText = stats.text.replace("min read", "min");

            // const averageRating = ratings[post.slug] || 0;

            return (
              <Card
                key={post.id}
                className="w-full   p-1 shadow-none bg-[#fef9ff] "
              >
                <CardHeader className="flex justify-between items-start">
                  <h2 className={"text-xl  text-brown  leading-6"}>
                    <Link href={`/EroticStories/${post.slug}`} passHref>
                      {post.title}
                    </Link>
                  </h2>
                  {/* <Rating
                    // style={{ maxWidth: 100 }}
                    readOnly
                    value={averageRating}
                    itemStyles={myStyles}
                    className="max-w-[80px] md:max-w-[100px]"
                  /> */}
                </CardHeader>
                <div className="flex flex-row gap-2  -mt-1 mb-2 ml-3 items-center">
                  <Calendar size={16} fill={"brown"} />
                  <small className="text-primary -ml-1">
                    {post.publishedAt
                      ? new Intl.DateTimeFormat("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }).format(new Date(post.publishedAt))
                      : "Data de publicação não disponível"}
                  </small>
                  <Heart size={16} fill={"brown"} />
                  <small className="text-primary -ml-1">{post.username}</small>
                  <Eye size={16} color={"brown"} className="opacity-60" />
                  <small className="text-primary -ml-1"> </small>{" "}
                  <Time size={14} color={"brown"} />
                  <small className="text-primary -ml-1">
                    {readingTimeText}
                  </small>
                </div>
                <CardBody>
                  <div className="text-left hyphens leading-tight sm:line-clamp-2 md:line-clamp-3 lg:line-clamp-4 line-clamp-2 ">
                    <p
                      className={"text-black/80 text-sm"}
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  </div>
                </CardBody>
                <CardFooter className="gap-2 flex justify-between items-center">
                  <div className="flex flex-row gap-2">
                    {post.Categories.data.map((Category) => (
                      <div key={Category.id}>
                        <Link href={`/Categories/${Category.type}`} passHref>
                          <Chip
                            size="sm"
                            color="primary"
                            variant="bordered"
                            className=" border-1  hover:bg-[pink]/20 hover:cursor-pointer"
                          >
                            {Category.type}
                          </Chip>
                        </Link>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end items-end">
                    <Link href={`/EroticStories/${post.slug}`} passHref>
                      <Button
                        size={"sm"}
                        color={"primary"}
                        variant="bordered"
                        className="border-1 bg-[pink]/20 hover:cursor-pointer h-7 w-20"
                      >
                        Ler
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        <div className="flex my-8 items-center mx-auto justify-center">
          {totalPages > 1 && (
            <Pagination
              total={totalPages}
              page={page}
              onChange={(pageNumber) => setPage(pageNumber)}
              size="sm"
              variant="ghost"
              className={"text-white"}
            />
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}
