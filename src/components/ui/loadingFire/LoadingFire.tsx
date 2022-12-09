import styles from "./LoadingFire.module.scss";
import Image from "next/image";
export const LoadingFire = () => {
  return (
    <div className={styles.box}>
      <Image src={"/loading.png"} width={48} height={48} alt="Loading fire" />
    </div>
  );
};
