import classes from "./Companies.module.scss";
import style from "../ContainerStyles.module.scss";
import { useState } from "react";
import { ICompaniesItems } from "../types";
import { Modal } from "../../ui/modals/Modal";
import { Company } from "./company/Company";
import { LoadingSpinner } from "../../ui/loadingSpinner/LoadingSpinner";
import { CompaniesList } from "./companiesList/CompaniesList";
import { useQuery } from "react-query";
import { getCompanies } from "../fetchStatistic";

export const Companies = ({ initItems }: { initItems: [] | null }) => {
  const [modalActive, setModalActive] = useState(false);
  const [company, setCompany] = useState<ICompaniesItems>();
  const initItemsExist = initItems && !!initItems.length;

  const {
    data: items,
    isLoading,
    isError,
    status,
  } = useQuery<ICompaniesItems[]>("companies", getCompanies, {
    refetchOnWindowFocus: false,
    initialData: initItemsExist ? initItems : undefined,
  });
  const onModalActive = (item?: ICompaniesItems) => {
    setModalActive((state) => !state);
    if (item) {
      setCompany(item);
    }
  };
  const onModalClose = () => {
    setModalActive(false);
  };

  const LoadingContent = isLoading && !initItemsExist && <LoadingSpinner />;
  const errorContent = (isError || !items?.length) && !isLoading && (
    <p className="center">Problem with CoinGeco API response.</p>
  );
  const companiesContent = status === "success" && !!items.length && (
    <>
      <div className={classes["list-description"]}>
        <p>Company</p>
        <p>Total Holdings</p>
      </div>
      <ul className={classes.list}>
        <CompaniesList items={items} modalAction={onModalActive} />
      </ul>
    </>
  );
  const ModalContent = modalActive && company && (
    <Modal onClose={onModalClose}>
      <Company item={company} />
    </Modal>
  );
  return (
    <div className={style.container}>
      <p className={style.title}>Companies</p>
      {LoadingContent}
      {companiesContent}
      {errorContent}
      {ModalContent}
    </div>
  );
};
