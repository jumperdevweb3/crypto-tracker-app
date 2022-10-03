import { ModalTypes } from "../../../types/types";
import classes from "./ModalOverlay.module.scss";

export const ModalOverlay = (props: ModalTypes) => {
  return (
    <div className={classes.modal}>
      <div className={classes["button-container"]}>
        <span className={classes["close-button"]} onClick={props.onClose}>
          X
        </span>
      </div>
      <div className={classes[props.id]}>{props.children}</div>
    </div>
  );
};
