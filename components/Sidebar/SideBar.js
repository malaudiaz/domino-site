import { useRouter } from "next/router";
import Link from "next/link";
import { useAppContext } from "../../AppContext";

const Sidebar = () => {
  const {profile} = useAppContext();
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
          <Link href={"/dashboard"}>
            <a
              className={
                router.asPath === "/dashboard"
                  ? "nav-link active"
                  : "nav-link collapsed"
              }
            >
              <i className={"bi bi-columns-gap"}></i>
              <span>Panel</span>
            </a>
          </Link>
        </li>


        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-target="#MyProfile"
            data-bs-toggle="collapse"
          >
            <i className={"bi bi-person"}></i>
            <span>Pérfíl</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>

          <ul
              id="MyProfile"
              className="nav-content"
          >
            <li>
                <Link href={"/profile"}>
                    <a href="#">
                        <i className={"bi bi-person-vcard"}></i>
                        <span>Mí Pérfíl</span>
                    </a>
                </Link>
            </li>

            {profile.type === "USER" && 
              <li>
                  <Link href={"/profile/new"}>
                      <a>
                          <i className="bi bi-person-plus"></i>
                          <span>Crear Perfíl</span>
                      </a>
                  </Link>
              </li>
            }

          </ul>          
        </li>

        {profile.type !== "USER" &&
          <>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-target="#Events"
                data-bs-toggle="collapse"
              >
                <i className={"bi bi-calendar3"}></i>
                <span>Eventos</span>
                <i className="bi bi-chevron-down ms-auto"></i>
              </a>

              <ul
                  id="Events"
                  className="nav-content"
              >
                <li>
                  <Link href={"/event"}>
                      <a>
                        <i className="bi bi-calendar3-week"></i>
                        <span>Descubrir Eventos</span>
                      </a>
                  </Link>
                </li>

                {profile.type === "EVENTADMON" &&
                <li>
                  <Link href={"/event/own"}>
                    <a>
                      <i className={"bi bi-calendar2-heart"}></i>
                      <span>Mís Eventos</span>
                    </a>
                  </Link>
                </li>}


              </ul>          
            </li>
          </>
        }


        {(profile.type !== "EVENTADMON" && profile.type !== "USER") &&

          <li className="nav-item">
            <Link href={"/solicitude"}>
              <a
                className={
                  router.asPath === "/solicitude"
                    ? "nav-link active"
                    : "nav-link collapsed"
                }
              >
                <i className="bi bi-box-arrow-in-up-right" />              
                <span>Solicitudes</span>
              </a>
            </Link>
          </li>

        }

        {(profile.type !== "EVENTADMON" && profile.type !== "USER") &&

          <li className="nav-item">
            <Link href={"/invitations"}>
              <a
                className={
                  router.asPath === "/invitations"
                    ? "nav-link active"
                    : "nav-link collapsed"
                }
              >
                <i className="bi bi-envelope" />              
                <span>Invitaciones</span>
              </a>
            </Link>
          </li>

        }

      </ul>

    </aside>

  );
};
export default Sidebar;
