import qs from "qs";
import { flattenAttributes } from "@/lib/utils";

// Get Data for Home Page
const getPostQuery = qs.stringify({
  fields: [
    "id",
    "slug",
    "title",
    "content",
    "updatedAt",
    "createdAt",
    "publishedAt",
    "episode",
    "author",
  ],
  populate: {
    categorias: {
      fields: ["type"],
    },
    novelas: { fields: ["title", "slug", "description"] },
    meta: {},
  },
});
export async function getPostsData(path) {
  const TOKEN = process.env.TOKEN;
  //console.log(TOKEN)
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    //  Authorization: `Bearer ${TOKEN}`,
      
    },
  };

  const baseUrl = `${process.env.NEXT_PRIVATE_URL}`;
  const url = new URL(path, baseUrl);
  url.search = getPostQuery;

  try {
    const response = await fetch(url.href, TOKEN ? headers : {});
    const data = await response.json();

    if (response.ok && data.data) {
      return data;
    } else {
      console.error("API returned an error:", data.error || "Unknown error");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// Definição da query para buscar as novelas
const getNovelasQuery = qs.stringify({
  fields: ["id", "title", "slug", "description"],
  populate: ["posts"],
});
export async function getNovelsMainPage(path) {
  const TOKEN = process.env.TOKEN;

  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    // Authorization: `Bearer ${TOKEN}`,
    },
  };

  const baseUrl = `${process.env.NEXT_PRIVATE_URL}`;
  const url = new URL(path, baseUrl);
  url.search = getNovelasQuery;
  try {
    const response = await fetch(url.href, TOKEN ? headers : {});
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return null; // Retorna null em caso de erro
  }
}
const getNovelSerieQuery = qs.stringify({
  fields: ["id", "title", "slug"],
  populate: {
    posts: {
      fields: ["title", "content", "slug", "episode", "author"],
      categorias: ["type"],
    },
    meta: {},
  },
});
export async function getNovelSerieData(path) {
  const TOKEN = process.env.TOKEN;

  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
 //    Authorization: `Bearer ${TOKEN}`,
    },
  };

  const baseUrl = `${process.env.NEXT_PRIVATE_URL}`;
  const url = new URL(path, baseUrl);

  try {
    const response = await fetch(url.href, TOKEN ? headers : {});
    const data = await response.json();

    if (response.ok && data.data) {
      return data;
    } else {
      // console.error("API returned an error:", data.error || "Unknown error");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

//use
// Subscriber("/api/subscriber", content)
//   .then(response => console.log(response))
//   .catch(error => console.error('Error:', error));

//só um teste

//put subscriber
export async function Subscriber(path, payload) {
  const TOKEN = process.env.TOKEN;
  const headers = {
    "Content-Type": "application/json",
  //  Authorization: `Bearer ${TOKEN}`,
  };

  const baseUrl = process.env.NEXT_PRIVATE_URL;
  const url = new URL(path, baseUrl);

  const response = await fetch(url, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  const flattenedData = flattenAttributes(data);
  return flattenedData;
}
export async function getPostByTag(path, type) {
  const TOKEN = process.env.TOKEN;

  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
   //   Authorization: `Bearer ${TOKEN}`,
    },
  };
  const filter = `?fields[0]=id&fields[1]=slug&fields[2]=title&fields[3]=content&fields[4]=updatedAt&fields[5]=createdAt&fields[6]=publishedAt&populate[author][fields][0]=username&populate[author][fields][1]=avatar&populate[categorias][populate][0]=type&filters[categorias][type][$eq]=${type.tag}`;

  const baseUrl = `${process.env.NEXT_PRIVATE_URL}`;
  let url = new URL(path + filter, baseUrl);

  // Log the constructed URL for debugging

  try {
    const response = await fetch(url.href, TOKEN ? headers : {});
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    // Log the response data for debugging

    const flattenedData = flattenAttributes(data);
    return flattenedData;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return null;
  }
}
