
import { useRouter } from "next/router";
import Link from "next/link";

const Sidebar = () => {
  const router = useRouter();

  const activeRoute = (routeName) => {
    return router.route.indexOf(routeName) > -1;
  };

  const menus = [
    {
      id: 0,
      text: "Torneos",
      iconClass: "bi bi-house-door-fill",
      path: "/",
      hasChild: false,
      parent_id: null,
      target: null,
    },
    {
      id: 1,
      text: "Private",
      iconClass: "bi bi-grid",
      path: "/private",
      hasChild: false,
      parent_id: null,
      target: null,
    },
    {
      id: 2,
      text: "Pages",
      iconClass: "bi bi-page",
      path: "#",
      hasChild: true,
      parent_id: null,
      target: "_blank",
    },
    {
      id: 3,
      text: "Blank",
      iconClass: "bi bi-page",
      path: "/blank",
      hasChild: false,
      parent_id: 2,
      target: null,
    }

  ];

  const mainMenu = ({ id, text, path, iconClass, hasChild, parent_id, target }, index) => {
    
    if (id == 0) {
      return (
        <li className="nav-item" key={index}>
          <Link href={path}>
            <a className={router.asPath === path ? "nav-link active" : "nav-link"}>
              <i className={iconClass}></i>
              <span>{text}</span>
            </a>
          </Link>
        </li>
      );
    } else {
      if (hasChild) {
        return (
          <li className="nav-item" key={index}>
            <Link href={path}>
              <a
                className={router.asPath === path ? "nav-link" : "nav-link collapsed"}
                data-bs-target={"#" + target}
                data-bs-toggle="collapse"
              >
                <i className={iconClass}></i>
                <span>{text}</span>
                <i className="bi bi-chevron-right ms-auto"></i>
              </a>
            </Link>


            <div id={target} className="collapse p-2">
                <div className="bg-gray-200 py-2 collapse-inner rounded">
                    <h6 className="collapse-header">Custom Components:</h6>
                    <a className="collapse-item" href="buttons.html">Buttons</a>
                    <a className="collapse-item" href="cards.html">Cards</a>
                </div>
            </div>


            {/* <ul
              id={target}
              className="collapse "
              data-bs-parent="#sidebar-nav"
            >
              {menus.map(({ text, path, parent_id, className }, idx) => {
                if (parent_id == id) {
                  return (


                    
                    <li key={idx}>
                      <Link href={path}>
                        <a className={router.asPath === path ? "nav-link active" : "collapse-item"}>
                          <i className={className}></i>
                          <span>{text}</span>
                        </a>
                      </Link>
                    </li>
                  );
                }
              })}
            </ul> */}


          </li>
        );
      } else {
        if (!parent_id && path != "-") {
          return (
            <li className="nav-item" key={index}>
              <Link href={path}>
                <a className={router.asPath === path ? "nav-link active" : "nav-link"}>
                  <i className={iconClass}></i>
                  <span>{text}</span>
                </a>
              </Link>
            </li>
          );
        } else {
          if (path == "-") {
            return (
              <li className="nav-heading" key={index}>
                {text}
              </li>
            );
          }
        }
      }
    }
  }  

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {menus.map((menu, index) => {
          return mainMenu(menu, index);
        })}
      </ul>
    </aside>
  );
};
export default Sidebar;
