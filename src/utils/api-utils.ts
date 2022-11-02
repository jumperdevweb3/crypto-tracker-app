import { NewsItems } from "../types/types";
import { urlFetchList } from "../helpers/urlFetchList";

const { news, etherScan } = urlFetchList;
export const fetchNewsData = async () => {
  try {
    const response = await fetch(news.newsList);
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

export const fetchNewsContent = async (id: string) => {
  try {
    const response = await fetch(news.newsContent);
    if (!response.ok) throw new Error("Fail fetch content data");
    const data = await response.json();
    const items = data.data;
    const filteredItem = items.find((item: NewsItems) => item.id === id);
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
  const allNews: NewsItems[] = await fetchNewsData();
  return allNews.find((item) => id === item.id) as NewsItems;
}

export const fetchEtherScanData = async (address: string) => {
  try {
    const response = await fetch(etherScan + address);
    if (!response.ok) throw new Error("problem");
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) return error;
  }
};
