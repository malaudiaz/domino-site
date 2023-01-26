import { useContext } from "react";
import AppContext from "../../AppContext";
import Link from "next/link";

const BreadcrumbItem = ({ children, href, ...props }) => {
  const value = useContext(AppContext);
  const t = value.state.languages.breadcrumb;

  if (props.isCurrent) {
    return (
      <li className={props.isCurrent ? "active" : ""}>
        <a>
          <i className={props.icon}></i> {t[children]}
        </a>
      </li>
    );
  } else {
    return (
      <li className={props.isCurrent ? "active" : ""}>
        <Link href={href} passHref>
          <a>
            <i className={props.icon}></i> {t[children]}
          </a>
        </Link>
      </li>
    );
  }
};

export default BreadcrumbItem;
