import { CurrenciesDetail } from "../components/currencies/CurrenciesDetail";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { AppDispatch } from "../store";
import { RootState } from "../store";
import { fetchCurrenciesData } from "../store/currencies-actions";
import { useRouter } from "next/router";
import { fetchChartData } from "../store/currencies-actions";

export default function CoinDetailPage() {
  const dispatch = useDispatch<AppDispatch>();

  const items = useSelector((state: RootState) => state.currencies.items);
  const router = useRouter();
  const idPath: any = router.query.coinId;
  const item = items.find((item) => item.id === idPath);

  useEffect(() => {
    dispatch(fetchChartData(idPath));
  }, [dispatch]);

  return <>{items.length !== 0 && <CurrenciesDetail item={item} />}</>;
}
