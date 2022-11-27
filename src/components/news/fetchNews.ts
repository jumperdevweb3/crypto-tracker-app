import { INewsItems } from "@/types/types";

export const getNewsData = async () => {
  try {
    const response = await fetch(
      "https://data.messari.io/api/v1/news?fields=title,author/name,id,published_at,tags,url"
    );
    if (!response.ok) throw new Error("Fail fetch data");
    const data = await response.json();
    const items = data.data;
    return items;
  } catch (error) {
    if (typeof error === "string") {
      console.log(error);
    } else if (error instanceof Error) {
      console.log(error.message);
    }
    return [];
  }
};

export const getNewsContent = async (id: string) => {
  try {
    const response = await fetch(
      "https://data.messari.io/api/v1/news?as-markdown&?fields=id,content"
    );
    if (!response.ok) throw new Error("Fail fetch content data");
    const data = await response.json();
    const items = data.data;
    const filteredItem = items.find((item: INewsItems) => item.id === id);
    return filteredItem;
  } catch (error) {
    if (typeof error === "string") {
      console.log(error.toUpperCase());
    } else if (error instanceof Error) {
      console.log(error.message);
    }
    return { content: "### Cannot load article, try agian later" };
  }
};

export async function getNewsDetail(id: string) {
  const allNews: INewsItems[] = await getNewsData();
  return allNews.find((item) => id === item.id) as INewsItems;
}
