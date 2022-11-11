import { Coin } from "../../../../types/types";
import classes from "./Community.module.scss";
import { BsTwitter, BsReddit } from "react-icons/bs";

export const Community = ({ item }: { item: Coin }) => {
  const { community_data } = item;

  const twitter = community_data.twitter_followers;
  const redditAccountsActive = community_data.reddit_accounts_active_48h;
  const redditSubs = community_data.reddit_subscribers;
  const redditAveragePost = community_data.reddit_average_posts_48h;
  const redditAverageComments = community_data.reddit_average_comments_48h;

  const communityExist =
    !!twitter ||
    !!redditAccountsActive ||
    !!redditSubs ||
    !!redditAveragePost ||
    !!redditAverageComments;

  const RedditSubsContent = !!redditSubs && (
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
  const TwitterContent = !!twitter && (
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
  const RedditAccountsContent = !!redditAccountsActive && (
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
  const RedditAveragePostsContent = !!redditAveragePost && (
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
  const RedditAverageCommentsContent = !!redditAverageComments && (
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
  const CommunnityContent = communityExist && (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {TwitterContent}
        {RedditSubsContent}
        {RedditAccountsContent}
        {RedditAveragePostsContent}
        {RedditAverageCommentsContent}
      </div>
    </div>
  );
  return <>{CommunnityContent}</>;
};
