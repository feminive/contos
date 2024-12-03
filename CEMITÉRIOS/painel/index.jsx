import { Button, Input } from "@nextui-org/react";
import { title } from "@/components/primitives";
import { userData } from "@/context/userData";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { Card } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default";

const PerfilByUserGrade = () => {
  const { data: session } = useSession();
  const { user } = userData();
  const jwtToken = session?.jwt;
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [formData, setFormData] = useState({ username: "" });
  useEffect(() => {
    if (user) {
      setFormData({ username: user.username || "" });
      if (user.avatar && user.avatar.url) {
        setImageUrl(`${process.env.NEXT_PRIVATE_URL}${user.avatar.url}`);
      }
    }
  }, [user]);

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      setImageFile(file);

      const uploadData = new FormData();
      uploadData.append("files", file);
      uploadData.append("ref", "plugin::users-permissions.user");
      uploadData.append("refId", user.id);
      uploadData.append("field", "avatar");
      uploadData.append("folder", "users");

      const response = await axios.post(
        `${process.env.NEXT_PRIVATE_URL}/api/upload`,
        uploadData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Imagem enviada para o servidor");
      setImageUrl(`${process.env.NEXT_PRIVATE_URL}${response.data[0].url}`);
    } catch (error) {
      toast.error("Erro ao enviar a imagem. Por favor, tente novamente.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PRIVATE_URL}/api/users/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      toast.success("Dados do usuário atualizados com sucesso!");
    } catch (error) {
      toast.error(
        "Erro ao atualizar os dados do usuário. Por favor, tente novamente."
      );
    }
  };

  return (
    <DefaultLayout>
      <div className="flex justify-center m-8">
        <h1 className={title({ size: "sm", color: "brown" })}>Editar Perfil</h1>
      </div>

      <Card className="flex flex-col items-center justify-center py-4 w-96 mx-auto shadow-md ">
        <div className="w-30 flex flex-col items-center mx-10">
          <div
            className="size-20 bg-slate-500 ring-brown/40  ring-offset-2 ring-4 rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => document.getElementById("avatar-upload").click()}
            style={{
              backgroundImage: imageFile
                ? `url(${URL.createObjectURL(imageFile)})`
                : imageUrl
                  ? `url(${imageUrl})`
                  : "none",
              backgroundSize: "cover",
            }}
          >
            {!imageFile && !imageUrl && "Clique"}
          </div>
          <input
            type="file"
            id="avatar-upload"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>
        <div className=" w-60 gap-4 mt-10">
          <Input
            isRequired
            type="text"
            id="username"
            name="username"
            label="Apelido"
            value={formData.username}
            onChange={handleChange}
          />
          <br />
        </div>
        <div className="flex mx-auto mt-5 gap-4">
          <div className="flex mx-auto">
            <Button
              color={"primary"}
              size="sm"
              onClick={handleSubmit}
              className="text-white"
            >
              Atualizar
            </Button>
          </div>
        </div>
      </Card>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </DefaultLayout>
  );
};

export default PerfilByUserGrade;
