import Link from "next/link";
import classes from "./MainNav.module.scss";
import { uiActions } from "../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import { useWindowSize } from "../../hooks/use-windowSize";
import { useRouter } from "next/router";
//types
import { AppDispatch } from "../../store";
import { RootState } from "../../store";

export const MainNav = () => {
  const showNav = useSelector((state: RootState) => state.uiSlice.showNav);
  const dispatch = useDispatch<AppDispatch>();
  const { width } = useWindowSize();
  const router = useRouter();

  const links = [
    { name: "Home", path: "/" },
    { name: "Watchlist", path: "/watchlist" },
    { name: "Convert", path: "/convert" },
    { name: "Wallet Tracker", path: "/wallet-tracker" },
    { name: "News", path: "/news" },
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
        <Link href={item.path}>
          <a
            className={router.pathname === item.path ? classes.active : " "}
            onClick={toggleNav}
          >
            {item.name}
          </a>
        </Link>
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
