import { createPortal } from "react-dom";
import { ModalProps } from "../../../types/types";
import { Backdrop } from "../../ui/backdrop/Backdrop";
import { SpotlightOverlay } from "./SpotlightOverlay";

export const SpotlightModal = ({ onClose }: ModalProps) => {
  return createPortal(
    <>
      <div id="modal">
        <Backdrop onClose={onClose} />
        <SpotlightOverlay />
      </div>
    </>,
    document.body
  );
};
