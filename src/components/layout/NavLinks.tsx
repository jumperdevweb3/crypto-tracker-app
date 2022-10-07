import Link from "next/link";
import classes from "./MainNav.module.scss";
import { useRouter } from "next/router";
import { links } from "./links";

type Props = {
  toggle: (event: React.MouseEvent<HTMLElement>) => void;
};
export const NavLinks = ({ toggle }: Props) => {
  const router = useRouter();
  const navigationLinks = links.map((item) => {
    return (
      <li key={item.name}>
        <Link href={item.path}>
          <a
            className={router.pathname === item.path ? classes.active : " "}
            onClick={toggle}
          >
            {item.name}
          </a>
        </Link>
      </li>
    );
  });
  return <>{navigationLinks}</>;
};
