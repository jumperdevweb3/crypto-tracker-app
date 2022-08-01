import { NavLink } from "react-router-dom";
import classes from "./MainNav.module.scss";
import { uiActions } from "../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import { useWindowSize } from "../../hooks/use-windowSize";
export const MainNav = () => {
  const showNav = useSelector((state) => state.uiSlice.showNav);
  const dispatch = useDispatch();
  const { width } = useWindowSize();

  const links = [
    { name: "Home", path: "/" },
    { name: "Watchlist", path: "/watchlist" },
    { name: "Convert", path: "/convert" },
    { name: "Wallet Tracker", path: "/wallet-tracker" },
  ];

  const navClass = showNav
    ? `${classes["mobile-list"]} ${classes.active}`
    : classes["mobile-list"];

  const mobile = width <= 1023;
  const desktop = width >= 1024;

  const toggleNav = () => {
    dispatch(uiActions.showNavigation(!showNav));
  };

  const navList = links.map((item) => {
    return (
      <li key={item.name}>
        <NavLink
          to={item.path}
          activeClassName={classes.active}
          onClick={toggleNav}
          exact={item.path === "/"}
        >
          {item.name}
        </NavLink>
      </li>
    );
  });
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <p className={classes.logo}>Crypto App</p>

        {mobile && (
          <button className={classes["hamburger"]} onClick={toggleNav}>
            <span className={classes["hamburger__box"]}>
              <span className={classes["hamburger__inner"]}></span>
            </span>
          </button>
        )}
        <nav>
          {desktop && <ul className={classes["links-list"]}>{navList}</ul>}

          {mobile && <ul className={navClass}>{navList}</ul>}
        </nav>
      </div>
    </header>
  );
};
