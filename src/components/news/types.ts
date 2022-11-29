export interface INewsItems {
  id: string;
  published_at: string;
  author: {
    name: string;
  };
  content: string;
  tags: string[] | string;
  title: string;
  url: string;
}

export interface INewsList {
  items: INewsItems[];
}
