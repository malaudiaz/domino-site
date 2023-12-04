import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../../AppContext";
import Header from "../../components/Header/Header";
import Head from "next/head";
import axios from "axios";
import Swal from "sweetalert2";
import Tables from "../../components/Round/Tables";
import Raiting from "../../components/Round/Raiting";

export default function Round() {
    const router = useRouter();
    const {token, lang} = useAppContext();

    const roundId = router.query.id;
    const [round, setRound] = useState([]);

    const [menu, setMenu] = useState("TABLES");


    const config = {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "accept-Language": lang,
          "Authorization": `Bearer ${token}`,
        }
    };    

    const fetchData = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/rounds/one/?round_id=${roundId}`;
    
        try {
          const { data } = await axios.get(url, config);
          if (data.success) {
            setRound(data.data);
          }
        } catch ({ code, message, name, request }) {
            if (code === "ERR_NETWORK") {
              Swal.fire({
                title: "Cargando Rondas del Torneo",
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
                  title: "Cargando Rondas del Torneo",
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
        if (roundId) {
            fetchData();
        }
    }, [roundId]); 

    const handleButton = (btn) => {
        setMenu(btn);
    };  

    return (
        <>
            <Header />
    
            <aside id="sidebar" className="sidebar">
                <div className="row">
                    <h1 style={{ fontSize: "20px", fontWeight: "600", color: "#012970" }}>
                        Rondas
                    </h1>
                </div>
                <ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-item">

                        <div
                            className="align-items-center rounded p-2"
                            style={{ height: "60px", background: "#ebebeb" }}
                        >


                            <div
                                className="d-flex flex-row justify-content-between icons align-items-center"
                                style={{ width: "98%" }}
                            >

                                <h3 className="ms-2"><span className="badge bg-danger rounded-circle">{round.round_number}</span></h3>          

                                <div className="d-flex flex-column flex-fill ms-4">
                                    <h6><b>{round.summary}</b></h6>
                                </div>

                            </div>
                        </div>

                    </li>
                    <li className="nav-item">
                        <a
                            className={
                                router.asPath === "/" ? "nav-link active" : "nav-link collapsed"
                            }
                            onClick={() => router.back()}
                            style={{ cursor: "pointer" }}
                        >
                            <i className={"bi bi-arrow-left"}></i>
                            <span>Salir</span>
                        </a>
                    </li>
                </ul>
            </aside>   

            <main id="main" className="main">
                <Head>
                    <link rel="shortcut icon" href="/smartdomino.ico" />
                    <title>Rondas</title>
                </Head>

                <div
                    className="card"
                    style={{ border: "1px solid", borderColor: "#c7c7c7" }}
                >

                    <div className="pt-2 px-4" style={{ display: "flex" }}>

                        <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#012970" }}>
                            {round.summary}
                        </h1>

                    </div>

                    <div className="row px-4" style={{ fontSize: "14px" }}>
                        <span className="mb-2 text-muted">Fecha Inicio: {round.start_date}</span>
                        {round.close_date!=="" && <span className="mb-2 text-muted">Fecha  Final:</span>}
                        <span className="mb-2 text-muted">Mesas: {round.amount_tables}</span>
                        <span className="mb-2 text-muted">Parejas: {round.amount_pairs}</span>
                    </div>

                    <div className="row px-4">
                        <hr></hr>
                    </div>

                    
                    <div
                        className="px-4 pb-2"
                        style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                    >
                        <button
                            type="button"
                            className={menu==="TABLES" ? "btn btn-sm btn-primary" : "btn btn-sm btn-secondary"}
                            onClick={(e) => {
                                e.preventDefault();
                                handleButton("TABLES")
                            }}
                        >
                            <i className="bi bi-bounding-box"></i> Mesas
                        </button>


                        <button
                            type="button"
                            className={menu==="RAITING" ? "btn btn-sm btn-primary" : "btn btn-sm btn-secondary"}
                            onClick={(e) => {
                                e.preventDefault();
                                handleButton("RAITING")
                            }}
                        >
                            <i className="bi bi-sort-numeric-up"></i> Clasificación
                        </button>


                    </div>

                    {menu==="TABLES" && <Tables roundId={roundId} />}
                    {menu==="RAITING" && <Raiting roundId={roundId} />}

                </div>

            </main>

        </>
    ) 

}