import {useAppContext} from "../../AppContext";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import Notification from "../Notifications/Notifications";
import { deleteCookie } from 'cookies-next';


const Header = () => {
  const router = useRouter();
  const {profile, i18n} = useAppContext();

  const t = i18n.header;
  const avatar = profile.photo;

  const logOut = (e) => {
    e.preventDefault();

    Swal.fire({
      title: t.logOutTitle,
      text: t.logOutText,
      icon: "question",
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t.confirmButtonText,
      cancelButtonText: t.cancelButtonText,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCookie('SmartDomino-Token');
        localStorage.removeItem("profile");
        router.push("/");
      }
    });
  };

  const toggle = () => {
    const select = (el, all = false) => {
      el = el.trim();
      if (all) {
        return [...document.querySelectorAll(el)];
      } else {
        return document.querySelector(el);
      }
    };
    select("body").classList.toggle("toggle-sidebar");
  };

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <Link href={"/"}>
          <Image alt="SmartDomino" src="/Logo-H.png" width={250} height={40} style={{cursor: "pointer"}} />
        </Link>
        <i className="bi bi-list toggle-sidebar-btn" onClick={toggle} />
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <Notification/>

          <li className="nav-item dropdown pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <Image
                src={profile.photo ? profile.photo : "/profile/user-vector.jpg"}
                alt="Perfil"
                width={50}
                height={50}
                className="rounded-circle"
              />
              <span className="d-none d-md-block dropdown-toggle ps-2">
                {profile.firtsName}
              </span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>{profile.name}</h6>
                {profile.type === "USER" && <span>Usuario</span>}
                {profile.type === "SINGLE_PLAYER" && <span>Jugador individual</span>}
                {profile.type === "PAIR_PLAYER" && <span>Jugador en pareja</span>}
                {profile.type === "TEAM_PLAYER" && <span>Jugador de equipo</span>}
                {profile.type === "REFEREE" && <span>Arbitro</span>}
                {profile.type === "EVENTADMON" && <span>Administrador de Eventos</span>}
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <Link href="/profile">
                  <a className="dropdown-item d-flex align-items-center">
                    <i className="bi bi-person-vcard"></i>
                    <span>Mi Perfil</span>
                  </a>
                </Link>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li onClick={(e) => logOut(e)}>
                <a href="#" className="dropdown-item d-flex align-items-center">
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Desconectarse</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
