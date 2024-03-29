import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../AppContext";

import { InputGroup, Input, InputGroupText, Button } from "reactstrap";

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from 'reactstrap';

import Players from "./Lottery/Players";

export default function Lottery({ tourney, setRefresh }) {
  const { token, lang } = useAppContext();
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");
  const [view, setView] = useState('1');
  const [selected, setSelected] = useState([]);
  const [number, setNumber] = useState(1);

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
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (filter !== "") {
      setFilter("");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (tourney.lottery_type === "MANUAL") {

      if (selected.length === tourney.amount_player) {

        let url = `${process.env.NEXT_PUBLIC_API_URL}domino/scale/initial/manual/?tourney_id=${tourney.id}`;

        try {
          const { data } = await axios.post(url, selected, config);
          if (data.success) {
            setRefresh(true);
            Swal.fire({
              title: "Sorteo de Jugadores del Torneo",
              text: data.detail,
              icon: "success",
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Aceptar",
            });
          }
        } catch (errors) {
          console.log(errors);
          const { code, message, name, request } = errors;
          if (code === "ERR_NETWORK") {
            Swal.fire({
              title: "Sorteo de Jugadores del Torneo",
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
                title: "Sorteo de Jugadores del Torneo",
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
  };


  return (
    <div>
      <div className="d-flex flex-wrap ps-4">
        <h1 className="title flex-grow-1">{tourney.lottery_type === "MANUAL" ? "Sorteo Manual" : "Sorteo Automático"}</h1>
        <div className="d-flex pe-4">
          {tourney.lottery_type === "MANUAL" && 
            <Button
              className="btn btn-sm btn-success"
              style={{ width: "100px" }}
              onClick={handleSave}
              disabled={tourney.status_name === "INITIADED"}
            >
              <i className="bi bi-check2-circle"></i> Salvar
            </Button>
          }
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
      </div>

      {categories.length > 0 ? (
        <div className="pt-3 px-4 pb-4">
          <Accordion open={view} toggle={toggle}>
            {categories.map((item, idx) => (
              <AccordionItem key={idx}>
                <AccordionHeader targetId={item.id}>
                  {item.category_number}
                </AccordionHeader>
                <AccordionBody accordionId={item.id}>
                  <div className="d-flex flex-row justify-content-between">
                    <small className="comment-text fs-12">
                      ELO Máximo: <b>{item.elo_max}</b>
                    </small>
                    <small className="comment-text fs-12">
                      ELO Mínimo: <b>{item.elo_min}</b>
                    </small>
                  </div>
                  <Players 
                    id={item.id} 
                    lotteryType={tourney.lottery_type} 
                    selected={selected} 
                    setSelected={setSelected}
                    number={number}
                    setNumber={setNumber} 
                    filter={filter}
                  />
                </AccordionBody>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
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
  );
}
