import { NavLink, Link } from "react-router-dom";
import classes from "./MainNav.module.scss";
import { uiActions } from "../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import { useWindowSize } from "../../hooks/use-windowSize";
export const MainNav = () => {
  const showNav = useSelector((state) => state.uiSlice.showNav);
  const dispatch = useDispatch();
  const { width } = useWindowSize();

  let navClass;
  if (showNav) {
    navClass = `${classes["mobile-list"]} ${classes.active}`;
  }
  if (!showNav) {
    navClass = classes["mobile-list"];
  }
  const mobile = width <= 1023;
  const desktop = width >= 1024;

  const toggleNav = () => {
    dispatch(uiActions.showNavigation(!showNav));
  };
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link className={classes.logo} to="/" onClick={toggleNav}>
          Crypto App
        </Link>

        {mobile && (
          <button className={classes["hamburger"]} onClick={toggleNav}>
            <span className={classes["hamburger__box"]}>
              <span className={classes["hamburger__inner"]}></span>
            </span>
          </button>
        )}
        <nav>
          {desktop && (
            <ul className={classes["links-list"]}>
              <li>
                <NavLink
                  to="/"
                  activeClassName={classes.active}
                  exact
                  onClick={toggleNav}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/watchlist"
                  activeClassName={classes.active}
                  onClick={toggleNav}
                >
                  Watchlist
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/convert"
                  activeClassName={classes.active}
                  onClick={toggleNav}
                >
                  Convert
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/wallet-tracker"
                  activeClassName={classes.active}
                  onClick={toggleNav}
                >
                  Wallet Tracker
                </NavLink>
              </li>
            </ul>
          )}

          {mobile && (
            <ul className={navClass}>
              <li>
                <NavLink
                  to="/"
                  activeClassName={classes.active}
                  exact
                  onClick={toggleNav}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/watchlist"
                  activeClassName={classes.active}
                  onClick={toggleNav}
                >
                  Watchlist
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/convert"
                  activeClassName={classes.active}
                  onClick={toggleNav}
                >
                  Convert
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/wallet-tracker"
                  activeClassName={classes.active}
                  onClick={toggleNav}
                >
                  Wallet Tracker
                </NavLink>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};
