import { ICoin } from "@/types/types";
import { InstanceOf } from "reselect/es/types";
import classes from "./CoinLinks.module.scss";

export const CoinLinks = ({ links }: { links: ICoin["links"] }) => {
  const existHompageLinks = links.homepage.filter((i) => i.trim().length);
  const existBlokchainLinks = links.blockchain_site.filter(
    (i) => i.trim().length
  );
  const existForumLinks = links.official_forum_url.filter(
    (i) => i.trim().length
  );

  const splitLink = (url: string) => {
    return url.split("/")[2];
  };

  const forumLinks = existForumLinks
    ? existForumLinks.map((i) => (
        <a href={i} key={i}>
          {splitLink(i)}
        </a>
      ))
    : null;

  const homepageLinks = existHompageLinks
    ? existHompageLinks.map((i) => (
        <a href={i} key={i}>
          {splitLink(i)}
        </a>
      ))
    : null;

  const blokchainLinks = existBlokchainLinks
    ? existBlokchainLinks.map((i) => (
        <a href={i} key={i}>
          {splitLink(i)}
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
  const linksContent = linksExist && (
    <div className={classes["links-box"]}>
      {blokchainLinksContent}
      {hompageLinksContent}
      {forumLinksContent}
    </div>
  );
  return <>{linksContent}</>;
};
