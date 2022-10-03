import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import classes from "./Companies.module.scss";
import style from "../ContainerStyles.module.scss";
import { useState } from "react";
import { CompaniesType } from "../../../types/types";
import { Modal } from "../../ui/modals/Modal";
import { Company } from "./Company";

let exchangeModal: any;
if (process.browser) {
  exchangeModal = document.getElementById("companies-modal");
}
export const Companies = () => {
  const [companies, setCompanies] = useState({ item: {}, modalOpen: false });
  const { items, errorMessage } = useSelector(
    (state: RootState) => state.statistic.companies
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
  const renderItems =
    itemsExist &&
    items.map((item, index) => (
      <li
        key={item.symbol}
        className={classes["list-item"]}
        onClick={() => companiesModalAction(item)}
      >
        <div className={classes["name-box"]}>
          {index + 1}. {item.name}
        </div>
        <p className={classes.holdings}>{item.total_holdings} BTC</p>
      </li>
    ));
  return (
    <div className={style.container}>
      <p className={style.title}>Companies</p>
      <div className={classes["list-description"]}>
        <p>Company</p>
        <p>Total Holdings</p>
      </div>
      {itemsExist && <ul className={classes.list}>{renderItems}</ul>}
      {errorMessage && !itemsExist && <p className="center">{errorMessage}</p>}
      {companies.modalOpen && (
        <Modal onClose={onCloseModal} id="companies-modal">
          <Company {...companies} />
        </Modal>
      )}
    </div>
  );
};
