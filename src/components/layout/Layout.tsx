import { MainNav } from "./MainNav";
import classes from "./Layout.module.scss";
import { PropsChildren } from "../../types/types";
import { RootActions } from "../RootActions";
import { Footer } from "../ui/Footer";

export const Layout = ({ children }: PropsChildren) => {
  return (
    <RootActions>
      <MainNav />
      <main className={classes.main}>{children}</main>
      <Footer />
    </RootActions>
  );
};
