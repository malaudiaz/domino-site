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
import { eventDate } from "../../../_functions";

export default function View() {
  const { token, lang } = useAppContext();

  const router = useRouter();
  const [tourney, setToutney] = useState([]);
  const tourneyId = router.query.id;

  const [disabled, setDisabled] = useState(false);
  const [lottery, setLottery] = useState("MANUAL");
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
    }
  };

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/one/${tourneyId}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setToutney(data.data);
        setLottery(data.data.setting.lottery_type);
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

  useEffect(() => {
    if (tourneyId) {
      fetchData();
    }
  }, [menu, tourneyId]);

  const handleButton = (btn) => {
    setMenu(btn);
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
                menu === 0
                  ? { background: "#e4e6eb", color: "blue", fontWeight: "500" }
                  : { background: "#e4e6eb" }
              }
              className="btn btn-sm"
              onClick={(e) => {
                e.preventDefault();
                handleButton(0);
              }}
            >
              <i className="bi bi-envelope-check"></i> Invitaciones Aceptadas
            </button>

            <button
              type="button"
              style={
                menu === 1
                  ? { background: "#e4e6eb", color: "blue", fontWeight: "500" }
                  : { background: "#e4e6eb" }
              }
              className="btn btn-sm"
              onClick={(e) => {
                e.preventDefault();
                handleButton(1);
              }}
            >
              <i className="bi bi-people"></i> Jugadores
            </button>

            <button 
              type="button" 
              style={
                menu === 2
                ? { background: "#e4e6eb", color: "blue", fontWeight: "500" }
                : { background: "#e4e6eb" }
              }
              className="btn btn-sm"
              onClick={(e)=>{
                e.preventDefault();
                handleButton(2);
              }}
            >
              <i className="bi bi-gear"></i> Configurar Torneo
            </button>

            <button
              type="button"
              disabled={tourney.status_name==="INITIADED"}
              style={
                menu === 3
                  ? { background: "#e4e6eb", color: "blue", fontWeight: "500" }
                  : { background: "#e4e6eb" }
              }
              className="btn btn-sm"
              onClick={(e) => {
                e.preventDefault();
                handleButton(3);
              }}
            >
              <i className="bi bi-card-checklist"></i> Sorteo
            </button>

            <button
              type="button"
              style={
                menu === 4
                  ? { background: "#e4e6eb", color: "blue", fontWeight: "500" }
                  : { background: "#e4e6eb" }
              }
              className="btn btn-sm"
              onClick={(e) => {
                e.preventDefault();
                handleButton(4);
              }}
            >
              <i className="bi bi-bounding-box"></i> Mesas
            </button>


            <button
              type="button"
              style={
                menu === 5
                  ? { background: "#e4e6eb", color: "blue", fontWeight: "500" }
                  : { background: "#e4e6eb" }
              }
              className="btn btn-sm"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <i className="bi bi-collection-play"></i> Inicial Ronda
            </button>



          </div>

          {menu === 0 && <Response tourneyId={tourneyId} menu={menu} status={tourney.status_name}/>}
          {menu === 1 && <Players tourneyId={tourneyId} title={"Jugadores Aceptados"} menu={"PLAYERS"} status={tourney.status_name} />}
          {menu === 2 && <Setting tourneyId={tourneyId} menu={menu} tourney={tourney} setLottery={setLottery} setMenu={setMenu}/>}
          {menu === 3 && <Lottery tourney={tourney} menu={menu} lottery={lottery} setMenu={setMenu}/>}
          {menu === 4 && <Tables tourneyId={tourneyId} menu={menu}/>}

          
        </div>
      </main>

      <Footer />
    </>
  );
}
