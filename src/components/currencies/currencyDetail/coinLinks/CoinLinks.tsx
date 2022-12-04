import { ICoin } from "@/types/types";
import classes from "./CoinLinks.module.scss";

export const CoinLinks = ({ item }: { item: ICoin }) => {
  const { links } = item;

  const existHompageLinks = links.homepage.filter((i) => i.trim().length);
  const existBlokchainLinks = links.blockchain_site.filter(
    (i) => i.trim().length
  );
  const existForumLinks = links.official_forum_url.filter(
    (i) => i.trim().length
  );

  const forumLinks = existForumLinks
    ? existForumLinks.map((i) => (
        <a href={i} key={i}>
          {i}
        </a>
      ))
    : null;

  const homepageLinks = existHompageLinks
    ? existHompageLinks.map((i) => (
        <a href={i} key={i}>
          {i}
        </a>
      ))
    : null;

  const blokchainLinks = existBlokchainLinks
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

  const blokchainLinksContent = existBlokchainLinks.length > 0 && (
    <div className={classes.wrapper}>
      <p className={classes.title}>Blokchain: </p>
      <div className={classes.links}>{blokchainLinks}</div>
    </div>
  );
  const hompageLinksContent = existHompageLinks.length > 0 && (
    <div className={classes.wrapper}>
      <p className={classes.title}>Homepage:</p>
      <div className={classes.links}>{homepageLinks}</div>
    </div>
  );
  const forumLinksContent = existForumLinks.length > 0 && (
    <div className={classes.wrapper}>
      <p className={classes.title}>Official Forum:</p>
      <div className={classes.links}>{forumLinks}</div>
    </div>
  );
  const LinksContent = linksExist && (
    <div className={classes["links-box"]}>
      {blokchainLinksContent}
      {hompageLinksContent}
      {forumLinksContent}
    </div>
  );
  return <>{LinksContent}</>;
};
