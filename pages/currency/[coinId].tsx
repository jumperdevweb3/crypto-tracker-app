import { CurrenciesDetail } from "../../src/components/currencies/currencyDetail/CurrenciesDetail";
import { useRouter } from "next/router";
import { fetchCurrency } from "../api/fetchCurrency";
import { LoadingSpinner } from "../../src/components/ui/loadingSpinner/LoadingSpinner";
import { useQuery } from "react-query";
import { ICoin } from "../../src/types/types";

export default function CoinDetailPage() {
  const router = useRouter();
  const idPath = router.query.coinId;
  const query = typeof idPath === "string" ? idPath : "";

  const { data: item, isLoading } = useQuery<ICoin>(
    ["coin", query],
    () => fetchCurrency(query),
    {
      enabled: !!query && router.isReady,
    }
  );

  const notFoundContent = item?.error && <p className="center">{item.error}</p>;
  const coinDetialsContent = !item?.error && item && (
    <CurrenciesDetail item={item} />
  );
  const LoadingContent = isLoading && <LoadingSpinner />;
  return (
    <>
      {notFoundContent}
      {LoadingContent}
      {coinDetialsContent}
    </>
  );
}
