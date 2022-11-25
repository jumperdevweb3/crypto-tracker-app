import Link from "next/link";
import classes from "./NavLinks.module.scss";
import { useRouter } from "next/router";
import { links } from "../links";

type Props = {
  toggle: (event: React.MouseEvent<HTMLElement>) => void;
};
export const NavLinks = ({ toggle }: Props) => {
  const router = useRouter();
  const NavigationLinks = links.map((item) => {
    const activeStyle = `${classes.active} ${classes.link}`;
    return (
      <li key={item.name} className={classes["list-item"]}>
        <Link href={item.path}>
          <a
            className={
              router.pathname === item.path ? activeStyle : classes.link
            }
            onClick={toggle}
          >
            {item.name}
          </a>
        </Link>
      </li>
    );
  });
  return <>{NavigationLinks}</>;
};
