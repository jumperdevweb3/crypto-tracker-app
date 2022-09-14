import { News } from "../../components/news/News";
import { fetchNewsData } from "../../helpers/api-utils";
import { NewsItems } from "../../components/types/types";
import { GetStaticProps } from "next";

export default function NewsPage({ ...props }) {
  const items = props.news;
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
