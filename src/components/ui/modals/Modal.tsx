import { createPortal } from "react-dom";
import { ModalProps } from "@/types/types";
import { Backdrop } from "../backdrop/Backdrop";
import { ModalOverlay } from "../modalOverlay/ModalOverlay";

export const Modal = (props: ModalProps) => {
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
