import { useContext, useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import AppContext from "../../AppContext";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import Notification from "../Notifications/Notifications";

const Header = ({ session }) => {
  const value = useContext(AppContext);
  const t = value.state.languages.header;
  const avatar = value.state.avatar;

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
        signOut();
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
          <Notification session={session}/>

          <li className="nav-item dropdown pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <Image
                src={avatar ? avatar : "/profile/user-vector.jpg"}
                alt="Perfil"
                width={50}
                height={50}
                className="rounded-circle"
              />
              <span className="d-none d-md-block dropdown-toggle ps-2">
                {session.firstName}
              </span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>{session.firstName}</h6>
                <span>{session.lastName}</span>
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
                <Link href="/profile">
                  <a className="dropdown-item d-flex align-items-center">
                    <i className="bi bi-person-plus"></i>
                    <span>Crear Perfíl</span>
                  </a>
                </Link>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <Link href="/event">
                  <a className="dropdown-item d-flex align-items-center">
                    <i className="bi bi-calendar3"></i>
                    <span>Mis Eventos</span>
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
