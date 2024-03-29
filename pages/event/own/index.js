import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Layout from "../../../layouts/Layout";
import {useAppContext} from "../../../AppContext";
import Head from "next/head";
import axios from "axios";
import Swal from "sweetalert2";
import { Card, CardBody } from "reactstrap";
import DropDownMenu from "../../../components/DropDownMenu/Menu";
import NewEvent from "../../../components/Events/Events";
import Image from "next/image";
import { eventDate } from "../../../_functions";
import Empty from "../../../components/Empty/Empty";

export default function Own() {
  const {profile, lang, token, i18n} = useAppContext();
  const router = useRouter();

  const [openEvent, setOpenEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const [record, setRecord] = useState({});
  const [refresh, setRefresh] = useState(false);

  const ctxMenu = [
    { text: "Editar", key: "mnuEdit", icon: "bi bi-pencil-square" },
    { text: "Eliminar", key: "mnuDel", icon: "bi bi-trash" },
    { text: "Configurar", key: "mnuSetting", icon: "bi bi-gear" },
  ];

  const handleAddEvents = () => {
    setRecord({});
    setOpenEvent(true);
  };

  const handleClick = (id) => {
    router.push(`/tourney/${id}`);
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
    const url = `${
      process.env.NEXT_PUBLIC_API_URL
    }event?profile_id=${profile.id}&page=${0}&per_page=${0}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setRefresh(false);
        setEvents(data.data);
      }
    } catch ({code, message, name, request}) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Error en la Red",
          text: "Error en su red, consulte a su proveedor de servicio",
          icon: "error",
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      } else {
        if (code === "ERR_BAD_REQUEST") {
          const {detail} = JSON.parse(request.response)
          Swal.fire({
            title: "Autentificar",
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
    if (Object.entries(profile).length > 0) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, profile]);

  const t = i18n.events;

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

  const mnuSetting = (index) => {
    handleClick(events[index].id);
  }

  const onMenuSelection = (key, index) => {
    switch (key) {
      case "mnuEdit":
        mnuEdit(index);
        break;
      case "mnuDel":
        mnuDelete(index);
        break;
      case "mnuSetting":
        mnuSetting(index);
        break;
      }
  };

  return (
    <Layout>
      <Head>
        <link rel="shortcut icon" href="/smartdomino.ico" />
        <title>Eventos que has organizado</title>
      </Head>

        <div className="card" style={{border: "1px solid", borderColor: "#c7c7c7"}}>
          <div className="row pt-3 px-4">
            <h1
              style={{ fontSize: "24px", fontWeight: "600", color: "#012970" }}
            >
              Eventos que has organizado
            </h1>
          </div>
          <div className="px-4 pb-4" style={{display: "flex", flexWrap: "wrap", gap:"10px"}}>

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


          {events.length > 0 ? (
            <div className="pt-4 px-4" style={{display: "grid"}}>
                <div className="container-events">
                  {events.map(
                    (
                      { id, name, summary, photo, startDate, endDate, city_name, campus, amount_people },
                      idx
                    ) => (
                      <Card
                        className="card-info" 
                        key={idx}>
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
                        <div style={{cursor: "pointer", width: "100%"}} onClick={(e)=>{e.preventDefault(); handleClick(id)}}>
                          <Image
                            alt={summary}
                            src={photo}
                            width={400}
                            height={300}
                            quality={50}
                            priority
                            layout="intrinsic"
                            style={{cursor: "pointer"}}
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
                            {amount_people > 0 &&
                              <div className="col-12 pt-2">
                                <span className="mb-2 text-muted">{amount_people === 1 ? amount_people + " persona asistira" : amount_people + " personas asistirán"}</span>
                              </div>
                            }
                          </CardBody>
                        </div>
                      </Card>
                    )
                  )}
                </div>
            </div>
          ) : (
            <div className="pt-4 px-4" style={{display: "grid", height: "600px"}}>
              <Empty message="Los eventos organizados por tí aparecerán aquí." path1="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" path2="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            </div>
          )}

        </div>

      <NewEvent
        openEvent={openEvent}
        setOpenEvent={setOpenEvent}
        record={record}
        setRefresh={setRefresh}
      />
    </Layout>
  );
};
