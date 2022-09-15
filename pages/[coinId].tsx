import { CurrenciesDetail } from "../components/currencies/CurrenciesDetail";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useRouter } from "next/router";

export default function CoinDetailPage() {
  const items = useSelector((state: RootState) => state.currencies.items);

  const router = useRouter();
  const idPath: any = router.query.coinId;
  const item = items.find((item) => item.id === idPath);

  return <>{items.length !== 0 && <CurrenciesDetail item={item} />}</>;
}
