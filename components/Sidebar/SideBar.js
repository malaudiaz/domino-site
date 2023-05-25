import { useRouter } from "next/router";
import Link from "next/link";

const Sidebar = () => {
  const router = useRouter();

  const menus = [
    {
      id: 0,
      text: "Inicio",
      iconClass: "bi bi-house-door",
      path: "/",
      hasChild: false,
      parent_id: null,
      target: null,
    },
    {
      id: 1,
      text: "Eventos",
      iconClass: "bi bi-calendar3",
      path: "/events",
      hasChild: false,
      parent_id: null,
      target: null,
    },
    {
      id: 1,
      text: "Event",
      iconClass: "bi bi-calendar3",
      path: "/event",
      hasChild: false,
      parent_id: null,
      target: null,
    },
    // {
    //   id: 2,
    //   text: "Jugadores",
    //   iconClass: "bi bi-people",
    //   path: "/players",
    //   hasChild: false,
    //   parent_id: null,
    //   target: null,
    // },
    // {
    //   id: 3,
    //   text: "Prueba",
    //   iconClass: "bi bi-grid",
    //   path: "/private",
    //   hasChild: false,
    //   parent_id: null,
    //   target: null,
    // },
    // {
    //   id: 4,
    //   text: "Forms",
    //   iconClass: "bi bi-journal-text",
    //   path: "#",
    //   hasChild: true,
    //   parent_id: null,
    //   target: "_blank",
    // },
    // {
    //   id: 5,
    //   text: "Test",
    //   iconClass: "",
    //   path: "/forms/test",
    //   hasChild: false,
    //   parent_id: 4,
    //   target: null,
    // },
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
                router.asPath === path
                  ? "nav-link active"
                  : "nav-link collapsed"
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
            <a
              className={
                router.asPath === path
                  ? "nav-link collapsed"
                  : "nav-link collapsed"
              }
              data-bs-target={"#" + target}
              data-bs-toggle="collapse"
            >
              <i className={iconClass}></i>
              <span>{text}</span>
              <i className="bi bi-chevron-right ms-auto"></i>
            </a>

            <ul
              id={target}
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              {menus.map(({ text, path, parent_id }, idx) => {
                if (parent_id == id) {
                  return (
                    <li key={idx}>
                      <Link href={path}>
                        <a href="#">
                          <i className="bi bi-circle"></i>
                          <span>{text}</span>
                        </a>
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </li>
        );
      } else {
        if (!parent_id && path != "-") {
          return (
            <li className="nav-item" key={index}>
              <Link href={path}>
                <a
                  className={
                    router.asPath === path
                      ? "nav-link active"
                      : "nav-link collapsed"
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
