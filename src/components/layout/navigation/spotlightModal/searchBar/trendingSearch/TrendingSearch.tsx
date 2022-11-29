import { trendingVariablesChange } from "../utils/trendingVariablesChange";
import { SearchItem } from "../searchItem/SearchItem";
import { ITrendingCoin } from "../types";

interface IProps {
  trendingSearch: ITrendingCoin[];
}
export const TrendingSearch = ({ trendingSearch }: IProps) => {
  const varaiblesTrendingChange =
    !!trendingSearch &&
    trendingSearch.map((i) => trendingVariablesChange(i.item));

  const TrendingSearch = varaiblesTrendingChange.map((item) => (
    <SearchItem item={item} key={item.id} />
  ));
  return <>{TrendingSearch}</>;
};
