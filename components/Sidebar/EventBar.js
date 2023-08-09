import { useRouter } from "next/router";
import Link from "next/link";

const EventSideBar = () => {
  const router = useRouter();

  return (
    <aside id="sidebar" className="sidebar">
      <div className="row">
        <h1 style={{ fontSize: "20px", fontWeight: "600", color: "#012970" }}>
          Eventos
        </h1>
      </div>

      <ul className="sidebar-nav" id="sidebar-nav">
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
              <span>Inicio</span>
            </a>
          </Link>
        </li>


        
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#MyEvents"
            data-bs-toggle="collapse"
          >
            <i className={"bi bi-person"}></i>
            <span>Tus Eventos</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>

          <ul
              id="MyEvents"
              className="nav-content"
              data-bs-parent="#sidebar-nav"
          >
            <li>
                <Link href={"/event/attend"}>
                    <a href="#">
                        <i className={"bi bi-check2-circle"}></i>
                        <span>Asistiré</span>
                    </a>
                </Link>
            </li>

            <li>
                <Link href={"/event/invitations"}>
                    <a href="#">
                        <i className="bi bi-envelope"></i>
                        <span>Invitaciones</span>
                    </a>
                </Link>
            </li>

            <li>
                <Link href={"/event/own"}>
                    <a href="#">
                        <i className="bi bi-house-door"></i>
                        <span>Organizados por mí</span>
                    </a>
                </Link>
            </li>

          </ul>          

        </li>

        <li className="nav-item">
          <Link href={"/"}>
            <a
              className={
                router.asPath === "/"
                  ? "nav-link active"
                  : "nav-link collapsed"
              }
            >
              <i className={"bi bi-arrow-left"}></i>
              <span>Salir</span>
            </a>
          </Link>
        </li>

      </ul>

    </aside>
  );
};
export default EventSideBar;
