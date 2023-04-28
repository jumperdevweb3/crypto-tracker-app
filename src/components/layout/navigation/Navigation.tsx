import Link from "next/link";
import classes from "./Navigation.module.scss";
import { uiActions } from "../../../store/ui/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import { useWindowSize } from "../../../hooks/use-windowSize";
import { FiMenu } from "react-icons/fi";
import { NavLinks } from "./navLinks/NavLinks";
import { ImSearch } from "react-icons/im";
import { useState } from "react";
import { SpotlightModal } from "./spotlightModal/SpotlightModal";
//types
import { AppDispatch } from "../../../store/store";
import { RootState } from "../../../store/store";
import { BiCommand } from "react-icons/bi";

export const Navigation = () => {
  const showNav = useSelector((state: RootState) => state.uiSlice.showNav);
  const [modalActive, setModalActive] = useState(false);

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
  const searchButton = (
    <div className={classes["input-box"]}>
      <input
        placeholder="Search currencies"
        className={classes["search-input"]}
        // onClick={() => setModalActive((state) => !state)}
      />
      <ImSearch fontSize={"1rem"} className={classes.search} />
      <div className={classes["shortcut-box"]}>
        <BiCommand fontSize={"1rem"} className={classes.command} />
        <span>K</span>
      </div>
    </div>
  );
  const mobileButton = mobile && (
    <div className={classes["btn-box"]}>
      {searchButton}
      <button onClick={toggleNav} className={classes.hamburger}>
        <FiMenu fontSize={"2rem"} color="#fff" />
      </button>
    </div>
  );
  const mobileNavContent = mobile && (
    <nav className={navClass}>
      <ul className={classes["mobile-list"]}>
        <NavLinks toggle={toggleNav} />
      </ul>
    </nav>
  );
  const desktopNavContent = desktop && (
    <nav className={classes["desktop-nav"]}>
      <ul className={classes["links-list"]}>
        <NavLinks toggle={toggleNav} />
        {searchButton}
      </ul>
    </nav>
  );
  const Spotlight = modalActive && (
    <SpotlightModal onClose={() => setModalActive(false)} />
  );
  return (
    <header className={classes.header}>
      <div className={classes.underfill}></div>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <h1 className={classes.logo}>
            <Link href="/">
              <a>Crypto Tracker </a>
            </Link>
          </h1>
          {mobileButton}
        </div>
        {mobileNavContent}
        {desktopNavContent}
        {Spotlight}
      </div>
    </header>
  );
};
