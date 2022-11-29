import { Watchlist } from "@/components/watchlist/Watchlist";
import Head from "next/head";

export default function WatchlistPage() {
  return (
    <>
      <Head>
        <title>Watchlist | Crypto Tracker App</title>
      </Head>
      <Watchlist />
    </>
  );
}
