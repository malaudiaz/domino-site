import React from "react";
import { useEffect, useState } from "react";
import { useAppContext } from "../../AppContext";
import Layout from "../../layouts/Layout";
import Head from "next/head";
import { Card, CardBody, CardFooter } from "reactstrap";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { eventDate } from "../../_functions";
import Empty from "../../components/Empty/Empty";

export default function Invitations() {
  const {profile, lang, token} = useAppContext();

  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("SEND")
  const [refresh, setRefresh] = useState(false);

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
    }invitation?profile_id=${profile.id}&status_name=${status}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setEvents(data.data);
      } else {
        Swal.fire({
          title: "Cargando Invitaciones",
          text: detail,
          icon: "info",
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
    if (Object.entries(profile).length > 0) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, refresh]);

  const handlerInvitation = async (id, status) => {
    const url = `${
      process.env.NEXT_PUBLIC_API_URL
    }invitation/${id}`;

    try {
      const { data } = await axios.put(url, {"accept": status==="ACCEPTED"}, config);
      if (data.success) {
        setRefresh(!refresh);
        Swal.fire({
          title: "Invitaciones",
          text: data.detail,
          icon: "success",
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          title: "Invitaciones",
          text: data.detail,
          icon: "info",
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
        title: "Invitaciones",
        text: detail,
        icon: "error",
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <Layout>
      <Head>
        <link rel="shortcut icon" href="/smartdomino.ico" />
        <title>Invitaciones recibidas</title>
      </Head>

      <div className="card" style={{border: "1px solid", borderColor: "#c7c7c7"}}>
        <div className="row pt-3 px-4">
          <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#012970" }}>
            Invitaciones Recibidas
          </h1>
        </div>

        <div className="px-4" style={{display: "flex", flexWrap: "wrap", gap:"10px"}}>
            <button 
              type="button" 
              style={status==="SEND" ? { background: "#e4e6eb", color: "blue", fontWeight: "600" } : {background: "#e4e6eb", fontWeight: "500"}}
              onClick={(e)=>{e.preventDefault(); setStatus("SEND")}}
              className="btn btn-sm"> 
                Pendientes
            </button> 
            <button 
              type="button" 
              style={status==="ACCEPTED" ? { background: "#e4e6eb", color: "blue", fontWeight: "600" } : {background: "#e4e6eb", fontWeight: "500"}}
              onClick={(e)=>{e.preventDefault(); setStatus("ACCEPTED")}}
              className="btn btn-sm"> 
                Aceptadas
            </button> 
            <button 
              type="button" 
              style={status==="REJECTED" ? { background: "#e4e6eb", color: "blue", fontWeight: "600" } : {background: "#e4e6eb", fontWeight: "500"}}
              onClick={(e)=>{e.preventDefault(); setStatus("REJECTED")}}
              className="btn btn-sm"> 
                Rechazadas
            </button> 
        </div>


        <div className="pt-4 px-4" style={{display: "grid"}}>

          {events.length > 0 ? (
            <div className="container-events">

              {events.map(
                ({ id, event_name, photo, startDate, endDate, tourney_name, modality, campus, city_name, country, rolevent_name }, idx) => (
                  <Card style={{cursor: "pointer", borderRadius: "10px"}} key={idx}>
                    <Image
                      alt="Events Image"
                      src={photo}
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
                          <span className="mb-2 text-muted"><b>{eventDate(startDate, endDate)}</b></span>
                      </div>
                      <div className="col-12" style={{fontSize: "14px"}}>
                          <span><b>{event_name}, {tourney_name}</b></span>
                      </div>
                      <div className="col-12" style={{fontSize: "14px"}}>
                          <span>Modalidad: <b>{modality}</b></span>
                      </div>
                      <div className="col-12" style={{fontSize: "14px"}}>
                        <span className="mb-2 text-muted"><i><b>{campus}, {city_name}. {country}</b></i></span>
                      </div>
                    </CardBody>
                    <CardFooter style={{textAlign: "center"}}>
                      {status==="SEND" && <>
                      <button className="btn btn-sm btn-light" onClick={(e)=>{e.preventDefault(); handlerInvitation(id, "ACCEPTED")}}>
                        <i className="bi bi-check2-circle"></i>{" "}
                          Aceptar
                      </button>&nbsp;&nbsp;&nbsp;
                      <button className="btn btn-sm btn-light" onClick={(e)=>{e.preventDefault(); handlerInvitation(id, "REJECTED")}}>
                        <i className="bi bi-x-circle"></i>{" "}
                          Rechazar
                      </button></>}
                      {status!="SEND" && 
                        <button className="btn btn-sm btn-light" onClick={(e)=>{e.preventDefault(); handlerInvitation(id, "REJECTED")}}>
                          <i className="bi bi-reply"></i>{" "}
                            Deshacer
                        </button>
                      }
                    </CardFooter>

                  </Card>
                )
              )}

            </div>
          ) : (
            <>
              {status==="SEND" && <Empty message="Los torneos a los que has sido invitado aparecerán aquí." path1="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />}

              {status==="ACCEPTED" && <Empty message="Las invitaciones aceptadas aparecerán aquí." path1="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" path2="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />}

              {status==="REJECTED" && <Empty message="Las invitaciones rechazadas aparecerán aquí." path1="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" path2="M14.975 10.025a3.5 3.5 0 1 0-4.95 4.95 3.5 3.5 0 0 0 4.95-4.95Zm-4.243.707a2.501 2.501 0 0 1 3.147-.318l-3.465 3.465a2.501 2.501 0 0 1 .318-3.147Zm.39 3.854 3.464-3.465a2.501 2.501 0 0 1-3.465 3.465Z" />}               
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};
