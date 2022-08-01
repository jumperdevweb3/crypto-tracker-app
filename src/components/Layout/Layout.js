import { MainNav } from "./MainNav";
import classes from "./Layout.module.scss";

export const Layout = ({ children }) => {
  return (
    <div className={classes.container}>
      <MainNav />
      <main className={classes.main}>{children}</main>
      <footer>
        <a href="https://github.com/skoczy01">Check my GitHub</a>
      </footer>
    </div>
  );
};
