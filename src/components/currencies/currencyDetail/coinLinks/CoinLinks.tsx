import { Coin } from "../../../../types/types";
import classes from "./CoinLinks.module.scss";

export const CoinLinks = ({ item }: { item: Coin }) => {
  const { links } = item;

  const existHompageLinks = links.homepage.filter((i) => i.trim().length);
  const existBlokchainLinks = links.blockchain_site.filter(
    (i) => i.trim().length
  );
  const existForumLinks = links.official_forum_url.filter(
    (i) => i.trim().length
  );

  const ForumLinks = existForumLinks
    ? existForumLinks.map((i) => (
        <a href={i} key={i}>
          {i}
        </a>
      ))
    : null;

  const HomepageLinks = existHompageLinks
    ? existHompageLinks.map((i) => (
        <a href={i} key={i}>
          {i}
        </a>
      ))
    : null;

  const BlokchainLinks = existBlokchainLinks
    ? existBlokchainLinks.map((i) => (
        <a href={i} key={i}>
          {i}
        </a>
      ))
    : null;

  const linksExist =
    existHompageLinks.length > 0 ||
    existBlokchainLinks.length > 0 ||
    existForumLinks.length > 0;

  const BlokchainLinksContent = existBlokchainLinks.length > 0 && (
    <div className={classes.wrapper}>
      <p className={classes.title}>Blokchain: </p>
      <div className={classes.links}>{BlokchainLinks}</div>
    </div>
  );
  const HompageLinksContent = existHompageLinks.length > 0 && (
    <div className={classes.wrapper}>
      <p className={classes.title}>Homepage:</p>
      <div className={classes.links}>{HomepageLinks}</div>
    </div>
  );
  const ForumLinksContent = existForumLinks.length > 0 && (
    <div className={classes.wrapper}>
      <p className={classes.title}>Official Forum:</p>
      <div className={classes.links}>{ForumLinks}</div>
    </div>
  );
  const LinksContent = linksExist && (
    <div className={classes["links-box"]}>
      {BlokchainLinksContent}
      {HompageLinksContent}
      {ForumLinksContent}
    </div>
  );
  return <>{LinksContent}</>;
};
