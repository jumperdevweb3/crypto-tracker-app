import { CurrenciesDetail } from "../../components/currencies/currencyDetail/CurrenciesDetail";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useRouter } from "next/router";
import { CurrencyItem } from "../../types/types";
//types
import { Path } from "../../types/types";

export default function CoinDetailPage() {
  const items = useSelector((state: RootState) => state.currencies.items);

  const router = useRouter();
  const idPath: Path = router.query.coinId;
  const item: CurrencyItem | any = items.find((item) => item.id === idPath);
  let statsModal: any;
  if (process.browser) {
    statsModal = document.getElementById("stats-modal");
    if (router.pathname !== "/") {
      statsModal.classList.remove("show");
    }
  }

  if (!item) return <p className="center">Coin Not found</p>;

  return <>{items.length !== 0 && <CurrenciesDetail item={item} />}</>;
}
