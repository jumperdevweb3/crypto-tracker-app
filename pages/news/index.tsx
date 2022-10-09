import { News } from "../../src/components/news/News";
import { fetchNewsData } from "../../src/components/utils/api-utils";
import { NewsItems } from "../../src/types/types";
import { GetStaticProps } from "next";
import { fetchSubpageId } from "../../src/components/utils/api-utils";
import { useEffect } from "react";
import Head from "next/head";

export default function NewsPage({ ...props }) {
  const items = props.news;

  useEffect(() => {
    fetchSubpageId();
  }, []);

  return (
    <>
      <Head>
        <title>News | Crypto Tracker App</title>
      </Head>
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
