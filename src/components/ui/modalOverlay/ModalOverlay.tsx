import classes from "./ModalOverlay.module.scss";
//types
import { ModalProps } from "@/types/types";

export const ModalOverlay = (props: ModalProps) => {
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
