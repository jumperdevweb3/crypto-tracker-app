import { createPortal } from "react-dom";
import { ModalTypes } from "../../../types/types";
import { Backdrop } from "../backdrop/Backdrop";
import { ModalOverlay } from "../modalOverlay/ModalOverlay";

export const Modal = (props: ModalTypes) => {
  const id = props.id;
  const portalElement = document.getElementById(id) as HTMLElement;

  return createPortal(
    <>
      <Backdrop onClose={props.onClose} />
      <ModalOverlay onClose={props.onClose} id={id}>
        {props.children}
      </ModalOverlay>
      ,
    </>,
    portalElement
  );
};
