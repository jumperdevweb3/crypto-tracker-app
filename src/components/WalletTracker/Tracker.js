import classes from "./Tracker.module.scss";
import { FaSearch } from "react-icons/fa";

export const Tracker = () => {
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <input
          className={classes["input-search"]}
          type="search"
          placeholder="Search by wallet address to show ether balance..."
        />
        <button>
          <FaSearch fontSize="1.5rem" color="rgb(193, 162, 222)" />
        </button>
      </div>
      <div className={classes.result}>
        <p>
          Entered Wallet have a <span className={classes.amount}>31,243 </span>
          ETH
        </p>
      </div>
    </div>
  );
};
