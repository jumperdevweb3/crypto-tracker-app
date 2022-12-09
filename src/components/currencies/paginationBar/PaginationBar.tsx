import { useRouter } from "next/router";
import { Pagination } from "@mantine/core";
import classes from "./PaginationBar.module.scss";

interface Props {
  isLoading: boolean;
  disabled: boolean;
  page: number | string;
}

export const PaginationBar = ({ isLoading, disabled, page }: Props) => {
  const router = useRouter();

  const changePage = (event: number) => {
    router.push(`/?page=${event}`, undefined, { scroll: true });
  };
  const PaginationBar = (
    <Pagination
      total={100}
      className={classes.pagination}
      page={+page}
      onChange={changePage}
      disabled={isLoading || disabled}
      boundaries={2}
    />
  );
  return <>{PaginationBar}</>;
};
