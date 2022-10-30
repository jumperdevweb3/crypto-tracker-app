import { getNewsDetail } from "../../src/utils/api-utils";
import { NewsDetails } from "../../src/components/news/newsDetails/NewsDetails";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
//types
import { InferGetStaticPropsType } from "next";
import { NewsItems } from "../../src/types/types";
import { IParams } from "../../src/types/types";

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

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;

  const news: NewsItems = await getNewsDetail(id);

  if (!news) return { notFound: true };
  return {
    props: {
      selectedNews: news,
    },
    revalidate: 180,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
