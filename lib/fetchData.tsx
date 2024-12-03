export const fetchData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PRIVATE_URL}/api/posts?populate[0]=author.avatar&populate[1]=categorias&populate[2]=novelas`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      }
    );

    const result = await response.json();

    // Verifique se 'data' existe e é um array
    if (!result.data || !Array.isArray(result.data)) {
      throw new Error("Estrutura de dados inesperada");
    }

    return result.data.map((post: any) => {
      const attributes = post.attributes || {};
      const author = attributes.author?.data || null;
      const categorias = attributes.categorias?.data || [];
      const novelas = attributes.novelas?.data || [];

      // Verificação para evitar erros de leitura
      if (!post.id) {
        console.error("Post ID é indefinido", post);
      }

      return {
        id: post.id,
        title: attributes.title,
        publishedAt: attributes.publishedAt,
        content: attributes.content,
        slug: attributes.slug,
        author: author
          ? {
              id: author.id,
              username: author.attributes?.username || null,
              email: author.attributes?.email || null,
              avatar: author.attributes?.avatar?.data?.attributes?.url || null,
            }
          : null,
        categorias: categorias.map((categoria: any) => ({
          id: categoria.id,
          type: categoria.attributes?.type || null,
        })),
        novelas: novelas.map((novela: any) => ({
          id: novela.id,
          title: novela.attributes?.title || null,
        })),
      };
    });
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return [];
  }
};
