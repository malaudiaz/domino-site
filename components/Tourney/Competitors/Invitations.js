import { useState, useEffect } from "react";
import Pagination from "../../Pagination/Pagination";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../../AppContext";
import Empty from "../../Empty/Empty";
import Image from "next/image";
import { Label, InputGroup, Input, Button } from "reactstrap";

export default function Invitations({ tourney }) {
    const { token, lang } = useAppContext();
    const [invitations, setInvitations] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [total, setTotal] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [filter, setFilter] = useState(0);
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
        const url = `${
          process.env.NEXT_PUBLIC_API_URL
        }invitation/tourney/?tourney_id=${
          tourney.id
        }&page=${page}&per_page=${rowsPerPage}&criteria_key=${"status_id"}&criteria_value=${filter}`;
    
        try {
          const { data } = await axios.get(url, config);
          if (data.success) {
            setTotal(data.total);
            setTotalPages(data.total_pages);
            setInvitations(data.data);
            setRefresh(false);
          }
        } catch ({ code, message, name, request }) {
          if (code === "ERR_NETWORK") {
            Swal.fire({
              title: "Cargando Invitaciones",
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
                title: "Cargando Invitaciones",
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
        if (tourney.id) {
          fetchData();
        }
    }, [tourney.id, refresh, page, filter]);
    
    const onChangePage = (pageNumber) => {
        setPage(pageNumber);
    };
    
    const approbePlayer = async (id, value) => {
        const url = value
          ? `${process.env.NEXT_PUBLIC_API_URL}player/confirmed/${id}`
          : `${process.env.NEXT_PUBLIC_API_URL}player/rejected/${id}`;
    
        try {
          const { data } = await axios.post(url, {}, config);
          if (data.success) {
            setRefresh(true);
            if (value) {
              Swal.fire({
                icon: "success",
                title: "Aceptar Jugador",
                text: "El jugador, ahora forma parte de este torneo",
                showConfirmButton: true,
              });
            } else {
              Swal.fire({
                icon: "success",
                title: "Rechazar Jugador",
                text: "Este jugador no formara parte del torneo",
                showConfirmButton: true,
              });
            }
          }
        } catch (errors) {
          console.log(errors);
          const { response } = errors;
          const { detail } = response.data;
          Swal.fire({
            title: "Torneo/Jugadores",
            text: detail,
            icon: "error",
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
        }
    };
    
    const approbeAll = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/player/confirmed/${tourney.id}`;
    
        try {
          const { data } = await axios.post(url, {}, config);
          if (data.success) {
            setRefresh(true);
            Swal.fire({
              icon: "success",
              title: "Aceptar Jugadores",
              text: "Todos los jugadores forma parte de este torneo",
              showConfirmButton: true,
            });
          }
        } catch (errors) {
          console.log(errors);
          const { response } = errors;
          const { detail } = response.data;
          Swal.fire({
            title: "Torneo/Jugadores",
            text: detail,
            icon: "error",
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
        }
    };
    
    const handleApprobe = (e) => {
        e.preventDefault();
    
        Swal.fire({
          title: "Confirmar Juagadores",
          text: "¿ Estas seguro que desea confirmar a todos los jugadores para formar parte del torneo ?",
          icon: "question",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptat",
        }).then((result) => {
          if (result.isConfirmed) {
            approbeAll();
          }
        });
    };
        
    return (
        <div className="tab-content pt-2">
            <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center pt-2 px-4 pb-1">
                <h5 className="flex-fill">Invitaciones</h5>
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
                                setFilter(e.target.value);
                            }}
                        >
                            <option value={0}>Enviadas</option>
                            <option value={1}>Aceptadas</option>
                            <option value={2}>Rechazadas</option>
                        </Input>
                    </InputGroup>

                </div>

                <Button
                    color="primary"
                    size={"sm"}
                    style={{ width: "200px" }}
                    title="Aceptar a todos los competidores"
                    disabled={
                        tourney.status_name !== "CREATED" || invitations.length === 0
                    }
                    onClick={(e) => {
                        handleApprobe(e);
                    }}
                >
                    Aceptar a Todos
                </Button>


            </div>

            {invitations.length > 0 ? (
                <div className="pt-3 px-4 pb-4" style={{ display: "grid" }}>
                    <div className="container-events">
            
                        {invitations.map((item, idx) => (
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
                                <small className="comment-text fs-12">
                                {item.city_name + ", " + item.country}
                                </small>
                            </div>
            
                            {tourney.status_name === "CREATED" && (
                                <div className="ps-4">
                                    {item.status_name === "SEND" && (
                                        <div
                                            className="rounded p-2 accept-effect"
                                            title="Invitación Enviada"
                                        >
                                            <i
                                                className="bi bi-envelope-check"
                                                style={{ fontSize: "24px" }}
                                            ></i>
                                        </div>
                                    )}
                                    {item.status_name === "ACCEPTED" && (
                                        <div className="d-flex">
                                            <div
                                                className="rounded p-2 accept-effect"
                                                title="Aprobar jugador"
                                                onClick={(e) => {
                                                    approbePlayer(item.id, true);
                                                }}
                                            >
                                                <i
                                                    className="bi bi-person-check"
                                                    style={{ fontSize: "24px" }}
                                                ></i>
                                            </div>
                                            <div
                                                className="rounded p-2 trash-effect"
                                                title="Rechazar jugador"
                                                onClick={(e) => {
                                                    approbePlayer(item.id, false);
                                                }}
                                            >
                                                <i
                                                    className="bi bi-person-dash"
                                                    style={{ fontSize: "24px" }}
                                                ></i>
                                            </div>
                                        </div>
                                    )}



                                    {item.status_name === "REFUTED" && (
                                        <div
                                            className="p-2"
                                            title="Jugador Rechazado"
                                        >
                                            <i
                                                className="rounded-circle bg-danger text-white bi bi-person-fill-x p-1"
                                                style={{ fontSize: "16px" }}
                                            ></i>
                                        </div>
                                    )}

                                    {item.status_name === "CONFIRMED" && (
                                        <div
                                            className="p-2 trash-effect"
                                            title="Jugador Aceptado"
                                        >
                                            <i
                                                className="rounded-circle bg-primary text-white bi bi-person-fill-check p-1"
                                                style={{ fontSize: "16px" }}
                                            ></i>
                                        </div>
                                    )}
                                </div>
                            )}
            
            
                            {(tourney.status_name === "INITIADED" ||
                                tourney.status_name === "CONFIGURATED") && (
                                <div>
                                {item.status_name === "CONFIRMED" && (
                                    <div className="rounded p-2" title="Jugador Aceptado">
                                        <i
                                            className="bi bi-patch-check"
                                            style={{ fontSize: "24px", color: "blue" }}
                                        ></i>
                                    </div>
                                )}
                                </div>
                            )}
                            </div>
            
                            <div className="d-flex flex-row justify-content-between align-items-center px-2">
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
                </div>
            ) : (
                <div
                    className="pt-3 px-4 pb-4"
                    style={{ display: "grid", height: "500px" }}
                >
                    <Empty
                        path1="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"
                        path2="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z"
                        message={
                        filter === 0
                            ? "Los jugadores interesados en participar en el torneo aparecerán aquí"
                            : filter === 1
                            ? "Los jugadores aceptados para participar en el torneo aparecerán aquí"
                            : "Los jugadores rechazados para éste torneo aparecerán aquí"
                        }
                    />
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
    )
}
