import Link from "next/link";

const BreadcrumbItem = ({ children, href, ...props }) => {
  if (props.isCurrent) {
    if (href === "/") {
      return (
        <li className="active">
          <a>
            <i className={props.icon}></i>
          </a>{" "}
          {children}
        </li>
      );
    } else {
      return (
        <li className="active">
          <a>{children}</a>
        </li>
      );
    }
  } else {
    if (href === "/") {
      return (
        <li>
          <Link href={href} passHref>
            <a>
              <i className={props.icon}></i> {children}
            </a>
          </Link>
        </li>
      );
    } else {
      return (
        <li>
          <Link href={href} passHref>
            <a>{children}</a>
          </Link>
        </li>
      );
    }
  }
};

export default BreadcrumbItem;
