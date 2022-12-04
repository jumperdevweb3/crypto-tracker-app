import { News } from "@/components/news/News";
import { getNewsData } from "@/components/news/fetchNews";
import { INewsItems } from "@/components/news/types";
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
  const news: INewsItems[] = await getNewsData();

  return {
    props: {
      news: news,
    },
  };
};
