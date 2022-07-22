import { NavLink, Link } from "react-router-dom";
import classes from "./MainNav.module.scss";

export const MainNav = () => {
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link className={classes.logo} to="/">
          Crypto App
        </Link>
        <nav>
          <ul className={classes["links-list"]}>
            <li>
              <NavLink to="/home" activeClassName={classes.active}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/watchlist" activeClassName={classes.active}>
                Watchlist
              </NavLink>
            </li>
            <li>
              <NavLink to="/convert" activeClassName={classes.active}>
                Convert
              </NavLink>
            </li>
            <li>
              <NavLink to="/wallet-tracker" activeClassName={classes.active}>
                Wallet Tracker
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
