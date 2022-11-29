import { CurrenciesList } from "@/components/currencies/currenciesList/CurrenciesList";
import { TrendingStats } from "@/components/currencies/trendingStats/TrendingStats";

function HomePage() {
  return (
    <>
      <TrendingStats />
      <CurrenciesList />
    </>
  );
}

export default HomePage;
