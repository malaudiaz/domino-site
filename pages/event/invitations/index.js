import React from "react";
import { useEffect, useState } from "react";
import {useAppContext} from "../../../AppContext";
import Layout from "../../../layouts/Layout";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { Card, CardBody, CardFooter } from "reactstrap";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { eventDate } from "../../../_functions";

export default function Invitations() {
  const {lang, token} = useAppContext();

  const ctxMenu = [];
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
    }invitation?status_name=${status}`;

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
    fetchData();
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
        <title>Asistiré</title>
      </Head>

      <div className="card" style={{border: "1px solid", borderColor: "#c7c7c7"}}>
        <div className="row pt-3 px-4">
          <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#012970" }}>
            Invitaciones
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
                          <span className="mb-2" style={{color: "red"}}><b>INVITACION / {rolevent_name}</b></span>
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
            <div className="wrapper">
              <div style={{textAlign: "center"}}>
                <svg
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
                  {status==="SEND" && <span>Los torneos a los que has sido invitado aparecerán aquí.</span>}
                  {status==="ACCEPTED" && <span>Las invitaciones aceptadas aparecerán aquí.</span>}
                  {status==="REJECTED" && <span>Las invitaciones rechazadas aparecerán aquí.</span>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
