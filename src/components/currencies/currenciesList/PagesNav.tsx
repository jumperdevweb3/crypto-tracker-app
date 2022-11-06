import classes from "./CurrenciesList.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

const pagesPaths = [
  { page: "1" },
  { page: "2" },
  { page: "3" },
  { page: "4" },
  { page: "5" },
];
export const PagesNav = () => {
  const router = useRouter();
  const activePageStyle = `${classes.link} ${classes.active}`;

  const Paths = pagesPaths.map((item) => {
    const activeClass =
      router.asPath === `/?page=${item.page}`
        ? activePageStyle
        : router.asPath === "/"
        ? classes["home-page"]
        : classes.link;

    return (
      <Link
        key={item.page}
        href={{
          pathname: "/",
          query: { page: item.page },
        }}
        scroll={false}
      >
        <a className={activeClass}>{item.page}</a>
      </Link>
    );
  });
  return <div className={classes.pages}>{Paths}</div>;
};
