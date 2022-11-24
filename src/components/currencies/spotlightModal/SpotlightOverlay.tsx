import { ModalProps } from "../../../types/types";
import classes from "./SpotlightOverlay.module.scss";
import { SearchBar } from "../searchBar/SearchBar";
export const SpotlightOverlay = () => {
  return (
    <div className={classes.overlay}>
      <SearchBar />
    </div>
  );
};
