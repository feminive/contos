import { Avatar, Button, Textarea, Card } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { userData } from "@/context/userData";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { FiSend } from "react-icons/fi";
import Link from "next/link";

export default function Comments({ slug, title }) {
  const { user } = userData();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userDataLoaded, setUserDataLoaded] = useState(false);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(
          `${process.env.ADDRESS_PRIVATE}/api/posts/${slug}?populate=*`
        );
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }

    fetchComments();
  }, [slug]);

  useEffect(() => {
    // Verifica se o usuário está carregado
    if (user && user.id) {
      setUserDataLoaded(true);
    }
  }, [user]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  const userId = user && user.id;

  return (
    <Card className="flex flex-col items-start gap-4 justify-center max-w-7xl mx-auto w-full p-4 mt-10 border-none shadow-none">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="grid grid-cols-[70px_auto] items-start gap-4 w-full"
        >
          <Avatar
            isBordered
            src={comment.author.avatar}
            className="m-2"
            color={"success"}
            size="lg"
          />

          <div className="flex flex-col border-2 border-post bg-highlight rounded-xl ">
            <div className="flex flex-row justify-between">
              <small className="italic m-4 mb-0">
                {formatDate(comment.createdAt)}
              </small>

              {userId == comment.author.id && (
                <span
                  className="flex cursor-pointer m-3"
                  onClick={() => handleDeleteSubmit(comment.id)}
                >
                  <MdDeleteOutline size={20} fill={"gray"} />
                </span>
              )}
            </div>
            <div className="w-full ">
              <p className="p-4">{comment.content}</p>
            </div>
          </div>
        </div>
      ))}

      {userDataLoaded ? (
        <div className="w-full flex items-center gap-4">
          <Textarea
            label="Mensagem"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full"
            endContent={
              newComment.length > 1 && (
                <Button
                  isIconOnly
                  aria-label="Enviar"
                  color={"warning"}
                  onClick={handleCommentSubmit}
                >
                  <FiSend size={22} color={"#f4f4f4"} />
                </Button>
              )
            }
          />
        </div>
      ) : (
        <small className="flex mx-auto">
          Faça{" "}
          <Link
            href={"/login"}
            className="text-blue-600 mx-1"
            aria-label="Link para o login"
          >
            Login
          </Link>{" "}
          para comentar!
        </small>
      )}
    </Card>
  );
}
