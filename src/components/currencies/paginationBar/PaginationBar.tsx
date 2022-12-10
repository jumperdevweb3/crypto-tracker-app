import { useRouter } from "next/router";
import { Pagination } from "@mantine/core";
import classes from "./PaginationBar.module.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
interface Props {
  isLoading: boolean;
  disabled: boolean;
  page: number | string;
}

export const PaginationBar = ({ isLoading, disabled, page }: Props) => {
  const [inputPage, setInputPage] = useState("");
  const router = useRouter();

  const changePage = (event: number) => {
    router.push(`/?page=${event}`, undefined, { scroll: true });
  };
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.currentTarget.value;
    if (+eventValue >= 1 && +eventValue <= 200) {
      setInputPage(eventValue);
    } else {
      setInputPage("");
    }
  };
  const onPageSubmit = (event: FormEvent) => {
    event?.preventDefault();
    if (!!+inputPage) {
      changePage(+inputPage);
      setInputPage("");
    }
  };
  const PaginationBar = (
    <div className={classes.wrapper}>
      <Pagination
        total={200}
        className={classes.pagination}
        page={+page}
        onChange={changePage}
        disabled={isLoading || disabled}
        boundaries={2}
      />
      <form className={classes.controls} onSubmit={onPageSubmit}>
        <input
          type="number"
          className={classes.input}
          min={1}
          max={200}
          value={inputPage}
          onChange={onInputChange}
          placeholder="enter"
        />
        <button type="submit" className={classes.button}>
          <IoIosArrowForward fill={"#fff"} />
        </button>
      </form>
    </div>
  );
  return <>{PaginationBar}</>;
};
