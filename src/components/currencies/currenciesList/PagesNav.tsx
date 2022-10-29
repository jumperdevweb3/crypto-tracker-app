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
  return (
    <div className={classes.pages}>
      {pagesPaths.map((item) => (
        <Link
          key={item.page}
          href={{
            pathname: "/",
            query: { page: item.page },
          }}
          scroll={false}
        >
          <a
            className={
              router.asPath === `/?page=${item.page}`
                ? activePageStyle
                : router.asPath === "/"
                ? classes["home-page"]
                : classes.link
            }
          >
            {item.page}
          </a>
        </Link>
      ))}
    </div>
  );
};
