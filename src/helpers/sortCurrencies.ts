import { ICurrencyItem } from "@/types/types";

export const sortCurrencies = (
  items: ICurrencyItem[],
  { sortType, sortBy }: { sortType: string; sortBy: string }
) => {
  if (sortType === "ascending") {
    if (sortBy === "name") {
      return [...items].sort((a: any, b: any): any =>
        (b[sortBy] || "").toString().localeCompare((a[sortBy] || "").toString())
      );
    }
    return [...items].sort(
      (a, b) => a[sortBy as keyof {}] - b[sortBy as keyof {}]
    );
  }
  if (sortType === "descending") {
    if (sortBy === "name") {
      return [...items].sort((a: any, b: any): any =>
        (a[sortBy] || "").toString().localeCompare((b[sortBy] || "").toString())
      );
    }
    return [...items].sort(
      (a, b) => b[sortBy as keyof {}] - a[sortBy as keyof {}]
    );
  }
  return items;
};
