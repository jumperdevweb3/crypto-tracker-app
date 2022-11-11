import classes from "./NewsDetails.module.scss";
import ReactMarkdown from "react-markdown";
import { getNewsContent } from "../fetchNews";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../../ui/loadingSpinner/LoadingSpinner";

interface PropsDetials {
  id: string;
  title: string;
}

export const NewsDetails = (props: PropsDetials) => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id, title } = props;
  async function getData() {
    setIsLoading(true);
    const data = await getNewsContent(id);
    setIsLoading(false);
    return setContent(data.content);
  }
  useEffect(() => {
    getData();
  }, []);

  const LoadingContent = isLoading && <LoadingSpinner />;
  const NewsContent = !isLoading && (
    <article className={classes.article}>
      {" "}
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
  return (
    <div>
      <div key={id} className={classes.content}>
        <h2 className={classes.title}>{title}</h2>
        {LoadingContent}
        {NewsContent}
      </div>
    </div>
  );
};
