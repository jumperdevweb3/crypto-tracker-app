import { News } from "../../src/components/news/News";
import { getNewsData } from "../../src/components/news/fetchNews";
import { NewsItems } from "../../src/types/types";
import { GetStaticProps } from "next";
import Head from "next/head";

export default function NewsPage({ ...props }) {
  const items = props.news;

  return (
    <>
      <Head>
        <title>News | Crypto Tracker</title>
      </Head>
      <News items={items} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const news: NewsItems[] = await getNewsData();

  return {
    props: {
      news: news,
    },
    revalidate: 180,
  };
};
