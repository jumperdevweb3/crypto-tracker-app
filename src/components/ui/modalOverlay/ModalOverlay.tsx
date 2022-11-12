import classes from "./ModalOverlay.module.scss";
//types
import { Modal } from "../../../types/types";

export const ModalOverlay = (props: Modal) => {
  return (
    <div className={classes.modal}>
      <div className={classes["button-container"]}>
        <span className={classes["close-button"]} onClick={props.onClose}>
          X
        </span>
      </div>
      {props.children}
    </div>
  );
};
