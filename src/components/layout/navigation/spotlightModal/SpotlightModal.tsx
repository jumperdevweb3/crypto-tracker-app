import { createPortal } from "react-dom";
import { ModalProps } from "@/types/types";
import { Backdrop } from "../../../ui/backdrop/Backdrop";
import { SpotlightOverlay } from "./spotlightOverlay/SpotlightOverlay";
import Router from "next/router";
import { useEffect } from "react";

export const SpotlightModal = ({ onClose }: ModalProps) => {
  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.keyCode == 27) {
        onClose();
      }
    });
  }, []);

  useEffect(() => {
    Router.events.on("routeChangeStart", () => onClose());
  }, [Router]);
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
