import Link from "next/link";
import classes from "./MainNav.module.scss";
import { uiActions } from "../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import { useWindowSize } from "../../hooks/use-windowSize";
import { useRouter } from "next/router";
import { FiMenu } from "react-icons/fi";
//types
import { AppDispatch } from "../../store/store";
import { RootState } from "../../store/store";

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
    ? `${classes["mobile-nav"]} ${classes.active}`
    : classes["mobile-nav"];

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
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <p className={classes.logo}>Crypto App</p>
          {mobile && (
            <button onClick={toggleNav}>
              <FiMenu fontSize={"2rem"} color="#fff" />
            </button>
          )}
        </div>
        {mobile && (
          <nav className={navClass}>
            <ul className={classes["mobile-list"]}>{navList}</ul>
          </nav>
        )}

        {desktop && (
          <nav className={classes["desktop-nav"]}>
            <ul className={classes["links-list"]}>{navList}</ul>
          </nav>
        )}
      </div>
    </header>
  );
};
