import { useRouter } from "next/router";
import Link from "next/link";

const Sidebar = () => {
  const router = useRouter();

  const menus = [
    {
      id: 0,
      text: "Inicio",
      iconClass: "bi bi-house-door-fill",
      path: "/",
      hasChild: false,
      parent_id: null,
      target: null,
    },
    {
      id: 1,
      text: "Torneos",
      iconClass: "bi bi-trophy-fill",
      path: "/tournaments",
      hasChild: false,
      parent_id: null,
      target: null,
    },
    {
      id: 2,
      text: "Jugadores",
      iconClass: "bi bi-people-fill",
      path: "/players",
      hasChild: false,
      parent_id: null,
      target: null,
    },
    {
      id: 3,
      text: "Prueba",
      iconClass: "bi bi-grid",
      path: "/private",
      hasChild: false,
      parent_id: null,
      target: null,
    },
    {
      id: 4,
      text: "Pages",
      iconClass: "bi bi-page",
      path: "#",
      hasChild: true,
      parent_id: null,
      target: "_blank",
    },
    {
      id: 5,
      text: "404",
      iconClass: "bi bi-page",
      path: "/blank",
      hasChild: false,
      parent_id: 4,
      target: null,
    },
  ];

  const mainMenu = (
    { id, text, path, iconClass, hasChild, parent_id, target },
    index
  ) => {
    if (id == 0) {
      return (
        <li className="nav-item" key={index}>
          <Link href={path}>
            <a
              className={
                router.asPath === path ? "nav-link active" : "nav-link"
              }
            >
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
                className={
                  router.asPath === path ? "nav-link" : "nav-link collapsed"
                }
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
                {menus.map(({ text, path, parent_id }, idx) => {
                  if (parent_id == id) {
                    return (
                      <Link key={idx} href={path}>
                        <a  className={router.asPath === path ? "collapse-item active" : "collapse-item"} href="#">
                          {text}
                        </a>
                      </Link>
                    );
                  }
                })}
              </div>
            </div>
          </li>
        );
      } else {
        if (!parent_id && path != "-") {
          return (
            <li className="nav-item" key={index}>
              <Link href={path}>
                <a
                  className={
                    router.asPath === path ? "nav-link active" : "nav-link"
                  }
                >
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
  };

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
