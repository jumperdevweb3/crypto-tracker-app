import classes from "./nftsList/NftList.module.scss";
import style from "../ContainerStyles.module.scss";
import { Modal } from "../../ui/modals/Modal";
import { useState } from "react";
import { NftDetials } from "./nftDetails/NftDetials";
import { LoadingSpinner } from "../../ui/loadingSpinner/LoadingSpinner";
import { NftsList } from "./nftsList/NftsList";
import { useQuery } from "react-query";
import { getNfts } from "../fetchStatistic";

export const Nfts = ({ initItems }: { initItems: [] | null }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [itemId, setItemId] = useState("");
  const initItemsExist = initItems && !!initItems.length;

  const {
    data: items,
    isLoading,
    status,
    isError,
  } = useQuery("nfts", getNfts, {
    refetchOnWindowFocus: false,
    initialData: initItemsExist ? initItems : undefined,
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

  const LoadingContent = isLoading && !initItemsExist && <LoadingSpinner />;
  const itemsContent = status === "success" && !!items.length && (
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
  const errorContent = (isError || !items?.length) && !isLoading && (
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
      {itemsContent}
      {errorContent}
      {ModalContent}
    </div>
  );
};
