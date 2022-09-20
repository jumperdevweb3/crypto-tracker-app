import { NewsItems } from "../components/types/types";

export const fetchNewsData = async () => {
  try {
    const response = await fetch(
      "https://data.messari.io/api/v1/news?fields=title,author/name,id,published_at,tags,url"
    );
    if (!response.ok) throw new Error("Fail fetch data");
    const data = await response.json();
    const items = data.data;
    const news = [];
    for (const key in items) {
      news.push({
        id: key,
        ...items[key],
      });
    }
    return news;
  } catch (e) {
    if (typeof e === "string") {
      console.log(e.toUpperCase());
    } else if (e instanceof Error) {
      console.log(e.message);
    }
    return [];
  }
};

export const fetchSubpageId = async () => {
  try {
    const response = await fetch(
      "https://data.messari.io/api/v1/news?fields=id"
    );
    if (!response.ok) throw new Error("Fail fetch data");
    const data = await response.json();
    const items = data.data;
    return items;
  } catch (e) {
    if (typeof e === "string") {
      console.log(e.toUpperCase());
    } else if (e instanceof Error) {
      console.log(e.message);
    }
    return [];
  }
};

export const fetchNewsContent = async (id: string) => {
  try {
    const response = await fetch(
      "https://data.messari.io/api/v1/news?as-markdown&?fields=id,content"
    );
    if (!response.ok) throw new Error("Fail fetch content data");
    const data = await response.json();
    const items = data.data;
    const filteredItem = items.find((item: NewsItems) => item.id === id);
    return filteredItem;
  } catch (e) {
    if (typeof e === "string") {
      console.log(e.toUpperCase());
    } else if (e instanceof Error) {
      console.log(e.message);
    }
    return { content: "### Cannot load article, try agian later" };
  }
};

export async function getNewsDetail(id: string) {
  const allNews: NewsItems[] = await fetchNewsData();
  return allNews.find((item) => id === item.id) as NewsItems;
}
