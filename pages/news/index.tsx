import { News } from "../../components/news/News";
import { fetchNewsData } from "../../helpers/api-utils";
import { NewsItems } from "../../components/types/types";
import { GetStaticProps } from "next";
import { fetchSubpageId } from "../../helpers/api-utils";
import { useEffect } from "react";

export default function NewsPage({ ...props }) {
  const items = props.news;

  useEffect(() => {
    fetchSubpageId();
  }, []);

  return (
    <>
      <News items={items} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const news: NewsItems[] = await fetchNewsData();

  return {
    props: {
      news: news,
    },
    revalidate: 180,
  };
};
