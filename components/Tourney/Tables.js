import { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../AppContext";

export default function Tables({tourneyId, menu}) {
    const { token, lang } = useAppContext();
    const [tables, setTables] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [total, setTotal] = useState(0);
    const rowsPerPage = 10;

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
            setTables(data.data);
          }
        } catch (errors) {
          console.log(errors);
          const { response } = errors;
          const { detail } = response.data;
          Swal.fire({
            title: "Cargando Mesas del Torneo",
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
        if (menu === 2) {
          fetchData();
        }
    }, [menu]);

    const onChangePage = (pageNumber) => {
        setPage(pageNumber);
        fetchData();
    };

    return (
        <div className="pt-3 px-4 pb-4" style={{ display: "grid" }}>
            {tables.length > 0 ? (
                <div className="container-events">               
                    {tables.map((item, idx) => (
                        <div
                            key={idx}
                            className="d-flex align-items-center rounded p-2"
                            style={{ height: "70px", background: "#ebebeb" }}
                        >
                            <div
                            className="d-flex flex-row justify-content-between icons align-items-center"
                            style={{ width: "98%" }}
                            >
                            <Image
                                alt=""
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
                                onClick={(e) => {}}
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
                                onClick={(e) => {}}
                                >
                                <i
                                    className="bi bi-person-dash"
                                    style={{ fontSize: "24px" }}
                                ></i>
                                </div>
                            </div>
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
                            className="bi bi-ui-checks-grid"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M2 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM0 2a2 2 0 0 1 3.937-.5h8.126A2 2 0 1 1 14.5 3.937v8.126a2 2 0 1 1-2.437 2.437H3.937A2 2 0 1 1 1.5 12.063V3.937A2 2 0 0 1 0 2zm2.5 1.937v8.126c.703.18 1.256.734 1.437 1.437h8.126a2.004 2.004 0 0 1 1.437-1.437V3.937A2.004 2.004 0 0 1 12.063 2.5H3.937A2.004 2.004 0 0 1 2.5 3.937zM14 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM2 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                            />
                        </svg>
                        <div className="pt-4 fs-5">
                            Las Mesas del torneo aparecerán aquí.
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
