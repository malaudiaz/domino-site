import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../AppContext";
import { shortDate } from "../../_functions";
import ViewPlayer from "./ViewPlayer";
import Image from "next/image";

import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody
} from "reactstrap";

export default function View({ record }) {
  const { lang, token } = useAppContext();
  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);
  const [open, setOpen] = useState('1');
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "accept-Language": lang,
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const urlCountries = `${
        process.env.NEXT_PUBLIC_API_URL
      }countries?page=${0}&per_page=${0}`;

      try {
        const { data } = await axios.get(urlCountries, config);

        if (data.success) {
          setCountry(data.data);
        }
      } catch ({ response }) {
        console.log(response);

        const { detail } = response.data;
        Swal.fire({
          icon: "error",
          title: "Cargando Paises",
          text: detail,
          showConfirmButton: true,
        });
      }

      const urlCities = `${
        process.env.NEXT_PUBLIC_API_URL
      }city?page=${0}&per_page=${0}&criteria_key=${"country_id"}&criteria_value=${
        record.country_id
      }`;

      try {
        const { data } = await axios.get(urlCities, config);

        if (data.success) {
          setCity(data.data);
        }
      } catch ({ response }) {
        const { detail } = response.data;
        Swal.fire({
          icon: "error",
          title: "Cargando Ciudades",
          text: detail,
          showConfirmButton: true,
        });
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record.country_id]);

  return (
    <div
      className="tab-pane fade show active profile-overview"
      id="profile-overview"
    >

      {record.profile_type_name === "USER" ? (
        <div id="USER">

          <h5 className="card-title">Detalles del Pérfil</h5>

          <div className="row">
            <div className="col-lg-3 col-md-4 label">Nombre</div>
            <div className="col-lg-9 col-md-8">{record.first_name}</div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-4 label ">Apellido</div>
            <div className="col-lg-9 col-md-8">{record.last_name}</div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-4 label ">Alias</div>
            <div className="col-lg-9 col-md-8">{record.alias}</div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-4 label">Ocupación</div>
            <div className="col-lg-9 col-md-8">{record.job}</div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-4 label">Correo</div>
            <div className="col-lg-9 col-md-8">{record.email}</div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-4 label">Teléfono</div>
            <div className="col-lg-9 col-md-8">{record.phone}</div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-4 label">Sexo</div>
            <div className="col-lg-9 col-md-8">
              {record.sex === "" || record.sex === "F" ? "Femenino" : "Mascúlino"}
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-4 label">Fecha Nacimiento</div>
            <div className="col-lg-9 col-md-8">{shortDate(record.birthdate)}</div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-4 label">País</div>
            <div className="col-lg-9 col-md-8">
              {country.map((row) => {
                if (row.id == record.country_id) {
                  return row.name;
                }
              })}
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-4 label">Ciudad</div>
            <div className="col-lg-9 col-md-8">
              {city.map((row, i) => {
                if (row.id == record.city_id) {
                  return row.name;
                }
              })}
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-4 label">Notificaciones</div>
            <div className="col-lg-9 col-md-8">
              {record.receive_notifications
                ? "Activado, Recibe notificaciones"
                : "Apagado, No recibe notificaciones."}
            </div>
          </div>
        </div>
      ) : (
          record.profile_type_name !== "TEAM_PLAYER" ? (
            <div className="px-4">
              <h5 className="card-title">Detalles del Pérfil</h5>

              <ViewPlayer record={record} city={city} />
            </div>

          ) : (
            <Accordion open={open} toggle={toggle}>
              <AccordionItem>
                <AccordionHeader targetId="1">Detalles del Pérfil</AccordionHeader>
                <AccordionBody accordionId="1">
                  <div className="px-4">
                    <ViewPlayer record={record} city={city} />
                  </div>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="2">Equipo</AccordionHeader>
                <AccordionBody accordionId="2">
                  <div className="row container-players p-2">
                    {record.lst_users.map((item, idx)=>(
                        <div key={idx} className="d-flex align-items-center rounded mb-3 p-2 hover-effect">
                            <div className="d-flex flex-row justify-content-between icons align-items-center" style={{width: "98%"}}>
                              <Image
                                  alt=""
                                  src={item.photo}
                                  width={40}
                                  height={40}
                                  className="rounded-image"
                              />
                              <div className="d-flex flex-column flex-fill ms-2">
                                  <span className="gamer-couple">{item.name}</span>
                                  <small className="comment-text fs-12">{item.city_name}</small>
                              </div>


                            </div>
                        </div>
                    ))}

                  </div>
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          )
        )
      }      
    </div>
  );
}
