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

let exchangeModal: any;
if (process.browser) {
  exchangeModal = document.getElementById("companies-modal");
}

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

    exchangeModal.classList.add("show");
  };
  const onCloseModal = () => {
    exchangeModal.classList.remove("show");
    setCompanies((state) => {
      return {
        item: state.item,
        modalOpen: false,
      };
    });
  };
  const itemsExist = items && items.length !== 0;

  return (
    <div className={style.container}>
      <p className={style.title}>Companies</p>
      {isLoading && <LoadingSpinner />}
      {itemsExist && !isLoading && (
        <>
          <div className={classes["list-description"]}>
            <p>Company</p>
            <p>Total Holdings</p>
          </div>
          <ul className={classes.list}>
            {itemsExist && (
              <CompaniesList items={items} modalAction={companiesModalAction} />
            )}
          </ul>
        </>
      )}
      {errorMessage && !itemsExist && <p className="center">{errorMessage}</p>}
      {companies.modalOpen && (
        <Modal onClose={onCloseModal} id="companies-modal">
          <Company {...companies} />
        </Modal>
      )}
    </div>
  );
};
