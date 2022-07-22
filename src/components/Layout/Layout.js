import { Fragment } from "react";
import { MainNav } from "./MainNav";

export const Layout = (props) => {
  return (
    <Fragment>
      <MainNav />
      <main>{props.children}</main>
    </Fragment>
  );
};
