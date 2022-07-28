import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import classes from "./MainNav.module.scss";
import { uiActions } from "../../Store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
export const MainNav = () => {
  // const [showNav, setShowNav] = useState(false);
  const showNav = useSelector((state) => state.uiSlice.showNav);
  const dispatch = useDispatch();

  let navClass;
  if (showNav) {
    navClass = `${classes["mobile-list"]} ${classes.active}`;
  }
  if (!showNav) {
    navClass = classes["mobile-list"];
  }

  const toggleNav = () => {
    dispatch(uiActions.showNavigation(!showNav));
  };
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link className={classes.logo} to="/" onClick={toggleNav}>
          Crypto App
        </Link>

        <button className={classes["hamburger"]} onClick={toggleNav}>
          <span className={classes["hamburger__box"]}>
            <span className={classes["hamburger__inner"]}></span>
          </span>
        </button>
        <nav>
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
        </nav>
      </div>
    </header>
  );
};
