import classes from "./NftList.module.scss";
import style from "../ContainerStyles.module.scss";
import { Modal } from "../../ui/modals/Modal";
import { useState } from "react";
import { NftDetials } from "./NftDetials";
import { LoadingSpinner } from "../../ui/loadingSpinner/LoadingSpinner";
import { NftsList } from "./NftsList";
import { useQuery } from "react-query";
import { getNfts } from "../fetchStatistic";

export const Nfts = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [itemId, setItemId] = useState("");

  const {
    data: items,
    isLoading,
    status,
    isError,
  } = useQuery("nfts", getNfts, {
    refetchOnWindowFocus: false,
  });

  const onModalActive = (id?: string) => {
    setModalOpen((state) => !state);
    if (id) {
      setItemId(id);
    }
  };
  const onCloseModal = () => {
    setModalOpen(false);
    setItemId("");
  };

  const LoadingContent = isLoading && <LoadingSpinner />;
  const ItemsContent = status === "success" && (
    <>
      <div className={classes["list-description"]}>
        <p>Name</p>
        <p>Symbol</p>
      </div>
      <ul className={classes.list}>
        <NftsList items={items} modalAction={onModalActive} />
      </ul>
    </>
  );
  const ErrorContent = isError && (
    <p className="center">Problem with CoinGeco response.</p>
  );
  const ModalContent = modalOpen && (
    <Modal onClose={onCloseModal}>
      <NftDetials id={itemId} />
    </Modal>
  );
  return (
    <div className={style.container}>
      <p className={style.title}>Top 24h volume Nft`s List</p>
      {LoadingContent}
      {ItemsContent}
      {ErrorContent}
      {ModalContent}
    </div>
  );
};
