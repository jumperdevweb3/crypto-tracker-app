import { Navigation } from "./navigation/Navigation";
import classes from "./Layout.module.scss";
import { PropsChildren } from "../../types/types";
import { RootActions } from "../root/RootActions";
import { Footer } from "./footer/Footer";

export const Layout = ({ children }: PropsChildren) => {
  return (
    <RootActions>
      <Navigation />
      <main className={classes.main}>{children}</main>
      <Footer />
    </RootActions>
  );
};
