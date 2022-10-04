import classes from "./Backdrop.module.scss";

type BackdropProps = {
  onClose: () => void;
};

export const Backdrop = ({ onClose }: BackdropProps) => {
  return <div className={classes.backdrop} onClick={onClose} />;
};
