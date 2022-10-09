import classes from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={classes.footer}>
      <a href="https://github.com/skoczy01/crypto-tracker-app">
        Project GitHub
      </a>
      <a href="https://github.com/skoczy01">Author</a>
    </footer>
  );
};
