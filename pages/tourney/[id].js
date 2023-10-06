import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../../AppContext";
import Tournament from "../../components/Tourney/Tournament";
import Head from "next/head";
import { Card, CardBody, CardFooter } from "reactstrap";
import DropDownMenu from "../../components/DropDownMenu/Menu";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import { eventDate } from "../../_functions";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footers/Footer";
import Link from "next/link";

export default function Tourneys() {
  const {token, lang} = useAppContext();
  const router = useRouter();

  const [event, setEvent] = useState({});
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState({});

  const [menu, setMenu] = useState(0);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);

  const ctxMenu = [
    { text: "Editar", key: "mnuEdit", icon: "bi bi-pencil-square" },
    { text: "Eliminar", key: "mnuDel", icon: "bi bi-trash" },
  ];

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}event/one_event/${router.query.id}`;

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
  }, [reload, router.query.id]);

  const sendInvitations = async (torneyId) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}invitation?tourney_id=${torneyId}`;

    try {
      const { data } = await axios.post(url, {}, config);
      if (data.success) {
        Swal.fire({
          title: "Enviar Invitaciones",
          text: data.detail,
          icon: "success",
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (errors) {
      console.log(errors);
      const { response } = errors;
      const { detail } = response.data;
      Swal.fire({
        title: "Enviar Invitaciones",
        text: detail,
        icon: "error",
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const handleClick = (id) => {
    router.push(`/tourney/view/${id}`);
  };

  const mnuEdit = (index) => {
    setRecord(records[index]);
    setOpen(true);
  };

  const Delete = async (index) => {
    const tourney = records[index];
    const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/${tourney.id}`;

    await axios
      .delete(url, config)
      .then((res) => {
        setReload(true);
        Swal.fire({
          icon: "success",
          title: "Eliminar",
          text: "Torneo eliminado con éxito",
          showConfirmButton: true,
        });
      })
      .catch((errors) => {
        console.log(errors);

        Swal.fire({
          icon: "error",
          title: "Eliminar",
          text: "Ha ocurrido un error al eliminar el torneo seleccionado",
          showConfirmButton: true,
        });
      });
  };

  const mnuDelete = (index) => {
    Swal.fire({
      title: "¿ Eliminar Torneo ?",
      text: "Si continuas, el torneo será eliminado",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        Delete(index);
      }
    });
  };

  const onMenuSelection = (key, index) => {
    switch (key) {
      case "mnuEdit":
        mnuEdit(index);
        break;
      case "mnuDel":
        mnuDelete(index);
        break;
    }
  };

  const addTorney = () => {
    setRecord({});
    setOpen(true);
  };

  const setClose = () => {
    setReload(true);
    setOpen(false);
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

          <div
            className="px-4 pb-2"
            style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
          >
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={(e) => {
                e.preventDefault();
                addTorney();
              }}
            >
              <i className="bi bi-plus-circle"></i> Crear Torneo
            </button>
          </div>

          <div className="pt-3 px-4" style={{ display: "grid" }}>
            <div className="container-events">
              {records.map(({ id, name, modality, summary, startDate }, idx) => (
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
                      <DropDownMenu
                        idx={idx}
                        items={ctxMenu}
                        onMenuSelection={onMenuSelection}
                      />
                    </div>
                  </div>
                  <CardBody onClick={(e) => {e.preventDefault();handleClick(id);}}>
                    <Image
                      alt="Tourney Image"
                      src={"/Logo-V.png"}
                      width={350}
                      height={150}
                      quality={50}
                      priority
                      layout="intrinsic"
                    />
                    <div className="col-12 pt-4" style={{textAlign: "center"}}>
                      <h6 className="mb-2 teviewxt-muted">{summary}</h6>
                    </div>
                    <div className="col-12 pt-2">
                      <span>Modalidad: </span>
                      <b>{modality}</b>
                    </div>
                    <div className="col-12 pt-2">
                      <span>Fecha: </span>
                      <b>{eventDate(startDate, "")}</b>
                    </div>

                  </CardBody>
                  <CardFooter style={{ textAlign: "center" }}>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        sendInvitations(id);
                      }}
                    >
                      <i className="bi bi-envelope"></i> Enviar Invitación
                    </button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <Tournament open={open} setClose={setClose} record={record} event={event} eventId={router.query.id}/>

      </main>

      <Footer/>

    </>
  );
}
