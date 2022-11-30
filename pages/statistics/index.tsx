import {
  getCompanies,
  getExchanges,
  getNfts,
} from "@/components/statistic/fetchStatistic";
import { Statistics } from "@/components/statistic/Statistics";

import Head from "next/head";

interface IProps {
  nftsData: [];
  companiesData: [];
  exchangesData: [];
}
export default function StatisticPage({
  nftsData,
  companiesData,
  exchangesData,
}: IProps) {
  return (
    <>
      <Head>
        <title>Statistic | Crypto Tracker</title>
      </Head>
      <Statistics
        initNfts={!!nftsData.length ? nftsData : null}
        initCompanies={!!companiesData.length ? companiesData : null}
        initExchanges={!!exchangesData.length ? exchangesData : null}
      />
    </>
  );
}

export async function getStaticProps() {
  const nftsData: [] = await getNfts();
  const companiesData: [] = await getCompanies();
  const exchangesData: [] = await getExchanges();

  return {
    props: {
      nftsData,
      companiesData,
      exchangesData,
    },
  };
}
