import { MainNav } from "./MainNav";
import classes from "./Layout.module.scss";
import { PropsChildren } from "../../types/types";
import { RootActions } from "../RootActions";

export const Layout = ({ children }: PropsChildren) => {
  return (
    <RootActions>
      <MainNav />
      <main className={classes.main}>{children}</main>
    </RootActions>
  );
};
