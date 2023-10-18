import { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../AppContext";
import SetNumber from "./SetNumber";

import { InputGroup, Input, InputGroupText, Button } from "reactstrap";

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from 'reactstrap';

import Bombo from "./Bombo";
import BomboPlayer from "./BomboPlayer";

export default function Lottery({ tourneyId, menu, lottery }) {
  const { profile, token, lang } = useAppContext();
  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState(null);
  const [selected, setSelected] = useState([]);
  const [filter, setFilter] = useState("");
  const [openNewBombo, setOpenNewBombo] = useState(false);
  const [bombo, setBombo] = useState([]);
  const rowsPerPage = 12;

  const [view, setView] = useState('1');

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
      Accept: "application/json",
      "accept-Language": lang,
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}player?tourney_id=${tourneyId}&page=${page}&per_page=${rowsPerPage}&criteria_key=${"username"}&criteria_value=${filter}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setTotal(data.total);
        setTotalPages(data.total_pages);
        setPlayers(data.data);
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
    if (menu === 3) {
      fetchData();
    }
  }, [menu, refresh, page, filter]);

  const onChangePage = (pageNumber) => {
    setPage(pageNumber);
  };

  const setClose = () => {
    setOpen(false);
  };

  const isNumberAsign = (id) => {
    const isExist = false;
    if (selected.length > 0) {
      isExist = selected.find((element) => element.id === id);
    }
    return isExist;
  };

  const getNumberAsign = (id) => {
    if (selected.length > 0) {
      const item = selected.find((element) => element.id === id);
      if (item) {
        return item.number;
      } else return false;
    }
    return false;
  };

  const handleSelect = (e, item) => {
    e.preventDefault();
    const exist = selected.find((element) => element.id === item.id);
    if (!exist) {
      setRecord(item);
      setOpen(true);
    } else {
      Swal.fire({
        title: "Eliminar número",
        text: "¿ Deseas eliminar este número de sorteo ?",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Eliminar",
      }).then((result) => {
        if (result.isConfirmed) {
          const resultado = selected.filter(
            (element) => element.id !== item.id
          );
          setSelected(resultado);
        }
      });
    }
  };

  const newBombo = (e) => {
    e.preventDefault();
    setOpenNewBombo(true);
  };

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
    const url = `${process.env.NEXT_PUBLIC_API_URL}domino/scale/initial?tourney_id=${tourneyId}`;

    if (lottery === "MANUAL") {

      if (selected.length === total) {

        try {
          const { data } = await axios.post(url, selected, config);
          if (data.success) {
            Swal.fire({
              title: "Sorteo de Jugadores del Torneo",
              text: data.detail,
              icon: "info",
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Aceptar",
            });
          }
        } catch ({ code, message, name, request }) {
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

    } else {

      if (bombo.length > 0) {

        try {
          const { data } = await axios.post(url, bombo, config);
          if (data.success) {
            Swal.fire({
              title: "Sorteo de Jugadores del Torneo",
              text: data.detail,
              icon: "info",
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Aceptar",
            });
          }
        } catch ({ code, message, name, request }) {
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
      {lottery === "MANUAL" ? 
        <div className="d-flex flex-wrap ps-4">
          <h1 className="title flex-grow-1">Sorteo Manual</h1>
          <div className="d-flex pe-4">
            <Button
              className="btn btn-sm btn-success"
              style={{ width: "100px" }}
              disabled={selected.length !== total}
              onClick={handleSave}
            >
              <i className="bi bi-check2-circle"></i> Salvar
            </Button>
            <InputGroup size="sm" className="ms-2">
              <Input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                placeholder={"Buscar..."}
                onChange={handleChange}
                value={filter}
                onKeyPress={(event) => {
                  if (!/^[a-z_.\s]*$/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <InputGroupText>
                <button style={{ border: "none" }} onClick={handleSearch}>
                  <i className={filter === "" ? "bi bi-search" : "bi bi-x"}></i>
                </button>
              </InputGroupText>
            </InputGroup>
          </div>
        </div>
      : <div className="d-flex flex-wrap ps-4">
          <h1 className="title flex-grow-1">
            Sorteo Automático
          </h1>
          <div className="d-flex pe-4">
            <Button
              className="btn btn-sm btn-success me-2"
              style={{ width: "120px" }}
              onClick={newBombo}
            >
              <i className="bi bi-plus"></i> Crear Bombo
            </Button>

            <Button className="btn btn-sm btn-secondary" onClick={handleSave}><i class="bi bi-check-circle"></i> Salvar</Button>
            
          </div>
        </div>
      }

      {lottery === "MANUAL" ? 

        <div className="pt-3 px-4 pb-4" style={{ display: "grid" }}>
        {players.length > 0 ? (
          <div className="container-events">
            {players.map((item, idx) => (
              <div
                key={idx}
                className="lottery-card align-items-center rounded p-2"
                onClick={(e) => handleSelect(e, item)}
              >
                <div
                  className="d-flex flex-row justify-content-between icons align-items-center"
                  style={{ width: "98%" }}
                >
                  <Image
                    alt="Photo Profile"
                    src={item.photo}
                    width={40}
                    height={40}
                    className="rounded-image"
                  />
                  <div className="d-flex flex-column flex-fill ms-2">
                    <span className="gamer-couple">{item.name}</span>
                    <small>
                      {item.profile_type}.{" "}
                      {item.city_name + ", " + item.country}
                    </small>
                  </div>

                  <h6
                    className={isNumberAsign(item.id) ? "d-inline" : "d-none"}
                  >
                    <span className="badge text-bg-success">
                      {lottery==="MANUAL" ? getNumberAsign(item.id) : <small>B{getNumberAsign(item.id)}</small>}
                    </span>
                  </h6>
                </div>

                <div className="d-flex flex-row justify-content-between align-items-center px-2 py-2">
                  <small className="comment-text fs-12">
                    Nivel: <b>{item.level}</b>
                  </small>
                  <small className="comment-text fs-12">
                    ELO: <b>{item.elo}</b>
                  </small>
                  <small className="comment-text fs-12">
                    Ranking: <b>{item.ranking}</b>
                  </small>
                </div>
              </div>
            ))}
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
                Los jugadores para el Sorteo aparecerán aquí.
              </div>
            </div>
          </div>
        )}
        {totalPages > 1 && (
          <div className="row">
            <Pagination
              onChangePage={onChangePage}
              currentPage={page}
              totalPage={totalPages}
              totalCount={total}
              rowsPerPage={rowsPerPage}
              siblingCount={1}
              showInfo={false}
            />
          </div>
        )}
        </div>
      : <div className="pt-3 px-4 pb-4">

        <Accordion open={view} toggle={toggle}>
          {bombo.map((item, idx) => (
            <AccordionItem key={idx}>
              <AccordionHeader targetId={item.id}>
                {item.title}
              </AccordionHeader>
              <AccordionBody accordionId={item.id}>
                <BomboPlayer tourneyId={tourneyId} item={item} bombo={bombo} setBombo={setBombo} />
              </AccordionBody>
            </AccordionItem>
          ))}
        </Accordion>

        </div>
      }

      <SetNumber
        open={open}
        setClose={setClose}
        record={record}
        selected={selected}
        setSelected={setSelected}
        lottery={lottery}
      />

      <Bombo open={openNewBombo} setClose={setOpenNewBombo} bombo={bombo} setBombo={setBombo} />

    </div>
  );
}
