import { MainNav } from "./MainNav";
import classes from "./Layout.module.scss";

export const Layout = ({ children }) => {
  return (
    <>
      <MainNav />
      <main className={classes.main}>{children}</main>
    </>
  );
};
