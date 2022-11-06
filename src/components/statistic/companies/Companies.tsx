import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import classes from "./Companies.module.scss";
import style from "../ContainerStyles.module.scss";
import { useState } from "react";
import { CompaniesType } from "../../../types/types";
import { Modal } from "../../ui/modals/Modal";
import { Company } from "./Company";
import { LoadingSpinner } from "../../ui/loadingSpinner/LoadingSpinner";
import { CompaniesList } from "./CompaniesList";

export const Companies = () => {
  const [companies, setCompanies] = useState({ item: {}, modalOpen: false });
  const { items, errorMessage } = useSelector(
    (state: RootState) => state.statistic.companies
  );
  const isLoading = useSelector(
    (state: RootState) => state.statistic.isLoading.companies
  );

  const companiesModalAction = (item: CompaniesType) => {
    setCompanies({
      item: item,
      modalOpen: true,
    });
  };
  const onCloseModal = () => {
    setCompanies((state) => {
      return {
        item: state.item,
        modalOpen: false,
      };
    });
  };
  const itemsExist = items && items.length !== 0;
  const LoadingContent = isLoading && <LoadingSpinner />;
  const CompaniesContent = itemsExist && !isLoading && (
    <>
      <div className={classes["list-description"]}>
        <p>Company</p>
        <p>Total Holdings</p>
      </div>
      <ul className={classes.list}>
        <CompaniesList items={items} modalAction={companiesModalAction} />
      </ul>
    </>
  );
  const isError = errorMessage && !itemsExist;
  const ErrorContent = isError && <p className="center">{errorMessage}</p>;
  const ModalContent = companies.modalOpen && (
    <Modal onClose={onCloseModal}>
      <Company {...companies} />
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
