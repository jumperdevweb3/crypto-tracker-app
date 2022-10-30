import classes from "./NftList.module.scss";
import style from "../ContainerStyles.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Modal } from "../../ui/modals/Modal";
import { useState } from "react";
import { NftDetials } from "./NftDetials";
import { LoadingSpinner } from "../../ui/loadingSpinner/LoadingSpinner";
import { NftsList } from "./NftsList";

export const Nfts = () => {
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
  };
  const onCloseModal = () => {
    setNfts({
      modalOpen: false,
      id: "",
    });
  };
  const itemsExist = items && items.length !== 0;

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
          <ul className={classes.list}>
            {itemsExist && (
              <NftsList items={items} modalAction={nftsModalAction} />
            )}
          </ul>
        </>
      )}
      {errorMessage && !itemsExist && <p className="center">{errorMessage}</p>}
      {nfts.modalOpen && (
        <Modal onClose={onCloseModal}>
          <NftDetials id={nfts.id} />
        </Modal>
      )}
    </div>
  );
};
