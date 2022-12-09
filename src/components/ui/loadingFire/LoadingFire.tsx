import styles from "./LoadingFire.module.scss";
import Image from "next/image";
import loadingImg from "public/loading.gif";

export const LoadingFire = () => {
  return (
    <div className={styles.box}>
      <Image
        src={loadingImg}
        width={48}
        height={48}
        alt="Loading fire gif from 1inch"
      />
    </div>
  );
};
