import { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import { useAppContext } from "../../AppContext";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import { Navbar,Form, Label, InputGroup, Input, Button } from "reactstrap";

export default function BomboPlayer({ tourney, item, bombo, setBombo, setPlayerAvailable }) {
  const { token, lang } = useAppContext();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [players, setPlayers] = useState([]);

  const [max, setMax] = useState(item.max);
  const [min, setMin] = useState(item.min);

  const rowsPerPage = 12;

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}player/elo/?tourney_id=${tourney.id}&page=${page}&per_page=${rowsPerPage}&min_elo=${min}&max_elo=${max}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setTotal(data.total);
        setTotalPages(data.total_pages);
        setPlayers(data.data);
        item.players = data.total;

        let total = 0;
        for (let i=0; i<bombo.length; i++) {
          total = total + bombo[i].players;
        }
        setPlayerAvailable(total);

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
    if (max !== "" && min !== "") {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, max, min]);

  const onChangePage = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    if (name === "maxElo") {
        setMax(value);
    } else {
        setMin(value);
    }
  };

  const handleDelte = (e) => {
    e.preventDefault();
    const exist = bombo.find((element) => element.id === item.id);
    if (exist) {
        Swal.fire({
            title: "Eliminar Bombo",
            text: "¿ Deseas eliminar este Bombo ?",
            icon: "question",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Eliminar",
          }).then((result) => {
            if (result.isConfirmed) {
              const resultado = bombo.filter(
                (element) => element.id !== item.id
              );
              setBombo(resultado);
            }
        });
    }
  }

  return (
    <div className="pb-4" style={{ display: "grid" }}>

      <Navbar
          className="navbar-light bg-light my-2"
      >
          <div className="d-flex flex-wrap">
              <div className="d-flex me-4">
                  <Label size="sm" style={{width: "100px"}}>ELO Máximo:</Label>
                  <InputGroup size="sm" style={{width: "100px"}}>
                      <Input
                          type="text"
                          name="maxElo"
                          id="maxElo"
                          autoComplete="off"
                          value={max}
                          onChange={handleChange}
                          onKeyPress={(event) => {
                              if (!/^[0-9.]*$/.test(event.key)) {
                                  event.preventDefault();
                              }
                          }}
                      />
                  </InputGroup>
              </div>
            
              <div className="d-flex me-4">
                  <Label size="sm" style={{width: "100px"}}>ELO Mínimo:</Label>
                  <InputGroup size="sm" style={{width: "100px"}}>
                      <Input
                          type="text"
                          name="minElo"
                          id="minElo"
                          autoComplete="off"
                          value={min}
                          onChange={handleChange}
                          onKeyPress={(event) => {
                              if (!/^[0-9.]*$/.test(event.key)) {
                                  event.preventDefault();
                              }
                          }}
                      />
                  </InputGroup>
              </div>

              <div className="d-flex">
                  <Button className="btn btn-sm btn-danger" onClick={handleDelte}><i className="bi bi-trash"></i> Eliminar</Button>
              </div>
          </div>
      </Navbar>

      <div className="container-events pt-3">
        {players.map((item, idx) => (
          <div
            key={idx}
            className="lottery-card align-items-center rounded p-2"
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
                  {item.profile_type}. {item.city_name + ", " + item.country}
                </small>
              </div>
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
  );
}
