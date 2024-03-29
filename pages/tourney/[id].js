import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../../AppContext";
import Tournament from "../../components/Tourney/Tournament";
import Head from "next/head";
import { Card, CardBody, CardFooter, Label, Input } from "reactstrap";
import DropDownMenu from "../../components/DropDownMenu/Menu";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import { eventDate } from "../../_functions";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footers/Footer";
import Invitations from "../../components/Tourney/Invitations/Invitations";

export default function Tourneys() {
  const {token, lang} = useAppContext();
  const router = useRouter();

  const [event, setEvent] = useState({});
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState({});

  const [menu, setMenu] = useState(0);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [openInvitation, setOpenInvitation] = useState(false);

  const [tourneyId, setTourneyId] = useState("");

  const ctxMenu = [
    { text: "Eliminar", key: "mnuDel", icon: "bi bi-trash" },
    { text: "Configurar", key: "mnuSetting", icon: "bi bi-gear" },
  ];

  const eventId = router.query.id;

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
    } catch ({code, message, name, request}) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Cargando Torneos",
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
            title: "Cargando Torneos",
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
    if (eventId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, [reload, eventId]);

  const sendInvitations = (id) => {
    setTourneyId(id);
    setOpenInvitation(true);
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

  const mnuSetting = (index) => {
    handleClick(records[index].id);
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

  const addTorney = () => {
    setRecord({});
    setOpen(true);
  };

  const setClose = () => {
    setReload(true);
    setOpen(false);
  };

  const setCloseInvitation = () => {
    setOpenInvitation(false);
  };

  const saveImage = async (id, img) => {
    const body = new FormData();
    body.append("image", img);

    const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/image/${id}`

    try {
      const { data } = await axios.put(url, body, {
        headers: {
          "Accept-Language": lang,
          "Authorization": `Bearer ${token}`,
        },
      });
      if (data.success) {
        setReload(true);    
        Swal.fire({
          icon: "success",
          title: "Imagen de Torneo",
          text: data.detail,
          showConfirmButton: true
        });
      }
    } catch (errors) {
      console.log(errors);
      Swal.fire({
        icon: "error",
        title: "Imagen de Torneo",
        text: "Ha ocurrido un error al consultar la API....",
        showConfirmButton: true
      });
    }  
  }

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

          <div className="d-grid pt-3 px-4">
            <div className="container-events">
              {records.map(({ id, name, modality, summary, startDate, image, status_description }, idx) => (
                <Card
                  className="card-info" 
                  style={{ borderRadius: "10px", cursor: "default" }}
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
                  <CardBody style={{cursor: "pointer"}} onClick={(e)=>{e.preventDefault(); handleClick(id)}}>
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
                      <span>Estado: <b>{status_description}</b></span>                      
                    </div>
                    <div className="col-12 pt-2 text-center">
                      <span><b>{eventDate(startDate, "")}</b></span>                      
                    </div>
                  </CardBody>
                  <CardFooter>
                    <div className="row pt-2">

                      <div className="col-12 justify-content-center text-center">

                        <Label
                            href="#"
                            className="btn btn-primary btn-sm me-2"
                            title="Cambiar foto de publicidad"
                            style={{ color: "white" }}
                          >
                            <i className="bi bi-upload"></i>
                            <Input
                                type="file"
                                id="upfile"
                                name="upfile"
                                hidden
                                onChange={(event) => {
                                    if (event.target.files && event.target.files[0]) {
                                        const i = event.target.files[0];
                                        if (i.type.includes("image/jpeg")) {
                                            saveImage(id, i);
                                        } else {
                                            Swal.fire({
                                                icon: "error",
                                                title: "Cargando Imagen",
                                                text: "Ha ocurrido un error al cargar la imagen",
                                                showConfirmButton: true,
                                            });
                                        }
                                    }
                                }}
                            />
                        </Label>

                        <Label
                            href="#"
                            className="btn btn-danger btn-sm me-2"
                            title="Eliminar foto de Publicidad"
                            style={{ color: "white" }}
                            onClick={(e) => {
                                Swal.fire({
                                    title: "¿ Desea eliminar esta foto de publicidad ?",
                                    text: "! Esta opción no podrá ser revertida !",
                                    icon: "question",
                                    showCancelButton: true,
                                    confirmButtonText: "Sí",
                                    cancelButtonText: "No",
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    reverseButtons: true,
                                    allowOutsideClick: false,
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        document.getElementById("upfile").value = ""; 
                                        saveImage(id, "");
                                    }
                                });
                            }}
                          >
                            <i className="bi bi-trash"/>
                        </Label>

                        <Label
                            href="#"
                            className="btn btn-warning btn-sm"
                            title="Enviar Invitaciones"
                            style={{ color: "white" }}
                            onClick={(e) => {
                              e.preventDefault(); 
                              sendInvitations(id);
                            }}
                        >
                            <i className="bi bi-envelope"/>
                        </Label>

                      </div>                

                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <Tournament open={open} setClose={setClose} record={record} event={event} eventId={eventId}/>

        <Invitations open={openInvitation} setClose={setCloseInvitation} tourneyId={tourneyId}/>

      </main>

      <Footer/>

    </>
  );
}
