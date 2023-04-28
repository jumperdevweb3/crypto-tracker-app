import { CurrenciesDetail } from "../../src/components/currencies/currencyDetail/CurrenciesDetail";
import { useRouter } from "next/router";
import { fetchCurrency } from "../api/fetchCurrency";
import { useQuery } from "react-query";
import { ICoin } from "../../src/types/types";
import { LoadingFire } from "@/components/ui/loadingFire/LoadingFire";

export default function CoinDetailPage() {
  const router = useRouter();
  const idPath = router.query.coinId;
  const query = typeof idPath === "string" ? idPath : "";

  const { data: item, isLoading } = useQuery<ICoin>(
    ["coin", query],
    () => fetchCurrency(query),
    {
      enabled: !!query && router.isReady,
      retry: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const notFoundContent = item?.error && <p className="center">{item.error}</p>;
  const coinDetialsContent = !item?.error && item && (
    <CurrenciesDetail item={item} />
  );
  const LoadingContent = isLoading && <LoadingFire />;
  return (
    <>
      {notFoundContent}
      {LoadingContent}
      {coinDetialsContent}
    </>
  );
}
