import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../AppContext";

import { InputGroup, Input, InputGroupText, Badge } from "reactstrap";

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from 'reactstrap';

import Players from "../Tourney/Lottery/Players";

export default function Lottery({ activeRound, tourney, selected, setSelected, active }) {
  const { token, lang } = useAppContext();
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");
  const [view, setView] = useState('1');
  const [number, setNumber] = useState(1);
  const [refresh, setRefresh] = useState(true);

  const toggle = (id) => {
    if (view === id) {
      setView();
    } else {
      setView(id);
    }
  };  
  
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`
    },
  };

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/setting/categories/${tourney.id}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setCategories(data.data);
        setRefresh(false);
      }
    } catch ({ code, message, name, request }) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Cargando Jugadores del Torneo",
          text: "Error en su red, consulte a su proveedor de servicio",
          icon: "error",
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      } else {
        if (code === "ERR_BAD_REQUEST") {
          const { detail } = JSON.parse(request.response);
          Swal.fire({
            title: "Cargando Jugadores del Torneo",
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
    if (refresh && active) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, active]);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (filter !== "") {
      setFilter("");
    }
  };

  const handleRestart = async (e) => {
    e.preventDefault();

    if (activeRound.status_name === "CONFIGURATED" || activeRound.status_name === "CREATED") {
      const url = `${process.env.NEXT_PUBLIC_API_URL}domino/scale/initial/restart/${activeRound.id}`;

      try {
        const { data } = await axios.post(url, {}, config);
        if (data.success) {
          setSelected([]);
          setRefresh(true);
          Swal.fire({
            title: "Repetir el Sorteo",
            text: "El sorteo se ha repetido exitosamente",
            icon: "success",
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
        }
      } catch ({ code, message, name, request }) {
        if (code === "ERR_NETWORK") {
          Swal.fire({
            title: "Repetir el Sorteo",
            text: "Error en su red, consulte a su proveedor de servicio",
            icon: "error",
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
        } else {
          if (code === "ERR_BAD_REQUEST") {
            const { detail } = JSON.parse(request.response);
            Swal.fire({
              title: "Repetir el Sorteo",
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
    }

  }

  return (
    <div className="tab-content pt-4">
      <div className="d-flex flex-wrap gap-2 ps-4">
        <h6 className="title flex-grow-1">{activeRound.lottery_type === "MANUAL" ? "Sorteo Manual" : "Sorteo Automático"}</h6>
        <div className="d-flex pe-2">
          <InputGroup size="sm" className="ms-2">
            <Input
              type="text"
              name="username"
              id="username"
              autoComplete="off"
              placeholder={"Buscar..."}
              onChange={handleChange}
              value={filter}
            />
            <InputGroupText>
              <button style={{ border: "none" }} onClick={handleSearch}>
                <i className={filter === "" ? "bi bi-search" : "bi bi-x"}></i>
              </button>
            </InputGroupText>
          </InputGroup>
        </div>
        <button
            type="button"
            disabled={activeRound.status_name!=="CONFIGURATED" && activeRound.status_name!=="CREATED"}
            onClick={(e)=>{handleRestart(e)}}
            className="btn btn-sm btn-primary pe-4"
        >
          <i className="bi bi-arrow-repeat"/>&nbsp;Reiniciar
        </button>
      </div>

      <hr></hr>

      {activeRound.use_segmentation ? (
        <div className="pt-3 px-4 pb-4">

            {categories.length > 0 ? (

              <Accordion open={view} toggle={toggle}>
                {categories.map((item, idx) => (
                  <AccordionItem key={idx}>
                    <AccordionHeader targetId={item.id}>
                      {item.category_number}&nbsp;<Badge color="info" pill>{item.amount_players}</Badge>
                    </AccordionHeader>
                    <AccordionBody accordionId={item.id}>
                      {item.elo_max > 0  && item.elo_min > 0 && 
                        <div className="d-flex flex-row justify-content-between">
                          <small className="comment-text fs-12">
                            ELO Máximo: <b>{item.elo_max}</b>
                          </small>
                          <small className="comment-text fs-12">
                            ELO Mínimo: <b>{item.elo_min}</b>
                          </small>
                        </div>
                      }
                      <Players 
                        id={item.id} 
                        lotteryType={activeRound.lottery_type} 
                        selected={selected} 
                        setSelected={setSelected}
                        number={number}
                        setNumber={setNumber} 
                        filter={filter}
                        useSegmentation={activeRound.use_segmentation}
                        reload={refresh}
                      />
                    </AccordionBody>
                  </AccordionItem>
                ))}

              </Accordion>

            ) : (
              <div className="wrapper">
                <div style={{ textAlign: "center" }}>
                  <svg
                    width="56"
                    height="56"
                    fill="#0d6efd"
                    className="bi bi-people"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                  </svg>
                  <div className="pt-4 fs-5">
                    Las categorias para el Sorteo aparecerán aquí.
                  </div>
                </div>
              </div>
            )}

        </div>
      ) : (
        <div className="pt-3 px-4 pb-4">

          <Players 
            id={tourney.id} 
            lotteryType={activeRound.lottery_type} 
            selected={selected} 
            setSelected={setSelected}
            number={number}
            setNumber={setNumber} 
            filter={filter}
            useSegmentation={activeRound.use_segmentation}
          />


        </div>
      )}
    </div>
  );
}
