import { ICoin } from "../../../../types/types";
import classes from "./Community.module.scss";
import { BsTwitter, BsReddit } from "react-icons/bs";

export const Community = ({
  community,
}: {
  community: ICoin["community_data"];
}) => {
  const twitter = community.twitter_followers;
  const redditAccountsActive = community.reddit_accounts_active_48h;
  const redditSubs = community.reddit_subscribers;
  const redditAveragePost = community.reddit_average_posts_48h;
  const redditAverageComments = community.reddit_average_comments_48h;

  const communityExist =
    !!twitter ||
    !!redditAccountsActive ||
    !!redditSubs ||
    !!redditAveragePost ||
    !!redditAverageComments;

  const redditSubsContent = !!redditSubs && (
    <p>
      <BsReddit color="#FF4500" fontSize={"1.5rem"} />
      Reddit subscribers
      <span>
        {" "}
        {redditSubs.toLocaleString("en-US", {
          minimumFractionDigits: 2,
        })}
      </span>
    </p>
  );
  const twitterContent = !!twitter && (
    <p>
      <BsTwitter color="#1DA1F2" fontSize={"1.5rem"} />
      Follow{"`"}s{" "}
      <span>
        {twitter.toLocaleString("en-US", {
          minimumFractionDigits: 2,
        })}
      </span>
    </p>
  );
  const redditAccountsContent = !!redditAccountsActive && (
    <p>
      <BsReddit color="#FF4500" fontSize={"1.5rem"} />
      Reddit accounts active (48h)
      <span>
        {redditAccountsActive.toLocaleString("en-US", {
          minimumFractionDigits: 2,
        })}
      </span>
    </p>
  );
  const redditAveragePostsContent = !!redditAveragePost && (
    <p>
      <BsReddit color="#FF4500" fontSize={"1.5rem"} />
      Reddit average posts (48h)
      <span>
        {" "}
        {redditAveragePost.toLocaleString("en-US", {
          minimumFractionDigits: 2,
        })}
      </span>
    </p>
  );
  const redditAverageCommentsContent = !!redditAverageComments && (
    <p>
      <BsReddit color="#FF4500" fontSize={"1.5rem"} />
      Reddit average comments (48h)
      <span>
        {" "}
        {redditAverageComments.toLocaleString("en-US", {
          minimumFractionDigits: 2,
        })}
      </span>
    </p>
  );
  const communnityContent = communityExist && (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {twitterContent}
        {redditSubsContent}
        {redditAccountsContent}
        {redditAveragePostsContent}
        {redditAverageCommentsContent}
      </div>
    </div>
  );
  return <>{communnityContent}</>;
};
