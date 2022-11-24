import classes from "./SpotlightOverlay.module.scss";
import { SearchBar } from "../searchBar/SearchBar";
import { useQuery } from "react-query";
import { getTrendingSearch } from "./fetchTrendingSearch";
export const SpotlightOverlay = () => {
  const { data, status } = useQuery("trendingSearch", getTrendingSearch, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
  const items = status === "success" ? data : [];
  return (
    <div className={classes.overlay}>
      <SearchBar trendingSearch={items} />
    </div>
  );
};
