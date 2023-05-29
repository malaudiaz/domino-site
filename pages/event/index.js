import React from "react";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../AppContext";
import { getSession } from "next-auth/react";
import EventLayout from "../../layouts/EventLayout";
import Head from "next/head";
import { Card, CardBody } from "reactstrap";

import Image from "next/image";
import DropDownMenu from "../../components/DropDownMenu/Menu";

import axios from "axios";
import Swal from "sweetalert2";

export default function Events({ session }) {
  const value = useContext(AppContext);
  const [page, setPage] = useState(1);
  const [events, setEvents] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const ctxMenu = [];

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
  }, [session.locale, value, page, refresh]);

  const t = value.state.languages.events;

  const onMenuSelection = (key, index) => {
    switch (key) {
      case "mnuEdit":
        break;
      case "mnuDel":
        break;
    }
  };

  return (
    <EventLayout session={session}>
      <Head>
        <link rel="shortcut icon" href="/smartdomino.ico" />
        <title>{t.title}</title>
      </Head>

      <div className="card" style={{border: "1px solid", borderColor: "#c7c7c7"}}>
        <div className="row pt-3 px-4">
          <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#012970" }}>
            Descubrir eventos
          </h1>
        </div>

        <div className="d-flex gap-2 px-4">
            <button 
              className="btn btn-sm dropdown-toggle" 
              type="button" 
              style={{background: "#e4e6eb"}}
              id="dropdownMenuButton1" 
              data-bs-toggle="dropdown" 
              aria-expanded="false">
                <i className="bi bi-geo-alt"></i> Mi ubicación
            </button>
            <button 
              type="button" 
              style={{background: "#e4e6eb"}}
              className="btn btn-sm dropdown-toggle"> 
                <i className="bi bi-calendar-week"></i> Cualquier fecha
            </button> 
            <button 
              type="button" 
              style={{ background: "#e4e6eb", color: "blue", fontWeight: "500" }}
              className="btn btn-sm"> 
                Destacados
            </button> 
            <button 
              type="button" 
              style={{background: "#e4e6eb"}}
              className="btn btn-sm"> 
                Siguiendo
            </button> 
        </div>

        <div className="row pt-4 px-4">

        {events.length > 0 ? (

          <div className="container-events">
            {events.map(
              ({ name, summary, photo, startDate, city_name, campus }, idx) => (
                <Card className="folder__card" style={{cursor: "pointer"}} key={idx}>
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
                    priority
                    layout="intrinsic"
                  />
                  <CardBody>
                    <div className="col-12 pt-4">
                      <h6 className="mb-2 text-muted">{summary}</h6>
                    </div>
                    <div className="row pt-2">
                      <div className="col-6" style={{ textAlign: "left" }}>
                        <span>Inicio: </span>
                        <b>{startDate}</b>
                      </div>
                      <div className="col-6" style={{ textAlign: "left" }}>
                        <span>Fin: </span>
                        <b>{startDate}</b>
                      </div>
                    </div>
                    <div className="row pt-2">
                      <div className="col-12" style={{ textAlign: "left" }}>
                        <span>Ciudad: </span>
                        <b>{city_name}</b>
                      </div>
                    </div>
                    <div className="row pt-2">
                      <div className="col-12" style={{ textAlign: "left" }}>
                        <span>Sede: </span>
                        <b>{campus}</b>
                      </div>
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
                Los eventos relevantes aparecerán aquí.
              </div>
            </div>
          </div>
        )}


        </div>

      </div>

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