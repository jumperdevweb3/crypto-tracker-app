import { CurrenciesList } from "../src/components/currencies/currenciesList/CurrenciesList";
import { SearchBar } from "../src/components/currencies/searchBar/SearchBar";
import { TrendingStats } from "../src/components/currencies/trendingStats/TrendingStats";

function HomePage() {
  return (
    <>
      <TrendingStats />
      <SearchBar />
      <CurrenciesList />
    </>
  );
}

export default HomePage;
