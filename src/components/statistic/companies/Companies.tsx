import classes from "./Companies.module.scss";
import style from "../ContainerStyles.module.scss";
import { useState } from "react";
import { CompaniesType } from "../../../types/types";
import { Modal } from "../../ui/modals/Modal";
import { Company } from "./company/Company";
import { LoadingSpinner } from "../../ui/loadingSpinner/LoadingSpinner";
import { CompaniesList } from "./companiesList/CompaniesList";
import { useQuery } from "react-query";
import { getCompanies } from "../fetchStatistic";

export const Companies = () => {
  const [modalActive, setModalActive] = useState(false);
  const [company, setCompany] = useState<CompaniesType>();
  const {
    data: items,
    isLoading,
    isError,
    status,
  } = useQuery<CompaniesType[]>("companies", getCompanies, {
    refetchOnWindowFocus: false,
  });
  const onModalActive = (item?: CompaniesType) => {
    setModalActive((state) => !state);
    if (item) {
      setCompany(item);
    }
  };
  const onModalClose = () => {
    setModalActive(false);
  };

  const LoadingContent = isLoading && <LoadingSpinner />;
  const ErrorContent = isError && (
    <p className="center">Problem with CoinGeco API response.</p>
  );
  const CompaniesContent = status === "success" && (
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
      {CompaniesContent}
      {ErrorContent}
      {ModalContent}
    </div>
  );
};
