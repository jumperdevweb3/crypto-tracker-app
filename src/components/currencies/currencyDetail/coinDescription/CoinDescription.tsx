import classes from "./CoinDescription.module.scss";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
export const CoinDescription = ({ description }: { description: string }) => {
  if (!!description) {
    return (
      <div className={classes["description-box"]}>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{description}</ReactMarkdown>
      </div>
    );
  }
  return <></>;
};
