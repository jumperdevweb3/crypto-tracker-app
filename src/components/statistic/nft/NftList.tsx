import classes from "./NftList.module.scss";
import style from "../ContainerStyles.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Modal } from "../../ui/modals/Modal";
import { useState } from "react";
import { NftDetials } from "./NftDetials";
import { LoadingSpinner } from "../../ui/LoadingSpinner";

let nftModal: any;
if (process.browser) {
  nftModal = document.getElementById("nft-modal");
}
export const NftList = () => {
  const [nfts, setNfts] = useState({ modalOpen: false, id: "" });

  const { items, errorMessage } = useSelector(
    (state: RootState) => state.statistic.nfts
  );
  const isLoading = useSelector(
    (state: RootState) => state.statistic.isLoading.nfts
  );

  const nftsModalAction = async (id: string) => {
    setNfts({
      modalOpen: true,
      id: id,
    });
    nftModal.classList.add("show");
  };
  const onCloseModal = () => {
    nftModal.classList.remove("show");
    setNfts({
      modalOpen: false,
      id: "",
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
          <NftDetials id={nfts.id} />
        </Modal>
      )}
    </div>
  );
};
