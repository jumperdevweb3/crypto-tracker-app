import { News } from "../../src/components/news/News";
import { getNewsData } from "../../src/components/news/fetchNews";
import { INewsItems } from "../../src/types/types";
import { GetStaticProps } from "next";
import Head from "next/head";

export default function NewsPage({ ...props }) {
  // const items = props.news;

  return (
    <>
      <Head>
        <title>News | Crypto Tracker</title>
      </Head>
      {/* <News items={items} /> */}
      <h2>It will back soon 😊</h2>
    </>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   const news: INewsItems[] = await getNewsData();

//   return {
//     props: {
//       news: news,
//     },
//   };
// };
