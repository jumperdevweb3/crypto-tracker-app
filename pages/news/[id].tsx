import { getNewsDetail } from "@/components/news/fetchNews";
import { NewsDetails } from "@/components/news/newsDetails/NewsDetails";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { InferGetStaticPropsType } from "next";
//types
import { INewsItems } from "@/types/types";
import { IParams } from "@/types/types";

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

  const news: INewsItems = await getNewsDetail(id);

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
