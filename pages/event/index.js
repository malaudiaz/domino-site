import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import {useAppContext} from "../../AppContext";
import Layout from "../../layouts/Layout";
import Head from "next/head";
import { Card, CardBody } from "reactstrap";
import { eventDate } from "../../_functions";

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
import Empty from "../../components/Empty/Empty";

export default function Events() {
  const {profile, lang, token, i18n} = useAppContext();
  const [events, setEvents] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [locations, setLocations] = useState(false);
  const [period, setPeriod] = useState(false);
  const [moment, setMoment] = useState("");
  const [location, setLocation] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  const router = useRouter();


  const rowsPerPage = 12;

  const [filter, setFilter] = useState({
    criteria_key: "participating",
    criteria_value: "",
  });

  const ctxMenu = [
    { text: "Torneos", key: "mnuTourney", icon: "bi bi-pencil-square" },
    { text: "Seguir", key: "mnuFollow", icon: "bi bi-pencil-square" }
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
    let url = `${
      process.env.NEXT_PUBLIC_API_URL
    }event/criteria/?profile_id=${profile.id}&page=${page}&per_page=${rowsPerPage}`;

    if (filter.criteria_key !== "") {
      if (filter.criteria_value === "") {
        url = url + "&criteria_key=" + (filter.criteria_key==="participating" ? "participating" : "following");
      } else {
        url = url + "&criteria_key=" + filter.criteria_key + "&criteria_value=" + filter.criteria_value;
      }
    }

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setTotal(data.total);
        setTotalPages(data.total_pages);   
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
            title: "Descubrir Eventos",
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
  }, [refresh, profile, filter]);

  const t = i18n.events;

  const onMenuSelection = (key, index) => {
    switch (key) {
      case "mnuTourney":
        break;
    }
  };

  const toggleLocations = () => setLocations((prevState) => !prevState);
  const togglePeriod = () => setPeriod((prevState) => !prevState);

  const changeFilter = (name, text, value) => {
    if (document.getElementById(name)) {
      document.getElementById(name).innerHTML = text;
    }
    setFilter({criteria_key: name, criteria_value: value});
    if (name === "location") {
      setLocation(value);
    } else {
      setMoment(value);
    }
  }

  const handleClick = (id) => {
    router.push(`/tourney/available/${id}`);
  };


  return (
    <Layout>
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
              <Dropdown isOpen={locations} toggle={toggleLocations} direction={"down"}>
                <DropdownToggle 
                  id="location" 
                  caret
                  color={filter.criteria_key==="location" ? "primary" : "secondary"}                
                >
                  <i className="bi bi-geo-alt"></i> Mí ubicación
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={(e)=>{e.preventDefault(); changeFilter("location", "Mí ubicación", "")}}>Mí ubicación</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={(e)=>{e.preventDefault(); changeFilter("location", "Mi País", "MY_COUNTRY")}}>Mi país</DropdownItem>
                  <DropdownItem onClick={(e)=>{e.preventDefault(); changeFilter("location", "Mi Ciudad", "MY_CITY")}}>Mi ciudad</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Dropdown 
                isOpen={period} 
                toggle={togglePeriod} 
                direction={"down"}
              >
                <DropdownToggle 
                  id="moment" 
                  caret
                  color={filter.criteria_key==="moment" ? "primary" : "secondary"}                
                >
                  <i className="bi bi-calendar-week"></i> Cualquier fecha</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={(e)=>{e.preventDefault(); changeFilter("moment", "Cualquier fecha", "0")}}>Cualquier fecha</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={(e)=>{e.preventDefault(); changeFilter("moment", "Hoy", "1")}}>Hoy</DropdownItem>
                  <DropdownItem onClick={(e)=>{e.preventDefault(); changeFilter("moment", "Mañana", "2")}}>Mañana</DropdownItem>
                  <DropdownItem onClick={(e)=>{e.preventDefault(); changeFilter("moment", "Este fin de semana", "3")}}>Este fin de semana</DropdownItem>
                  <DropdownItem onClick={(e)=>{e.preventDefault(); changeFilter("moment", "Esta semana", "4")}}>Esta semana</DropdownItem>
                  <DropdownItem onClick={(e)=>{e.preventDefault(); changeFilter("moment", "Próxima semana", "5")}}>Próxima semana</DropdownItem>
                  <DropdownItem onClick={(e)=>{e.preventDefault(); changeFilter("moment", "Este mes", "6")}}>Este mes</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Button 
                color={filter.criteria_key==="following" ? "primary" : "secondary"} 
                size="sm" 
                onClick={(e)=>{
                  e.preventDefault(); 
                  changeFilter("following", "Siguiendo", "")}}
                > 
                  Siguiendo
              </Button> 

              <Button 
                color={filter.criteria_key==="participating" ? "primary" : "secondary"} 
                size="sm" 
                onClick={(e)=>{
                  e.preventDefault(); 
                  changeFilter("participating", "Participando", "")}}
                > 
                  Participando
              </Button> 


          </div>

          {events.length > 0 ? (

            <div className="pt-4 px-4" style={{display: "grid"}}>

              <div className="container-events">
                {events.map(
                  ({ id, name, summary, photo, startDate, endDate, city_name, campus, amount_people }, idx) => (
                    <Card 
                      className="card-info"
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
                      <div style={{cursor: "pointer", width: "100%"}} onClick={(e)=>{e.preventDefault(); handleClick(id)}}>
                        <Image
                          alt={summary}
                          src={photo}
                          width={450}
                          height={350}
                          quality={80}
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
                      </div>
                    </Card>
                  )
                )}
              </div>

            </div>

          ) : (
            <div className="pt-4 px-4" style={{display: "grid", height: "600px"}}>
              <Empty 
                message="Los eventos relevantes aparecerán aquí."
                path1="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"
                path2="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
              />
            </div>
          )}



      </div>

    </Layout>
  );
}
