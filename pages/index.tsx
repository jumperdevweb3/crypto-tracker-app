import { CurrenciesList } from "../src/components/currencies/currenciesList/CurrenciesList";
import { SearchBar } from "../src/components/currencies/searchBar/SearchBar";
//types

function HomePage() {
  return (
    <>
      {/* <TrendingStatsBox /> */}
      <SearchBar />
      <CurrenciesList />
    </>
  );
}

export default HomePage;
