import ReactDOM, { createPortal } from "react-dom";
import classes from "./StatsModal.module.scss";
import { ModalTypes } from "../../types/types";

const Backdrop = (props: { onClose: () => void }) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props: ModalTypes) => {
  return (
    <div className={classes.modal}>
      <span className="close-button" onClick={props.onClose}>
        X
      </span>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

export const StatsModal = (props: ModalTypes) => {
  const portalElement = document.getElementById("stats-modal") as HTMLElement;

  return createPortal(
    <>
      <Backdrop onClose={props.onClose} />
      <ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>,
    </>,
    portalElement
  );
};
