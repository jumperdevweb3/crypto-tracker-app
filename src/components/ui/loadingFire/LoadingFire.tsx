import styles from "./LoadingFire.module.scss";
import Image from "next/image";
export const LoadingFire = () => {
  return (
    <div className={styles.box}>
      <Image
        src={"/loading.gif"}
        width={48}
        height={48}
        alt="Loading fire gif from 1inch"
      />
    </div>
  );
};
