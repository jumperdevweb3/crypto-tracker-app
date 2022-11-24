import Link from "next/link";
import classes from "./MainNav.module.scss";
import { uiActions } from "../../../store/ui/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import { useWindowSize } from "../../../hooks/use-windowSize";
import { FiMenu } from "react-icons/fi";
import { NavLinks } from "./NavLinks";
import { ImSearch } from "react-icons/im";
//types
import { AppDispatch } from "../../../store/store";
import { RootState } from "../../../store/store";
import { useState } from "react";
import { Modal } from "../../ui/modals/Modal";
import { SpotlightModal } from "../../currencies/spotlightModal/SpotlightModal";

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

  const MobileButton = mobile && (
    <button onClick={toggleNav}>
      <FiMenu fontSize={"2rem"} color="#fff" />
    </button>
  );
  const MobileNavContent = mobile && (
    <nav className={navClass}>
      <ul className={classes["mobile-list"]}>
        <NavLinks toggle={toggleNav} />
      </ul>
    </nav>
  );
  const DesktopNavContent = desktop && (
    <nav className={classes["desktop-nav"]}>
      <ul className={classes["links-list"]}>
        <NavLinks toggle={toggleNav} />
        <button
          className={classes["search-btn"]}
          onClick={() => setModalActive((state) => !state)}
        >
          <ImSearch fontSize={"1.2rem"} color="#fff" />
        </button>
      </ul>
    </nav>
  );
  const Spotlight = modalActive && (
    <SpotlightModal onClose={() => setModalActive((state) => !state)}>
      Modal
    </SpotlightModal>
  );
  return (
    <header className={classes.header}>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <Link href="/">
            <a>
              <p className={classes.logo}>Crypto Tracker</p>
            </a>
          </Link>
          {MobileButton}
        </div>
        {MobileNavContent}
        {DesktopNavContent}
        {Spotlight}
      </div>
    </header>
  );
};
