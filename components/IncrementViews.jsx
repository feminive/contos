import { useEffect } from "react";

const IncrementViews = ({ slug }) => {
  useEffect(() => {
    const incrementViews = async () => {
      try {
        const getResponse = await fetch(
          `https://feminivefanfics.com.br/api/posts/${slug}`
        );

        if (!getResponse.ok) {
          return;
        }

        const postData = await getResponse.json();
        const { documentId, views = 0 } = postData.data;
        const newViews = views + 1;

        const requestBody = { data: { views: newViews } };

        const updateResponse = await fetch(
          `https://feminivefanfics.com.br/api/posts/${documentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (!updateResponse.ok) {
          // Lidar com erro se necessário
        }
      } catch (error) {
        // Lidar com erro se necessário
      }
    };

    incrementViews();
  }, [slug]);

  return null;
};

export default IncrementViews;
