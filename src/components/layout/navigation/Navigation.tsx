import Link from "next/link";
import classes from "./MainNav.module.scss";
import { uiActions } from "../../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import { useWindowSize } from "../../../hooks/use-windowSize";
import { FiMenu } from "react-icons/fi";
//types
import { AppDispatch } from "../../../store/store";
import { RootState } from "../../../store/store";
import { NavLinks } from "./NavLinks";

export const Navigation = () => {
  const showNav = useSelector((state: RootState) => state.uiSlice.showNav);
  const dispatch = useDispatch<AppDispatch>();
  const { width } = useWindowSize();

  const navClass = showNav
    ? `${classes["mobile-nav"]} ${classes.active}`
    : classes["mobile-nav"];

  const mobile = width <= 1023;
  const desktop = width >= 1024;

  const toggleNav = () => {
    dispatch(uiActions.showNavigation(!showNav));
  };
  return (
    <header className={classes.header}>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <Link href="/">
            <a>
              <p className={classes.logo}>Crypto App</p>
            </a>
          </Link>
          {mobile && (
            <button onClick={toggleNav}>
              <FiMenu fontSize={"2rem"} color="#fff" />
            </button>
          )}
        </div>
        {mobile && (
          <nav className={navClass}>
            <ul className={classes["mobile-list"]}>
              <NavLinks toggle={toggleNav} />
            </ul>
          </nav>
        )}

        {desktop && (
          <nav className={classes["desktop-nav"]}>
            <ul className={classes["links-list"]}>
              <NavLinks toggle={toggleNav} />
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};