import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../../AppContext";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { Card, CardBody, CardFooter } from "reactstrap";
import { eventDate } from "../../pages/_functions";

const TourneySideBar = () => {
  const {profile, lang, token} = useAppContext();
  const router = useRouter();
  const [events, setEvents] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    const url = `${
      process.env.NEXT_PUBLIC_API_URL
    }event?profile_id=${profile.id}&page=${0}&per_page=${0}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setEvents(data.data);
      }
    } catch (errors) {
      console.log(errors);
      const { response } = errors;
      Swal.fire({
        title: "Cargando Eventos",
        text: detail,
        icon: "error",
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <aside id="sidebar" className="sidebar">
      <div className="row">
        <h1 style={{ fontSize: "20px", fontWeight: "600", color: "#012970" }}>
          Torneos
        </h1>
      </div>

      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#MyEvents"
            data-bs-toggle="collapse"
          >
            <i className={"bi bi-person"}></i>
            <span>Mis Eventos</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>

          <ul
            id="MyEvents"
            className="nav-content"
            data-bs-parent="#sidebar-nav"
          >
            {events.map(({ name, id, photo, startDate, endDate }, idx) => (
              <li className="nav-item" key={idx}>
                <Link href={`/tourney/${id}`}>
                  <Card
                    style={{
                      cursor: "pointer",
                      borderRadius: "10px",
                    }}
                    key={idx}
                  >
                    <div className="d-flex justify-content-between p-2">
                      <div className="d-flex flex-row align-items-center">
                        <div className="d-flex flex-column ms-2">
                          <span
                            className={
                              router.asPath === `/tourney/${id}`
                                ? "text-primary fw-bold"
                                : "fw-bold"
                            }
                          >
                            {name}
                          </span>
                        </div>
                      </div>
                    </div>
                    <CardBody
                      style={{
                        background: `url(${photo})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                        minHeight: "100px",
                      }}
                    ></CardBody>
                    <CardFooter style={{ textAlign: "center" }}>
                      <span className="mb-2 text-muted">
                        <b className={
                          router.asPath === `/tourney/${id}`
                            ? "text-primary"
                            : ""
                        }>
                          {eventDate(startDate, endDate)}</b>
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </li>

        <li className="nav-item">
          <Link href={"/"}>
            <a
              className={
                router.asPath === "/" ? "nav-link active" : "nav-link collapsed"
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
export default TourneySideBar;
