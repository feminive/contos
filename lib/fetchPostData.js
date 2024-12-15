export async function fetchPostData(slug) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PRIVATE_URL}/api/posts/${slug}?populate[0]=author.avatar&populate[1]=Categorys&populate[2]=novelas`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // Log the entire result to understand its structure
    // console.log("API Response:", result);

    // Verificação de estrutura de dados
    if (!result.data || typeof result.data !== "object") {
      throw new Error("Estrutura de dados inesperada");
    }

    const post = {
      id: result.data.id,
      title: result.data.attributes.title,
      publishedAt: result.data.attributes.publishedAt,
      content: result.data.attributes.content,
      slug: result.data.attributes.slug,
      author: result.data.attributes.author?.data
        ? {
            id: result.data.attributes.author.data.id,
            username: result.data.attributes.author.data.attributes.username,
            email: result.data.attributes.author.data.attributes.email,
            avatar: result.data.attributes.author.data.attributes.avatar?.data
              ? {
                  url: result.data.attributes.author.data.attributes.avatar.data
                    .attributes.url,
                }
              : null,
          }
        : null,
      Categorys: result.data.attributes.Categorys?.data
        ? result.data.attributes.Categorys.data.map((Category) => ({
            id: Category.id,
            type: Category.attributes.type,
          }))
        : [],
      novelas: result.data.attributes.novelas?.data
        ? result.data.attributes.novelas.data.map((novela) => ({
            id: novela.id,
            title: novela.attributes.title,
          }))
        : [],
      SEO: result.data.attributes.SEO
        ? {
            metaTitle: result.data.attributes.SEO.metaTitle || null,
            metaDescription: result.data.attributes.SEO.metaDescription || null,
            keywords: result.data.attributes.SEO.keywords || null,
            structuredData: result.data.attributes.SEO.structuredData || null,
            canonicalURL: result.data.attributes.SEO.canonicalURL || null,
          }
        : null,
    };

    // // Logando o objeto SEO para verificar se está correto
    // if (post.SEO) {
    //   console.log("SEO Object:", post.SEO.metaTitle);
    // } else {
    //   console.log("SEO data not found");
    // }

    return post;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return null;
  }
}
