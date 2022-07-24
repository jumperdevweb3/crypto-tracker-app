import { Fragment } from "react";
import { MainNav } from "./MainNav";
import classes from "./Layout.module.scss";

export const Layout = (props) => {
  return (
    <Fragment>
      <MainNav />
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
};
