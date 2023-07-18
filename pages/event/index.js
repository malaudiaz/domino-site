import React from "react";
import { useEffect, useState } from "react";
import {useAppContext} from "../../AppContext";
import EventLayout from "../../layouts/EventLayout";
import Head from "next/head";
import { Card, CardBody } from "reactstrap";
import { eventDate } from "../_functions";

import Image from "next/image";
import DropDownMenu from "../../components/DropDownMenu/Menu";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from 'reactstrap';

import axios from "axios";
import Swal from "sweetalert2";

export default function Events() {
  const {profile, createProfile, lang, token, i18n} = useAppContext();
  const [events, setEvents] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [ubication, setUbication] = useState(false);
  const [period, setPeriod] = useState(false);

  const [filter, setFilter] = useState("");

  const ctxMenu = [];

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
    fetchData();
  }, [refresh]);

  const t = i18n.events;

  const onMenuSelection = (key, index) => {
    switch (key) {
      case "mnuEdit":
        break;
      case "mnuDel":
        break;
    }
  };

  const toggleUbication = () => setUbication((prevState) => !prevState);
  const togglePeriod = () => setPeriod((prevState) => !prevState);
  const changePeriod = (text) => {
    document.getElementById("period").innerHTML = text;
  };

  return (
    <EventLayout>
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

          <div className="px-4" style={{display: "flex", flexWrap: "wrap", gap:"10px"}}>
              <Dropdown isOpen={ubication} toggle={toggleUbication} direction={"down"}>
                <DropdownToggle caret><i className="bi bi-geo-alt"></i> Mí ubicación</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Mi país</DropdownItem>
                  <DropdownItem>Mi ciudad</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Dropdown isOpen={period} toggle={togglePeriod} direction={"down"}>
                <DropdownToggle id="period" caret><i className="bi bi-calendar-week"></i> Cualquier fecha</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={(e)=>{e.preventDefault(); changePeriod("Cualquier fecha")}}>Cualquier fecha</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={(e)=>{e.preventDefault(); changePeriod("Hoy")}}>Hoy</DropdownItem>
                  <DropdownItem onClick={(e)=>{e.preventDefault(); changePeriod("Mañana")}}>Mañana</DropdownItem>
                  <DropdownItem onClick={(e)=>{e.preventDefault(); changePeriod("Este fin de semana")}}>Este fin de semana</DropdownItem>
                  <DropdownItem onClick={(e)=>{e.preventDefault(); changePeriod("Esta semana")}}>Esta semana</DropdownItem>
                  <DropdownItem onClick={(e)=>{e.preventDefault(); changePeriod("Próxima semana")}}>Próxima semana</DropdownItem>
                  <DropdownItem onClick={(e)=>{e.preventDefault(); changePeriod("Este mes")}}>Este mes</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Button size="sm" color="primary"> 
                  Destacados
              </Button> 
              <Button size="sm"> 
                  Siguiendo
              </Button> 
          </div>

          <div className="pt-4 px-4" style={{display: "grid"}}>

          {events.length > 0 ? (

            <div className="container-events">
              {events.map(
                ({ name, summary, photo, startDate, endDate, city_name, campus, amount_people }, idx) => (
                  <Card style={{cursor: "pointer", borderRadius: "10px"}} key={idx}>
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
                      alt={summary}
                      src={photo}
                      width={400}
                      height={400}
                      quality={50}
                      priority
                      layout="intrinsic"
                    />
                    <CardBody>
                      <div className="col-12 pt-4" style={{textAlign: "center"}}>
                        <h6 className="mb-2 text-muted">{summary}</h6>
                      </div>
                      <div className="row pt-2" style={{textAlign: "center"}}>
                        <span className="mb-2 text-muted"><b>{eventDate(startDate, endDate)}</b></span>
                      </div>
                      <div className="row pt-2" style={{textAlign: "center"}}>
                          <b>{campus}, {city_name}</b>
                      </div>
                      {amount_people > 0 &&
                        <div className="col-12 pt-2" style={{textAlign: "center"}}>
                          <span className="mb-2 text-muted">{amount_people === 1 ? amount_people + " persona asistira" : amount_people + " personas asistirán"}</span>
                        </div>
                      }
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
