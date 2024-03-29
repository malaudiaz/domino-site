import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { Label, InputGroup, Input, Button,InputGroupText } from "reactstrap";
import Pagination from "../../Pagination/Pagination";
import { useAppContext } from "../../../AppContext";
import Empty from "../../Empty/Empty";
import Register from "./Register"

export default function Players({tourney, active}) {
    const { token, lang } = useAppContext();
    const [players, setPlayers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [total, setTotal] = useState(0);
    const [filter, setFilter] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [register, setRegister] = useState(false);
    const [playerName, setPlayerName] = useState("");
    const [message, setMessage] = useState("");
    const [item, setItem] = useState([]);
    const rowsPerPage = 12;

    const config = {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "accept-Language": lang,
          "Authorization": `Bearer ${token}`,
        }
    };

    const fetchData = async () => {
        let url = `${process.env.NEXT_PUBLIC_API_URL}player?tourney_id=${tourney.id}&page=${page}&per_page=${rowsPerPage}&criteria_key=${"status_id"}&criteria_value=${filter}`;
    
        if (playerName !== "") {
            url = url  + "&player_name=" + playerName
        }

        try {
          const { data } = await axios.get(url, config);
          if (data.success) {
            setTotal(data.total);
            setTotalPages(data.total_pages);   
            setPlayers(data.data);
            setRefresh(false);
          }
        } catch ({code, message, name, request}) {
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
                const {detail} = JSON.parse(request.response)
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
        if ( active && (tourney.id || !register) ) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tourney.id, refresh, page, filter, playerName, register, active]);

    const onChangePage = (pageNumber) => {
        setPage(pageNumber);
    };

    const changePlayer = async (id, value) => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}player/changestatus/${id}?status=${value}`;
    
        try {
          const { data } = await axios.post(url, {}, config);
          if (data.success) {
            setRefresh(true);
            Swal.fire({
                icon: "success",
                title: "Cambio en Jugador",
                text: "El jugador ha cambiado su estado",
                showConfirmButton: true,
            });      
          }

        } catch ({code, message, name, request}) {
            if (code === "ERR_NETWORK") {
              Swal.fire({
                title: "Cambio en Jugador",
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
                    title: "Cambio en Jugador",
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

    const onChange = (id, value) => {
        let msg = "";
        let title = "";

        switch (value) {
            case "PAUSE":
                title="Pausar Jugador";
                msg = "Estás seguro que desea Pausar éste jugador";
                break;
            case "PLAYING":
                title="Regresar al Juego";
                msg = "Estás seguro que desea regresar éste jugador al juego";
                break;
            case "EXPELLED":
                title="Expulsar Jugador";
                msg = "Estás seguro que desea expulsar éste jugador del juego";
                break;
            case "CANCELLED":
                title="Cancelar Jugador";
                msg = "Estás seguro que desea cancelar a éste jugador";
                break;
        }

        Swal.fire({
            title: title,
            text: msg,
            icon: "question",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          }).then((result) => {
            if (result.isConfirmed) {
                changePlayer(id, value);
            }
        });
    }    

    const onChangeFilter = (value) => {
        setFilter(value);
        switch (value) {
            case "1":
                setMessage("Los jugadores aceptados para participar en el torneo aparecerán aquí.");
                break;
            case "2":
                setMessage("Los jugadores que estan jugando en el torneo aparecerán aquí.");
                break;
            case "3":
                setMessage("Los jugadores que estan en espera para jugar en el torneo aparecerán aquí.");
                break;
            case "4":
                setMessage("Los jugadores expulsados del torneo aparecerán aquí.");
                break;
            case "5":
                setMessage("Los jugadores que se encuentran en pausa aparecerán aquí.");
                break;
            case "6":
                setMessage("Los jugadores que han sido cancelados aparecerán aquí.");
                break;
        }
    }

    const onClose = () => {
        setRegister(false);
    }

    const onEdit = (record) => {
        setItem(record);
        setRegister(true);
    }

    return (
        <div className="tab-content pt-2"> 
            <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center pt-2 px-4 pb-1">
                <h5 className="flex-fill">Jugadores</h5>

                <div className="d-flex">
                    <Label size="sm" className="pe-2">
                        Mostrar:
                    </Label>

                    <InputGroup size="sm" className="pe-2">
                        <Input
                            type="select"
                            id="filter"
                            name="filter"
                            bsSize="sm"
                            value={filter}
                            onChange={(e) => {
                                onChangeFilter(e.target.value);
                            }}
                        >
                            <option value={0}>Seleccione</option>
                            <option value={1}>Aceptados</option>
                            <option value={2}>Jugando</option>
                            <option value={3}>Esperando</option>
                            <option value={4}>Expulsado</option>
                            <option value={5}>Pausa</option>
                            <option value={6}>Cancelado</option>
                        </Input>
                    </InputGroup>
                </div>

                <div className="d-flex">
                    <Label size="sm" className="pe-2">
                        Buscar:
                    </Label>

                    <InputGroup size="sm" className="pe-2">
                        <Input
                            id="playerName"
                            name="playerName"
                            bsSize="sm"
                            value={playerName}
                            autoComplete="off"
                            onChange={(e) => {
                                setPlayerName(e.target.value);
                            }}
                        ></Input>
                        <InputGroupText>
                            <a
                                style={{ cursor: "pointer" }}
                                onClick={(e)=>{e.preventDefault(); setPlayerName("");}}
                                data-toggle="tooltip"
                                title="Limpiar"
                            >
                                <i className={playerName!=="" ? "bi bi-x" : "bi bi-search"}></i>
                            </a>
                        </InputGroupText>                    
                    </InputGroup>

                </div>

                {filter==1 && <Button className="btn btn-sm btn-success" title="Registrar Jugador" onClick={(e)=>{e.preventDefault(); setRegister(true)}}>
                    <i className="bi bi-person-plus"/>&nbsp;
                    Registrar
                </Button>}

            </div>


            {players.length > 0 ? (
                <div className="pt-3 px-4 pb-4" style={{ display: "grid" }}>
                    <div className="container-events">               
                        {players.map((item, idx) => (
                            <div
                                key={idx}
                                className="lottery-card align-items-center rounded p-2"
                                style={{ height: "90px", background: "#ebebeb" }}
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
                                        {(item.city_name !== "" && item.country) &&                                        <small>{item.city_name + ", " + item.country}</small>}
                                    </div>

                                    {(tourney.status_name==="CREATED" && item.status_name === "CONFIRMED") && (
                                        <div className="d-flex">
                                            <div
                                                className="rounded p-1 trash-effect"
                                                title="Cancelar Jugador"
                                                onClick={(e) => {onChange(item.id, "CANCELLED")}}
                                            >
                                                <i
                                                    className="rounded-circle bg-danger text-white bi bi-person-dash p-1"
                                                    style={{ fontSize: "16px" }}
                                                ></i>
                                            </div>
                                        </div>
                                    )}

                                    {(tourney.status_name === "CREATED" && item.status_name === "PLAYING") && (
                                        <div className="d-flex">
                                            <div
                                                className="rounded p-1 trash-effect"
                                                title="Pausar jugador"
                                                onClick={(e) => {onChange(item.id, "PAUSE")}}
                                            >
                                                <i
                                                    className="rounded-circle bg-success text-white bi bi-pause p-1"
                                                    style={{ fontSize: "16px" }}
                                                ></i>
                                            </div>

                                            <div
                                                className="rounded p-1 trash-effect"
                                                title="Expulsar jugador"
                                                onClick={(e) => {onChange(item.id, "EXPELLED")}}
                                            >
                                                <i
                                                    className="rounded-circle bg-danger text-white bi bi-escape p-1"
                                                    style={{ fontSize: "16px" }}
                                                ></i>
                                            </div>
                                        </div>
                                    )}

                                    {(tourney.status_name === "CREATED" && item.status_name === "PAUSE") && (
                                        <div className="d-flex">
                                            <div
                                                className="rounded p-1 trash-effect"
                                                title="Volver al Juego"
                                                onClick={(e) => {onChange(item.id, "PLAYING")}}
                                            >
                                                <i
                                                    className="rounded-circle bg-primary text-white bi bi-person-check p-1"
                                                    style={{ fontSize: "16px" }}
                                                ></i>
                                            </div>
                                            <div
                                                className="rounded p-1 trash-effect"
                                                title="Expulsar jugador"
                                                onClick={(e) => {onChange(item.id, "EXPELLED")}}
                                            >
                                                <i
                                                    className="rounded-circle bg-danger text-white bi bi-escape p-1"
                                                    style={{ fontSize: "16px" }}
                                                ></i>
                                            </div>

                                        </div>
                                    )}

                                    {filter==1 && (
                                        <div className="d-flex">
                                            <div
                                                className="rounded p-1 trash-effect"
                                                title="Editar Jugador"
                                                onClick={(e) => {onEdit(item)}}
                                            >
                                                <i
                                                    className="rounded-circle bg-primary text-white bi bi-pencil-square p-1"
                                                    style={{ fontSize: "16px" }}
                                                ></i>
                                            </div>
                                        </div>
                                    )}

                                </div>

                                <div className="d-flex flex-row justify-content-between align-items-center px-2 py-2">
                                    <small>
                                        Club: <b>{item.club_siglas}</b>
                                    </small>
                                    <small className="comment-text fs-12">Nivel: <b>{item.level}</b></small>
                                    <small className="comment-text fs-12">ELO: <b>{item.elo}</b></small>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="pt-3 px-4 pb-4" style={{ display: "grid", height: "500px" }}>
                    <Empty path1="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" path2="" message={message} />
                </div>             
            )}
            {totalPages > 1 && 
                <div className="row">
                    <Pagination
                        onChangePage={onChangePage}
                        currentPage={page}
                        totalPage={totalPages}
                        totalCount={total}
                        rowsPerPage={rowsPerPage}
                        siblingCount={1}
                        showInfo={true}
                    />
                </div>          
            }

            <Register tourney={tourney} open={register} close={onClose} playerId={item.id}/>
        </div>
    )
};
