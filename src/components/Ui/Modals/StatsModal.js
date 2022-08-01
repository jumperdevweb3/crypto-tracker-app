import ReactDOM from "react-dom";

import classes from "./StatsModal.module.scss";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <span className="close-button" onClick={props.onClose}>
        X
      </span>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

export const StatsModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};
