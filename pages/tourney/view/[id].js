import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import { useAppContext } from "../../../AppContext";
import Header from "../../../components/Header/Header";
import { eventDate } from "../../../_functions";
import Footer from "../../../components/Footers/Footer";

export default function View() {
  const {token, lang} = useAppContext();

  const router = useRouter();
  const [tourney, setToutney] = useState([]);

  const [invitations, setInvitations] = useState([]);
  const [players , setPlayers] = useState([]);
  const [tables , setTables] = useState([]);

  const [menu, setMenu] = useState(0);

  const monthTourney = (startDate) => {
    const start = new Date(startDate + " 00:00");
    return start.toLocaleString("default", { month: "short" }).toUpperCase();
  };

  const dayTourney = (startDate) => {
    const start = new Date(startDate + " 00:00");
    return start.getDate().toString();
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/one/${router.query.id}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setToutney(data.data);
      }
    } catch (errors) {
      console.log(errors);
      const { response } = errors;
      const { detail } = response.data;
      Swal.fire({
        title: "Cargando Torneo",
        text: detail,
        icon: "error",
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const fetchInvitations = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}invitation/tourney/?tourney_id=${router.query.id}&status_name=ACCEPTED`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setInvitations(data.data);
      }
    } catch (errors) {
      console.log(errors);
      const { response } = errors;
      const { detail } = response.data;
      Swal.fire({
        title: "Cargando Invitaciones",
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
    if (tourney.length === 0) {
      fetchData();
    }
    if (menu===0) {
      fetchInvitations();
    }
  }, [menu]);

  const handleButton = (btn) => {
    setMenu(btn);
  }

  return (
    <>

      <Header />

      <aside id="sidebar" className="sidebar">
        <div className="row">
          <h1 style={{ fontSize: "20px", fontWeight: "600", color: "#012970" }}>
            Torneo
          </h1>
        </div>
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Card
              style={{
                borderRadius: "10px",
              }}
            >
              <div className="d-flex justify-content-between p-2">
                <div className="d-flex flex-row align-items-center">
                  <div className="d-flex flex-column ms-2">
                    <span>
                      {tourney.name}
                    </span>
                  </div>
                </div>
              </div>
              <Image
                alt={""}
                src={"/Logo-V.png"}
                width={150}
                height={150}
                quality={80}
                priority
                layout="intrinsic"
              />
              <CardFooter style={{ textAlign: "center" }}>
                <span className="mb-2 text-muted">
                  <b>{eventDate(tourney.startDate, "")}</b>
                </span>
              </CardFooter>
            </Card>

          </li>
          <li className="nav-item">
              <a
                className={
                  router.asPath === "/"
                    ? "nav-link active"
                    : "nav-link collapsed"
                }
                onClick={() => router.back()}
                style={{cursor: "pointer"}}
              >
                <i className={"bi bi-arrow-left"}></i>
                <span>Salir</span>
              </a>
          </li>
        
        </ul>
      </aside>

      <main id="main" className="main">
        <Head>
          <link rel="shortcut icon" href="/smartdomino.ico" />
          <title>Torneos</title>
        </Head>

        <div
          className="card"
          style={{ border: "1px solid", borderColor: "#c7c7c7" }}
        >
          <div className="pt-2 px-4" style={{ display: "flex" }}>
            <Card
              className="my-2"
              inverse
              style={{
                width: "80px",
                height: "80px",
                border: "1px solid",
                borderColor: "#c7c7c7",
              }}
            >
              <CardHeader
                style={{ background: "red", height: "20px", textAlign: "center" }}
              >
                <h6
                  style={{ fontSize: "14px", fontWeight: "600", color: "white" }}
                >
                  {monthTourney(tourney.startDate)}
                </h6>
              </CardHeader>
              <CardBody className="p-2" style={{ textAlign: "center" }}>
                <h1
                  style={{
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "#012970",
                  }}
                >
                  {dayTourney(tourney.startDate)}
                </h1>
              </CardBody>
            </Card>

            <div>
              <div className="row pt-2 px-4">
                <h1
                  style={{
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "#012970",
                  }}
                >
                  {tourney.event_name}
                </h1>
              </div>

              <div className="row px-4" style={{ fontSize: "14px" }}>
                <span
                  className="mb-2 text-muted"
                  style={{ fontSize: "18px", fontWeight: "600" }}
                >
                  {tourney.name}, {tourney.modality}
                </span>
              </div>

              <div className="row px-4" style={{ fontSize: "14px" }}>
                <span className="mb-2 text-muted">{tourney.summary}</span>
              </div>
            </div>
          </div>

          <div className="row px-4">
            <hr></hr>
          </div>

          <div
            className="px-4 pb-4"
            style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
          >
            <button
              type="button"
              style={menu === 0 ? { background: "#e4e6eb", color: "blue", fontWeight: "500" } : { background: "#e4e6eb" }}
              className="btn btn-sm"
              onClick={(e) => {e.preventDefault(); handleButton(0)}}
            >
              <i className="bi bi-envelope-check"></i>{" "}
              Invitaciones Aceptadas
            </button>
            <button
              type="button"
              style={menu === 1 ? { background: "#e4e6eb", color: "blue", fontWeight: "500" } : { background: "#e4e6eb" }}
              className="btn btn-sm"
              onClick={(e) => {e.preventDefault(); handleButton(1)}}
            >
              <i className="bi bi-people"></i>{" "}
              Jugadores
            </button>

            <button
              type="button"
              style={menu === 2 ? { background: "#e4e6eb", color: "blue", fontWeight: "500" } : { background: "#e4e6eb" }}
              className="btn btn-sm"
              onClick={(e) => {e.preventDefault(); handleButton(2)}}
            >
              <i className="bi bi-bounding-box"></i>{" "}
              Mesas
            </button>

          </div>

          <div className="pt-3 px-4" style={{ display: "grid" }}>
              {menu===0 && invitations.length > 0 ? (
                <div className="container-events">
                  {invitations.map( (item, idx) => (
                    // Esto me muestra la invitación pero en realidad yo quiero los jugadores que aceptaron esta invitación..
                    
                    <Card style={{cursor: "pointer", borderRadius: "10px"}} key={idx}>
                      <Image
                        alt="Events Image"
                        src={item.photo}
                        width={400}
                        height={400}
                        quality={50}
                        priority
                        layout="intrinsic"
                      />
                    <CardBody>
                      <div className="col-12 pt-2 pb-2" style={{textAlign: "center"}}>
                          <span className="mb-2" style={{color: "red"}}><b>INVITACION</b></span>
                      </div>
                      <div className="col-12">
                          <span className="mb-2 text-muted"><b>{eventDate(item.startDate, item.endDate)}</b></span>
                      </div>
                      <div className="col-12" style={{fontSize: "14px"}}>
                          <span><b>{item.event_name}, {item.tourney_name}</b></span>
                      </div>
                      <div className="col-12" style={{fontSize: "14px"}}>
                          <span>Modalidad: <b>{item.modality}</b></span>
                      </div>
                      <div className="col-12" style={{fontSize: "14px"}}>
                        <span className="mb-2 text-muted"><i><b>{item.campus}, {item.city_name}. {item.country}</b></i></span>
                      </div>
                    </CardBody>

                    </Card>
                  ))}
                </div>
              ) : menu===1 && players.length > 0 ? (
                <div className="container-events">
                </div>
              ) : menu===2 && tables.length > 0 ? (
                <div className="container-events">
                </div>
              ) : (
                <div className="wrapper">
                  <div style={{ textAlign: "center" }}>
                    <svg
                      width="56"
                      height="56"
                      fill="#0d6efd"
                      className={menu===0 ? "bi bi-envelope-check" : menu===1 ? "bi bi-people" : "bi bi-ui-checks-grid"}
                      viewBox="0 0 16 16"
                    >
                      <path d={menu===0 ? "M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" : menu===1 ? "M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" : "M2 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM0 2a2 2 0 0 1 3.937-.5h8.126A2 2 0 1 1 14.5 3.937v8.126a2 2 0 1 1-2.437 2.437H3.937A2 2 0 1 1 1.5 12.063V3.937A2 2 0 0 1 0 2zm2.5 1.937v8.126c.703.18 1.256.734 1.437 1.437h8.126a2.004 2.004 0 0 1 1.437-1.437V3.937A2.004 2.004 0 0 1 12.063 2.5H3.937A2.004 2.004 0 0 1 2.5 3.937zM14 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM2 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"}/>
                      <path d={menu===0 ? "M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" : menu===1 ? "" : ""}/>
                    </svg>

                    <div className="pt-4 fs-5">
                      {menu===0 && "Los invitaciones aceptadas para el torneo aparecerán aquí."}
                      {menu===1 && "Los Jugadores que participaran en el torneo aparecerán aquí."}
                      {menu===2 && "Las mesas del torneo aparecerán aquí."}
                    </div>
                  </div>
                </div>
              )}
          </div>

        </div>
      </main>

      <Footer/>

    </>
  );
}
