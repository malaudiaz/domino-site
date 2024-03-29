import { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../AppContext";
import Empty from "../Empty/Empty";

export default function Players({tourneyId, title, status}) {
    const { token, lang } = useAppContext();
    const [players, setPlayers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [total, setTotal] = useState(0);
    const [refresh, setRefresh] = useState(false);
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
        const url = `${process.env.NEXT_PUBLIC_API_URL}player?tourney_id=${tourneyId}&page=${page}&per_page=${rowsPerPage}`;
    
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
        if (tourneyId) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tourneyId, refresh, page]);

    const onChangePage = (pageNumber) => {
        setPage(pageNumber);
    };

    const removePlayer = async (id) => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}player/${id}`
    
        try {
          const { data } = await axios.delete(url, config);
          if (data.success) {
            setRefresh(true);
            Swal.fire({
                icon: "success",
                title: "Eliminar Jugador",
                text: "El jugador, ahora deja de forma parte de este torneo",
                showConfirmButton: true,
            });      
          }

        } catch ({code, message, name, request}) {
            if (code === "ERR_NETWORK") {
              Swal.fire({
                title: "Eliminar Jugador",
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
                    title: "Eliminar Jugador",
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

    return (
        <div>
            <div className="ps-4">
                <h1 className="title">{title}</h1>
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
                                        <small>{item.profile_type}. {item.city_name + ", " + item.country}</small>
                                    </div>

                                    {status === "CREATED" && (<div>
                                        <div
                                            className="rounded p-2 trash-effect"
                                            title="Eliminar jugador"
                                            onClick={(e) => {removePlayer(item.id)}}
                                        >
                                        <i
                                            className="bi bi-person-dash"
                                            style={{ fontSize: "24px" }}
                                        ></i>
                                        </div>
                                    </div>)}
                                    {(status === "INITIADED" || status === "CONFIGURATED") && (<div>
                                        <div
                                            className="rounded p-2"
                                            title="Jugador Aceptado"
                                        >
                                        <i
                                            className="bi bi-patch-check"
                                            style={{ fontSize: "24px", color: "blue" }}
                                        ></i>
                                        </div>
                                    </div>)}

                                </div>

                                <div className="d-flex flex-row justify-content-between align-items-center px-2">
                                    <small className="comment-text fs-12">Nivel: <b>{item.level}</b></small>
                                    <small className="comment-text fs-12">ELO: <b>{item.elo}</b></small>
                                    <small className="comment-text fs-12">Ranking: <b>{item.ranking}</b></small>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
                ) : (
                    <div className="pt-3 px-4 pb-4" style={{ display: "grid", height: "500px" }}>
                        <Empty path1="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" path2="" message="Los jugadores aceptados para participar en el torneo aparecerán aquí." />
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
                            showInfo={false}
                        />
                    </div>          
                }
            </div>
    )
};
