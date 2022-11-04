import { CurrenciesDetail } from "../../src/components/currencies/currencyDetail/CurrenciesDetail";
import { useRouter } from "next/router";
import { Coin } from "../../src/types/types";
//types
import { useEffect, useState } from "react";
import { fetchCurrency } from "../api/fetchCurrency";
import { LoadingSpinner } from "../../src/components/ui/loadingSpinner/LoadingSpinner";

export default function CoinDetailPage() {
  const [item, setItem] = useState<Coin | null>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const idPath = router.query.coinId;
  console.log(idPath);

  const fetchItem = async () => {
    setIsLoading(true);
    if (typeof idPath !== "object" && typeof idPath !== "undefined") {
      const item = await fetchCurrency(idPath);
      if (item.id) {
        setItem(item);
      } else {
        setItem(null);
      }
      setIsLoading(false);
      return;
    }
  };
  useEffect(() => {
    fetchItem();
    console.log(item);
  }, [idPath]);

  if (isLoading) return <LoadingSpinner />;
  if (!item && !isLoading) return <p className="center">Coin Not found</p>;
  return <>{item && <CurrenciesDetail item={item} />}</>;
}
