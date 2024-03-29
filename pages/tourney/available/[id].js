import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../../../AppContext";
import Head from "next/head";
import { Card, CardBody, CardFooter } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import { eventDate } from "../../../_functions";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footers/Footer";

export default function Available() {
  const {token, lang} = useAppContext();
  const router = useRouter();

  const [event, setEvent] = useState({});
  const [records, setRecords] = useState([]);
  const [reload, setReload] = useState(false);


  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}event/one_event/${router.query.id}?only_iniciaded=true`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setEvent(data.data);
        setRecords(data.data.tourney);
        setReload(false);        
      }
    } catch (errors) {
      console.log(errors);
      const { response } = errors;
      const { detail } = response.data;
      Swal.fire({
        title: "Cargando Torneos",
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
    if (router.query.id) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, [reload, router.query.id]);


  const handleClick = (id) => {
    router.push(`/tourney/detail/${id}`);
  };


  return (
    <>
      <Header />

      <aside id="sidebar" className="sidebar">
        <div className="row">
          <h1 style={{ fontSize: "20px", fontWeight: "600", color: "#012970" }}>
            Evento
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
                      {event.name}
                    </span>
                  </div>
                </div>
              </div>
              <Image
                alt={""}
                src={event.photo}
                width={150}
                height={150}
                quality={80}
                priority
                layout="intrinsic"
              />
              <CardFooter style={{ textAlign: "center" }}>
                <span className="mb-2 text-muted">
                    <b>{eventDate(event.startDate, event.endDate)}</b>
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
          <div className="row pt-3 px-4">
            <span style={{ color: "red" }}>
              <b>{eventDate(event.startDate, event.endDate)}</b>
            </span>
          </div>

          <div className="row pt-2 px-4">
            <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#012970" }}>
              {event.name}
            </h1>
          </div>

          <div className="row px-4" style={{ fontSize: "14px" }}>
            <span className="mb-2 text-muted">
              {event.campus}, {event.city_name}
            </span>
          </div>

          <div className="row px-4">
            <hr></hr>
          </div>

          <div className="pt-3 px-4" style={{ display: "grid" }}>
            <div className="container-events">
              {records.map(({ id, name, modality, summary, startDate, image, status_name }, idx) => (
                <Card
                  style={{ cursor: "pointer", borderRadius: "10px" }}
                  key={idx}
                >
                  <div className="d-flex justify-content-between p-2">
                    <div className="d-flex flex-row align-items-center">
                      <div className="d-flex flex-column ms-2">
                        <span className="fw-bold">{name}</span>
                      </div>
                    </div>
                    <div className="d-flex flex-row ellipsis align-items-center">
                    </div>
                  </div>
                  <CardBody onClick={(e) => {e.preventDefault(); handleClick(id);}}>
                    <Image
                      alt="Tourney Image"
                      src={image}
                      width={350}
                      height={150}
                      quality={50}
                      priority
                      layout="intrinsic"
                    />
                    <div className="col-12 pt-2" style={{textAlign: "center"}}>
                      <h6 className="mb-2 teviewxt-muted">{summary}</h6>
                    </div>
                    <div className="d-flex justify-content-between col-12 pt-2">
                      <span>Modalidad: <b>{modality}</b></span>
                      <span>Estado: <b>{status_name}</b></span>                      
                    </div>
                    <div className="col-12 pt-2 text-center">
                      <span><b>{eventDate(startDate, "")}</b></span>                      
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>

      </main>

      <Footer/>

    </>
  );
}
