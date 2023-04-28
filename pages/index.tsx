import { CurrenciesList } from "@/components/currencies/currenciesList/CurrenciesList";
import { getCurrencies } from "@/components/currencies/currenciesList/getCurrencies";
import { TrendingStats } from "@/components/currencies/trendingStats/TrendingStats";
import { GetServerSidePropsContext } from "next";

function HomePage({ items }: { items: [] | null }) {
  return (
    <>
      <TrendingStats />
      <CurrenciesList initItems={items} />
    </>
  );
}

export default HomePage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const isQuery = !!context.query.page ? context.query.page : 1;
  const data: [] = await getCurrencies(isQuery);
  if (!data.length) {
    return {
      props: {
        items: null,
      },
    };
  }
  if (data.length) {
    return {
      props: {
        items: data,
      },
    };
  }
}
