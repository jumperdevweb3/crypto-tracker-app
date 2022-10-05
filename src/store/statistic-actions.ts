import { AppDispatch } from "./store";
import { statisticActions } from "./statistic-slice";

export const fetchExchangesList = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(
      statisticActions.setIsLoading({
        loadingType: "exchanges",
        isLoading: true,
      })
    );
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
      dispatch(
        statisticActions.setIsLoading({
          loadingType: "exchanges",
          isLoading: false,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        statisticActions.setIsLoading({
          loadingType: "exchanges",
          isLoading: false,
        })
      );
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
    dispatch(
      statisticActions.setIsLoading({
        loadingType: "companies",
        isLoading: true,
      })
    );
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
      dispatch(
        statisticActions.setIsLoading({
          loadingType: "companies",
          isLoading: false,
        })
      );
    } catch (error) {
      dispatch(
        statisticActions.setIsLoading({
          loadingType: "companies",
          isLoading: false,
        })
      );
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
    dispatch(
      statisticActions.setIsLoading({
        loadingType: "nfts",
        isLoading: true,
      })
    );
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
      dispatch(
        statisticActions.setIsLoading({
          loadingType: "nfts",
          isLoading: false,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        statisticActions.setIsLoading({
          loadingType: "nfts",
          isLoading: false,
        })
      );
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

export const fetchNftDetial = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(
      statisticActions.setIsLoading({
        loadingType: "nft-detail",
        isLoading: true,
      })
    );
    const fetchData = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/nfts/${id}`
      );
      if (!response.ok) {
        throw new Error("Could not fetch NFT Detial data");
      }
      const data = await response.json();
      return data;
    };
    try {
      const nftDetailData = await fetchData();
      dispatch(
        statisticActions.setIsLoading({
          loadingType: "nft-detail",
          isLoading: false,
        })
      );
      return nftDetailData;
    } catch (error) {
      console.log(error);
      dispatch(
        statisticActions.setIsLoading({
          loadingType: "nft-detail",
          isLoading: false,
        })
      );
    }
  };
};
