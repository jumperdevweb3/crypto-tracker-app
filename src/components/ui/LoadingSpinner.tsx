import classes from "./LoadingSpinner.module.scss";

export const LoadingSpinner = () => {
  return (
    <div className={classes.spinnerbox}>
      <div className={classes.spinner}></div>
    </div>
  );
};
