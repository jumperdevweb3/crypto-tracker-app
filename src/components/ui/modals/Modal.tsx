import { createPortal } from "react-dom";
import { ModalTypes } from "../../../types/types";
import { Backdrop } from "../backdrop/Backdrop";
import { ModalOverlay } from "../modalOverlay/ModalOverlay";

export const Modal = (props: ModalTypes) => {
  return createPortal(
    <>
      <div id="modal">
        <Backdrop onClose={props.onClose} />
        <ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>
      </div>
    </>,
    document.body
  );
};
