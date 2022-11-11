import { CurrenciesList } from "../src/components/currencies/currenciesList/CurrenciesList";
import { SearchBar } from "../src/components/currencies/searchBar/SearchBar";
import { TrendingStatsBox } from "../src/components/currencies/trendingStats/TrendingStatsBox";
//types

function HomePage() {
  return (
    <>
      <TrendingStatsBox />
      <SearchBar />
      <CurrenciesList />
    </>
  );
}

export default HomePage;
