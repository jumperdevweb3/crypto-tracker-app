import Link from "next/link";
import classes from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={classes.footer}>
      <Link href="https://github.com/skoczy01/crypto-tracker-app" passHref>
        <a target="_blank">Project GitHub</a>
      </Link>
      <Link href="https://github.com/skoczy01" passHref>
        <a target="_blank">Author</a>
      </Link>
    </footer>
  );
};
