import { getNewsDetail, fetchNewsData } from "../../helpers/api-utils";
import { NewsDetails } from "../../components/news/NewsDetails";
import { NewsItems } from "../../components/types/types";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { InferGetStaticPropsType } from "next";

const DetialPage: NextPage = ({
  selectedNews,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!selectedNews) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }
  return <NewsDetails id={selectedNews.id} title={selectedNews.title} />;
};
export default DetialPage;

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;

  const news: NewsItems = await getNewsDetail(id);

  if (!news) return { notFound: true };
  return {
    props: {
      selectedNews: news,
    },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const news = await fetchNewsData();

  const paths = news.map((newsItem) => ({ params: { id: newsItem.id } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
};
