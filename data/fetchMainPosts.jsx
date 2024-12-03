import qs from "qs";
import { flattenAttributes } from "@/lib/utils";

// Get Data for Home Page
const getPostQuery = (page) =>
  qs.stringify({
    fields: [
      "name",
      "slug",
      "cost",
      "description",
      "mod",
      "publishedAt",
      "createdAt",
      "updatedAt",
    ],
    populate: {
      types: {
        fields: ["name"],
      },
    },
    pagination: {
      page: page,
      pageSize: 25,
    },
  });
export async function getPostsData(path) {
  const TOKEN = process.env.TOKEN;
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${TOKEN}`,
    },
  };
  const baseUrl = `${process.env.BACK}`;

  let allData = [];
  let page = 1;
  let total = 0;
  let pageCount = 1;

  do {
    const url = new URL(path, baseUrl);
    url.search = getPostQuery(page);

    try {
      const response = await fetch(url.href, TOKEN ? headers : {});
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const flattenedData = flattenAttributes(data);

      allData = allData.concat(flattenedData.data);
      total = flattenedData.meta.pagination.total;
      pageCount = flattenedData.meta.pagination.pageCount;

      page++;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      return null;
    }
  } while (page <= pageCount);

  return { data: allData };
}
