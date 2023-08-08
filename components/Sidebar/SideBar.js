import { useRouter } from "next/router";
import Link from "next/link";

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside id="sidebar" className="sidebar">

      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link href={"/"}>
            <a
              className={
                router.asPath === "/"
                  ? "nav-link active"
                  : "nav-link collapsed"
              }
            >
              <i className={"bi bi-house-door"}></i>
              <span>Inicio</span>
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#MyProfile"
            data-bs-toggle="collapse"
          >
            <i className={"bi bi-person"}></i>
            <span>Perfíl</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>

          <ul
              id="MyProfile"
              className="nav-content"
              data-bs-parent="#sidebar-nav"
          >
            <li>
                <Link href={"/profile"}>
                    <a href="#">
                        <i className={"bi bi-person-vcard"}></i>
                        <span>Mí Perfíl</span>
                    </a>
                </Link>
            </li>

            <li>
                <Link href={"/profile/new"}>
                    <a href="#">
                        <i className="bi bi-person-plus"></i>
                        <span>Crear Perfíl</span>
                    </a>
                </Link>
            </li>

          </ul>          

        </li>
        <li className="nav-item">
          <Link href={"/event"}>
            <a
              className={
                router.asPath === "/event"
                  ? "nav-link active"
                  : "nav-link collapsed"
              }
            >
              <i className={"bi bi-calendar3"}></i>
              <span>Eventos</span>
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href={"/tourney"}>
            <a
              className={
                router.asPath === "/tourney"
                  ? "nav-link active"
                  : "nav-link collapsed"
              }
            >
              <i className={"bi bi-trophy"}></i>
              <span>Torneos</span>
            </a>
          </Link>
        </li>

        <li className="nav-item">
          <Link href={"/solicitude"}>
            <a
              className={
                router.asPath === "/solicitude"
                  ? "nav-link active"
                  : "nav-link collapsed"
              }
            >
              <i className="bi bi-link-45deg" />              
              <span>Solicitudes</span>
            </a>
          </Link>
        </li>

      </ul>

    </aside>

  );
};
export default Sidebar;
