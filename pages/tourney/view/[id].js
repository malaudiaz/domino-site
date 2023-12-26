import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import { useAppContext } from "../../../AppContext";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footers/Footer";
import Response from "../../../components/Tourney/Response";
import Players from "../../../components/Tourney/Players";
import Tables from "../../../components/Tourney/Tables";
import Setting from "../../../components/Tourney/Setting";
import Lottery from "../../../components/Tourney/Lottery";
import Rounds from "../../../components/Tourney/Rounds";

import { eventDate } from "../../../_functions";

export default function View() {
  const { token, lang } = useAppContext();

  const router = useRouter();
  const [tourney, setToutney] = useState([]);
  const tourneyId = router.query.id;
  const [menu, setMenu] = useState("INVITATION");
  const [refresh, setRefresh] = useState(false);

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
    }
  };

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/one/${tourneyId}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setToutney(data.data);
        setRefresh(false);
      }
    } catch ({ code, message, name, request }) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Cargando Torneo",
          text: "Error en su red, consulte a su proveedor de servicio",
          icon: "error",
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      } else {
        if (code === "ERR_BAD_REQUEST") {
          const { detail } = JSON.parse(request.response);
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
      }
    }
  };

  useEffect(() => {
    if (tourneyId) {
      fetchData();
    }
  }, [tourneyId, refresh]);

  const handleButton = (btn) => {
    if (btn !== "PLAY") {
      setMenu(btn);
    } else {
      setMenu(btn);

    }
  };

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
                    <strong>{tourney.name}</strong>
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
                router.asPath === "/" ? "nav-link active" : "nav-link collapsed"
              }
              onClick={() => router.back()}
              style={{ cursor: "pointer" }}
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
              className="calendar-card my-2"
              inverse
            >
              <CardHeader
                style={{
                  background: "red",
                  height: "20px",
                  textAlign: "center"
                }}
              >
                <h6 className="calendar-month"
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
              style={
                menu === "INVITATION"
                  ? { background: "#e4e6eb", color: "blue", fontWeight: "500" }
                  : { background: "#e4e6eb" }
              }
              className="btn btn-sm"
              onClick={(e) => {
                e.preventDefault();
                handleButton("INVITATION");
              }}
            >
              <i className="bi bi-envelope-check"></i> Jugadores Interesados
            </button>

            <button
              type="button"
              style={
                menu === "PLAYERS"
                  ? { background: "#e4e6eb", color: "blue", fontWeight: "500" }
                  : { background: "#e4e6eb" }
              }
              className="btn btn-sm"
              onClick={(e) => {
                e.preventDefault();
                handleButton("PLAYERS");
              }}
            >
              <i className="bi bi-people"></i> Jugadores Aceptados
            </button>

            <button 
              type="button" 
              style={
                menu === "SETTING"
                ? { background: "#e4e6eb", color: "blue", fontWeight: "500" }
                : { background: "#e4e6eb" }
              }
              className="btn btn-sm"
              onClick={(e)=>{
                e.preventDefault();
                handleButton("SETTING");
              }}
              disabled={tourney.amount_player===0}
            >
              <i className="bi bi-gear"></i> Configurar Torneo
            </button>

            <button
              type="button"
              disabled={tourney.status_name==="CREATED"}
              style={
                menu === "LOTTERY"
                  ? { background: "#e4e6eb", color: "blue", fontWeight: "500" }
                  : { background: "#e4e6eb" }
              }
              className="btn btn-sm"
              onClick={(e) => {
                e.preventDefault();
                handleButton("LOTTERY");
              }}
            >
              <i className="bi bi-card-checklist"></i> Sorteo
            </button>

            <button
              type="button"
              disabled={tourney.status_name==="CREATED"}
              style={
                menu === "TABLES"
                  ? { background: "#e4e6eb", color: "blue", fontWeight: "500" }
                  : { background: "#e4e6eb" }
              }
              className="btn btn-sm"
              onClick={(e) => {
                e.preventDefault();
                handleButton("TABLES");
              }}
            >
              <i className="bi bi-bounding-box"></i> Mesas
            </button>


            <button
              type="button"
              disabled={tourney.status_name==="CREATED"}
              style={
                menu === "PLAY"
                  ? { background: "#e4e6eb", color: "blue", fontWeight: "500" }
                  : { background: "#e4e6eb" }
              }
              className="btn btn-sm"
              onClick={(e) => {
                e.preventDefault();
                handleButton("PLAY");
              }}
            >
              <i className="bi bi-collection-play"></i> Iniciar Ronda
            </button>



          </div>

          {menu === "INVITATION" && <Response tourney={tourney}/>}
          {menu === "PLAYERS" && <Players tourneyId={tourneyId} title={"Jugadores Aceptados"} status={tourney.status_name} />}
          {menu === "SETTING" && <Setting tourney={tourney} setMenu={setMenu} setRefresh={setRefresh} />}
          {menu === "LOTTERY" && <Lottery tourney={tourney} setRefresh={setRefresh} />}
          {menu === "TABLES" && <Tables tourneyId={tourneyId} />}
          {menu === "PLAY" && <Rounds tourneyId={tourneyId} title={"Rondas"} showPlay={true} newPage={true}/>}
          
        </div>
      </main>

      <Footer />
    </>
  );
}
