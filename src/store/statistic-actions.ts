import { AppDispatch } from "./store";
import { statisticActions } from "./statistic-slice";
import { useFetchData } from "../helpers/fetchData";
import { urlFetchList } from "../helpers/urlFetchList";

export const fetchExchangesList = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(
      statisticActions.setIsLoading({
        loadingType: "exchanges",
        isLoading: true,
      })
    );
    const fetchData = useFetchData({
      url: urlFetchList.exchangesList,
      message: "Exchanges List",
    });
    try {
      const exchangesData = await fetchData;
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
    const fetchData = useFetchData({
      url: urlFetchList.companiesList,
      message: "Companies List",
    });
    try {
      const companiesData = await fetchData;
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
    const fetchData = useFetchData({
      url: urlFetchList.nftsList,
      message: "Nft's List",
    });
    try {
      const nftsData = await fetchData;
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
    const fetchData = useFetchData({
      url: urlFetchList.nft + id,
      message: "Nft Detial",
    });
    try {
      const nftDetailData = await fetchData;
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
