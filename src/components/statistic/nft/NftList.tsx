import classes from "./NftList.module.scss";
import style from "../ContainerStyles.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Modal } from "../../ui/modals/Modal";
import { useState } from "react";
import { NftTypes } from "../../../types/types";
import { fetchNftDetial } from "../../../store/statistic-actions";
import { NftDetials } from "./NftDetials";
import { LoadingSpinner } from "../../ui/LoadingSpinner";

let nftModal: any;
if (process.browser) {
  nftModal = document.getElementById("nft-modal");
}
export const NftList = () => {
  const [nfts, setNfts] = useState({ item: {}, modalOpen: false });
  const { items, errorMessage } = useSelector(
    (state: RootState) => state.statistic.nfts
  );
  const isLoading = useSelector(
    (state: RootState) => state.statistic.isLoading.nfts
  );
  const nftsModalAction = async (id: string) => {
    const itemResponse: NftTypes = await fetchNftDetial(id);
    const item = itemResponse && itemResponse;
    setNfts({
      item: item,
      modalOpen: true,
    });
    nftModal.classList.add("show");
  };
  const onCloseModal = () => {
    nftModal.classList.remove("show");
    setNfts((state) => {
      return {
        item: state.item,
        modalOpen: false,
      };
    });
  };
  const itemsExist = items && items.length !== 0;
  const renderItems =
    itemsExist &&
    items.map((item, index) => (
      <li
        key={item.id}
        className={classes["list-item"]}
        onClick={() => nftsModalAction(item.id)}
      >
        <p className={classes.name}>
          {index + 1}. {item.name}
        </p>
        <span className={classes.symbol}>{item.symbol}</span>
      </li>
    ));

  const modalContent = nfts.item ? (
    <NftDetials {...nfts.item} />
  ) : (
    <p className="center">Item data fetch problem.</p>
  );

  return (
    <div className={style.container}>
      <p className={style.title}>Top 24h volume Nft`s List</p>
      {isLoading && <LoadingSpinner />}
      {itemsExist && !isLoading && (
        <>
          <div className={classes["list-description"]}>
            <p>Name</p>
            <p>Symbol</p>
          </div>
          <ul className={classes.list}>{renderItems}</ul>
        </>
      )}
      {errorMessage && !itemsExist && <p className="center">{errorMessage}</p>}
      {nfts.modalOpen && (
        <Modal onClose={onCloseModal} id="nft-modal">
          {modalContent}
        </Modal>
      )}
    </div>
  );
};
