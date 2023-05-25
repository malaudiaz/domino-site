import { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import EventLayout from "../../../layouts/EventLayout";
import AppContext from "../../../AppContext";
import Head from "next/head";
import { getSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";
import { Card, CardBody } from "reactstrap";
import DropDownMenu from "../../../components/DropDownMenu/Menu";
import NewEvent from "../../../components/Events/Events";
import Image from "next/image";

export default function Own({ session }) {
  const value = useContext(AppContext);
  const router = useRouter();

  const [openEvent, setOpenEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const [record, setRecord] = useState({});
  const [refresh, setRefresh] = useState(false);

  const ctxMenu = [
    { text: "Editar", key: "mnuEdit", icon: "bi bi-pencil-square" },
    { text: "Eliminar", key: "mnuDel", icon: "bi bi-trash" },
  ];

  const handleAddEvents = () => {
    setRecord({});
    setOpenEvent(true);
  };

  const handleClick = (id) => {
    router.push(`/event/view/${id}`);
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "accept-Language": "es-ES,es;",
      Authorization: `Bearer ${session.token}`,
    },
  };

  const fetchData = async () => {
    const url = `${
      process.env.NEXT_PUBLIC_API_URL
    }event?page=${0}&per_page=${0}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setRefresh(false);
        setEvents(data.data);
      }
    } catch (errors) {
      console.log(errors);
      const { response } = errors;
      const { detail } = response.data;
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
    value.setLanguageSelected(session.locale);
    fetchData();
  }, [session.locale, value, refresh]);

  const t = value.state.languages.events;

  const mnuEdit = (index) => {
    setRecord(events[index]);
    setOpenEvent(true);
  };

  const eventDelete = async (index) => {
    const event = events[index];
    const url = `${process.env.NEXT_PUBLIC_API_URL}event/${event.id}`;

    await axios
      .delete(url, config)
      .then((res) => {
        setRefresh(true);

        Swal.fire({
          icon: "success",
          title: "Eliminar",
          text: "Evento eliminado con éxito",
          showConfirmButton: true,
        });
      })
      .catch((errors) => {
        Swal.fire({
          icon: "error",
          title: "Eliminar",
          text: "Ha ocurrido un error al eliminar el evento seleccionado",
          showConfirmButton: true,
        });
      });
  };

  const mnuDelete = (index) => {
    Swal.fire({
      title: "¿ Eliminar Evento ?",
      text: "Si continuas, el evento será eliminado",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        eventDelete(index);
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

  const eventDate = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const cadena = start.toLocaleString('default', { weekday: 'short' }).toUpperCase() + ", " + start.getDate() + " " + start.toLocaleString('default', { month: 'short' }).toUpperCase() + " - " + end.getDate() + " " + end.toLocaleString('default', { month: 'short' }).toUpperCase();

    return cadena;
  };

  return (
    <EventLayout session={session}>
      <Head>
        <link rel="shortcut icon" href="/domino.ico" />
        <title>Eventos que has organizado</title>
      </Head>

        <div
          className="card"
          style={{ border: "1px solid", borderColor: "#c7c7c7" }}
        >
          <div className="row pt-3 px-4">
            <h1
              style={{ fontSize: "24px", fontWeight: "600", color: "#012970" }}
            >
              Eventos que has organizado
            </h1>
          </div>
          <div className="d-flex gap-2 px-4 pb-4">

            <button className="btn btn-primary btn-sm" onClick={handleAddEvents}>
                <i className="bi bi-plus-lg"></i>{" "}
                Crear nuevo evento
            </button>    

            <button
              type="button"
              style={{ background: "#e4e6eb", color: "blue", fontWeight: "500" }}
              className="btn btn-sm"
            >
              Próximos
            </button>
            <button
              type="button"
              style={{ background: "#e4e6eb" }}
              className="btn btn-sm"
            >
              Anteriores
            </button>
          </div>

          <div className="row px-4">


              {events.length > 0 ? (
                <div className="container-events">
                  {events.map(
                    (
                      { id, name, summary, photo, startDate, endDate, city_name, campus },
                      idx
                    ) => (
                      <Card
                        className="folder__card"
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
                        <Image
                          alt="Events Image"
                          src={photo}
                          width={400}
                          height={400}
                          quality={50}
                          onClick={(e)=>{e.preventDefault(); handleClick(id)}}
                          priority
                          layout="intrinsic"
                        />
                        <CardBody>
                          <div className="col-12 pt-2">
                            <span><b>{eventDate(startDate, endDate)}</b></span>
                          </div>
                          <div className="col-12" style={{fontSize: "14px"}}>
                            <span><b>{summary}</b></span>
                          </div>
                          <div className="col-12">
                            <span><b>{campus+", "+city_name}</b></span>
                          </div>
                          <div className="col-12">
                            <span className="mb-2 text-muted">{"150 personas asistirán"}</span>
                          </div>
                        </CardBody>
                      </Card>
                    )
                  )}
                </div>

              ) : (
                <div className="wrapper">
                  <div style={{ textAlign: "center" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="56"
                      height="56"
                      fill="#0d6efd"
                      className="bi bi-calendar3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                      <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                    </svg>
                    <div className="pt-4 fs-5">
                      Los eventos organizados por tí aparecerán aquí.
                    </div>
                  </div>
                </div>
              )}

          </div>
        </div>

      <NewEvent
        session={session}
        openEvent={openEvent}
        setOpenEvent={setOpenEvent}
        record={record}
        setRefresh={setRefresh}
      />
    </EventLayout>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  return {
    props: {
      session,
    },
  };
};
