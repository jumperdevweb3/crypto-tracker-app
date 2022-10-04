import { News } from "../../src/components/news/News";
import { fetchNewsData } from "../../src/helpers/api-utils";
import { NewsItems } from "../../src/types/types";
import { GetStaticProps } from "next";
import { fetchSubpageId } from "../../src/helpers/api-utils";
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
