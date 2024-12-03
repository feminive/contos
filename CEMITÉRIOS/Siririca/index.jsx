import { useState, useEffect, useRef } from "react";
import { Image } from "@nextui-org/react";
import { Navbar } from "@/components/navbar";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import Head from "next/head"; // Import Head

export default function Masonry() {
  const [images, setImages] = useState([]);
  const [displayedImages, setDisplayedImages] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PRIVATE_URL}/api/images?populate=*`
        );
        const data = await response.json();
        const allImages = data.data.flatMap((obj) =>
          obj.tumblr.map((item) => ({
            id: item.id,
            imageUrl: item.url,
            width: item.formats.thumbnail.width,
            height: item.formats.thumbnail.height,
          }))
        );

        setImages(allImages);
        setDisplayedImages(allImages.slice(0, 50));
        setCurrentIndex(50);

      } catch (error) {
        console.error("Erro ao buscar as imagens:", error);
      }
    };

    fetchImages();
  }, []);

  const loadMoreImages = () => {
    const nextIndex = currentIndex + 10;
    setDisplayedImages((prevImages) => [
      ...prevImages,
      ...images.slice(currentIndex, nextIndex),
    ]);
    setCurrentIndex(nextIndex);

  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreImages();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [loadMoreRef.current, currentIndex, loadMoreImages]);

  const openModal = (image) => {
    setSelectedImage(image);
    onOpen();
  };

  const columns = 6;
  const imagesInColumns = Array.from({ length: columns }, () => []);

  displayedImages.forEach((image, index) => {
    imagesInColumns[index % columns].push(image);
  });

  return (
    <div className="bg-black min-h-screen min-w-full">
      <Head>
        <title>Siririca Garota!</title>
        <meta
          key="title"
          content="Feminive Fanfics - Toca uma pra mim"
          property="og:title"
        />
        <meta
          content="Umas imagens para ajudar a sua imaginação correr solta!"
          property="og:description"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          rel="canonical"
          href={`https://feminivefanfics.com.br/Siririca`}
        />{" "}
        {/* Canonical URL */}
      </Head>
      <Navbar />
      <div className="mx-auto p-10">
        <h1>Siririca Garota!</h1>
        <div className="grid grid-cols-1 custom-sm:grid-cols-2 custom-md:grid-cols-3 custom-lg:grid-cols-4 custom-xl:grid-cols-5 custom-xxl:grid-cols-6 gap-2">
          {imagesInColumns.map((column, columnIndex) => (
            <div key={columnIndex}>
              {column.map((image, index) => (
                <div
                  key={image.id}
                  className="relative mb-2 cursor-pointer"
                  style={{
                    paddingBottom: `${(image.height / image.width) * 100}%`,
                  }}
                  onClick={() => openModal(image)}
                >
                  <div className="absolute inset-0 w-full h-full object-cover">
                    <Image
                      src={`${process.env.NEXT_PRIVATE_URL}${image.imageUrl}`}
                      alt={`Image ${index}`}
                      border="sm"
                      layout="responsive"
                      isZoomed
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div ref={loadMoreRef} className="h-10 mt-10"></div>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size="lg"
          hideCloseButton={true}
          classNames={{
            backdrop:
              "bg-gradient-to-t from-zinc-900 to-zinc-900/80 backdrop-opacity-20",
          }}
        >
          <ModalContent removeWrapper className="bg-transparent shadow-none">
            <ModalBody hideCloseButton>
              {selectedImage && (
                <Image
                  src={`${process.env.NEXT_PRIVATE_URL}${selectedImage.imageUrl}`}
                  alt={`Image ${selectedImage.id}`}
                  layout="responsive"
                  className="scale-2"
                />
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
