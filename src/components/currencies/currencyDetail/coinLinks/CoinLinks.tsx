import { ICoin } from "@/types/types";
import { InstanceOf } from "reselect/es/types";
import classes from "./CoinLinks.module.scss";

export const CoinLinks = ({ links }: { links: ICoin["links"] }) => {
  const existHomepageLinks = links.homepage.filter((i) => i.trim().length);
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

  const homepageLinks = existHomepageLinks
    ? existHomepageLinks.map((i) => (
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
    existHomepageLinks.length > 0 ||
    existBlokchainLinks.length > 0 ||
    existForumLinks.length > 0;

  const blokchainLinksContent = existBlokchainLinks.length > 0 && (
    <>{blokchainLinks}</>
  );
  const hompageLinksContent = existHomepageLinks.length > 0 && (
    <>{homepageLinks}</>
  );
  const forumLinksContent = existForumLinks.length > 0 && <>{forumLinks}</>;
  const linksContent = linksExist && (
    <div className={classes["links-box"]}>
      {blokchainLinksContent}
      {hompageLinksContent}
      {forumLinksContent}
    </div>
  );
  return <>{linksContent}</>;
};
