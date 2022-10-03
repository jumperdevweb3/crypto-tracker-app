import { AppDispatch } from "./store";
import { statisticActions } from "./statistic-slice";

export const fetchExchangesList = () => {
  return async (dispatch: AppDispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/exchanges?per_page=25&page=1`
      );
      if (!response.ok) {
        throw new Error("Could not fetch exchanges list data");
      }
      const data = await response.json();
      return data;
    };
    try {
      const exchangesData = await fetchData();
      dispatch(statisticActions.setExchanges(exchangesData));
    } catch (error) {
      console.log(error);
      dispatch(statisticActions.setExchanges([]));
      dispatch(
        statisticActions.setError({
          message: "Fetch exchanges list data faild!",
          from: "exchanges",
        })
      );
    }
  };
};

export const fetchCompaniesData = () => {
  return async (dispatch: AppDispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/companies/public_treasury/bitcoin`
      );
      if (!response.ok) {
        throw new Error("Could not fetch companies list data");
      }
      const data = await response.json();
      return data;
    };
    try {
      const companiesData = await fetchData();
      dispatch(statisticActions.setCompanies(companiesData.companies));
    } catch (error) {
      console.log(error);
      dispatch(statisticActions.setCompanies([]));
      dispatch(
        statisticActions.setError({
          message: "Fetch companies list data faild!",
          from: "companies",
        })
      );
    }
  };
};

export const fetchNftList = () => {
  return async (dispatch: AppDispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/nfts/list?order=h24_volume_native_desc&asset_platform_id=ethereum&per_page=50&page=1`
      );
      if (!response.ok) {
        throw new Error("Could not fetch NFT list data");
      }
      const data = await response.json();
      return data;
    };
    try {
      const nftsData = await fetchData();
      dispatch(statisticActions.setNftsList(nftsData));
    } catch (error) {
      console.log(error);
      dispatch(statisticActions.setNftsList([]));
      dispatch(
        statisticActions.setError({
          message: "Fetch NFT list data faild!",
          from: "nfts",
        })
      );
    }
  };
};

export const fetchNftDetial = async (id: string) => {
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/nfts/${id}`);
    if (!response.ok) {
      throw new Error("Could not fetch NFT data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
