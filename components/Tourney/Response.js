
import { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../AppContext";

export default function Response({tourneyId, menu}) {
    const { token, lang } = useAppContext();
    const [invitations, setInvitations] = useState([]);
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
        const url = `${process.env.NEXT_PUBLIC_API_URL}invitation/tourney/?tourney_id=${tourneyId}&page=${page}&per_page=${rowsPerPage}`;
    
        try {
          const { data } = await axios.get(url, config);
          if (data.success) {
            setTotal(data.total);
            setTotalPages(data.total_pages);   
            setInvitations(data.data);
            setRefresh(false);
          }
        } catch (errors) {
          console.log(errors);
          const { response } = errors;
          const { detail } = response.data;
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
    };
    
    useEffect(() => {
        if (menu === 0) {
          fetchData();
        }
    }, [menu, refresh, page]);
    

    const onChangePage = (pageNumber) => {
        setPage(pageNumber);
    };

    const approbePlayer = async(id, value) => {
        const url = value ? `${process.env.NEXT_PUBLIC_API_URL}player/confirmed/${id}` : `${process.env.NEXT_PUBLIC_API_URL}player/rejected/${id}`;
    
        try {
          const { data } = await axios.post(url, {}, config);
          if (data.success) {
            setRefresh(true);
            Swal.fire({
                icon: "success",
                title: "Aceptar Jugadores",
                text: "El jugador, ahora forma parte de este torneo",
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

    return (
        <div className="pt-3 px-4 pb-4" style={{ display: "grid" }}>
            {invitations.length > 0 ? (
            <div className="container-events">               
                {invitations.map((item, idx) => (
                    <div
                        key={idx}
                        className="align-items-center rounded p-2"
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

                            <div className="ps-4">
                                <div
                                    className="rounded p-2 accept-effect"
                                    title="Aprobar jugador"
                                    onClick={(e) => {approbePlayer(item.id, true)}}
                                >
                                <i
                                    className="bi bi-person-check"
                                    style={{ fontSize: "24px" }}
                                ></i>
                                </div>
                            </div>

                            <div>
                                <div
                                    className="rounded p-2 trash-effect"
                                    title="Rechazar jugador"
                                    onClick={(e) => {approbePlayer(item.id, false)}}
                                >
                                <i
                                    className="bi bi-person-dash"
                                    style={{ fontSize: "24px" }}
                                ></i>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-row justify-content-between align-items-center px-2">
                            <small className="comment-text fs-12">Nivel: <b>{item.level}</b></small>
                            <small className="comment-text fs-12">ELO: <b>{item.elo}</b></small>
                            <small className="comment-text fs-12">Ranking: <b>{item.ranking}</b></small>
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
                            className="bi bi-envelope-check"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z"
                            />
                            <path
                                d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z"
                            />
                        </svg>
                        <div className="pt-4 fs-5">
                            Los invitaciones aceptadas para el torneo aparecerán aquí.
                        </div>
                    </div>
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

