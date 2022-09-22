import { CurrenciesDetail } from "../../components/currencies/CurrenciesDetail";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useRouter } from "next/router";
import { CurrencyItem } from "../../types/types";

export default function CoinDetailPage() {
  const items = useSelector((state: RootState) => state.currencies.items);

  type Path = string | string[] | undefined;

  const router = useRouter();
  const idPath: Path = router.query.coinId;
  const item: CurrencyItem | any = items.find((item) => item.id === idPath);

  if (!item) return <p>Not found</p>;

  return <>{items.length !== 0 && <CurrenciesDetail item={item} />}</>;
}
