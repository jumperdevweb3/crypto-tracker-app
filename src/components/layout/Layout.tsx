import { MainNav } from "./MainNav";
import classes from "./Layout.module.scss";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export const Layout = ({ children }: Props) => {
  return (
    <>
      <MainNav />
      <main className={classes.main}>{children}</main>
    </>
  );
};
