import { CurrenciesDetail } from "../../src/components/currencies/currencyDetail/CurrenciesDetail";
import { useSelector } from "react-redux";
import { RootState } from "../../src/store/store";
import { useRouter } from "next/router";
import { CurrencyItem } from "../../src/types/types";
//types
import { Path } from "../../src/types/types";

export default function CoinDetailPage() {
  const items = useSelector((state: RootState) => state.currencies.items);

  const router = useRouter();
  const idPath: Path = router.query.coinId;
  const item: CurrencyItem | any = items.find((item) => item.id === idPath);

  if (!item) return <p className="center">Coin Not found</p>;

  return <>{items.length !== 0 && <CurrenciesDetail item={item} />}</>;
}
