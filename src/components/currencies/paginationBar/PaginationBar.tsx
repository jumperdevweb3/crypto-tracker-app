import { Pagination } from "@mantine/core";
import classes from "./PaginationBar.module.scss";

interface Props {
  isLoading: boolean;
  disabled: boolean;
  page: number;
  changePage: (page: number) => void;
}

export const PaginationBar = ({ isLoading, disabled, page, changePage }: Props) => {
    return (
        <Pagination
          total={100}
          className={classes.pagination}
          page={page}
          onChange={changePage}
          disabled={isLoading || disabled}
          boundaries={2}
        />
    )
};
