import { PropsChildren } from "@/types/types";
import classes from "./StatsModal.module.scss";

export const StatsModal = ({ children }: PropsChildren) => {
  return <div className={classes["stats-modal"]}>{children}</div>;
};
