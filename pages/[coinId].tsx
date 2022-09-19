import { CurrenciesDetail } from "../components/currencies/CurrenciesDetail";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useRouter } from "next/router";
import { CurrencyItem } from "../components/types/types";
export default function CoinDetailPage() {
  const items = useSelector((state: RootState) => state.currencies.items);

  const router = useRouter();
  const idPath: string | string[] | undefined = router.query.coinId;
  const item: CurrencyItem | any = items.find((item) => item.id === idPath);

  return <>{items.length !== 0 && <CurrenciesDetail item={item} />}</>;
}
