import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Pagination from "../Pagination/Pagination";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../AppContext";

export default function Rounds({ tourneyId, title, showPlay }) {
  const { token, lang } = useAppContext();
  const [rounds, setRounds] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const rowsPerPage = 12;

  const router = useRouter();

  const config = {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "accept-Language": lang,
        "Authorization": `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/rounds/?tourney_id=${tourneyId}&page=${page}&per_page=${rowsPerPage}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setTotal(data.total);
        setTotalPages(data.total_pages);
        setRounds(data.data);
        setRefresh(false);
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
    if (tourneyId) {
      fetchData();
    }
  }, [refresh, page, tourneyId]);

  const onChangePage = (pageNumber) => {
    setPage(pageNumber);
  };

  const roundPlay = async() => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}rounds/${tourneyId}`;

    try {
      const { data } = await axios.post(url, {}, config);
      if (data.success) {
        setRefresh(true);

        Swal.fire({
          title: "Rondas",
          text: "La ronda ha sido iniciada",
          icon: "info",
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      }
    } catch ({code, message, name, request}) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Error en la Red",
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
            title: "Autentificar",
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

  const handleClick = (item) => {
    if (!showPlay) {
      router.push(`/round/${item.id}`);
    } else {

      if (item.status_name === "CREATED") {
        Swal.fire({
          title: "Inicial Ronda",
          text: "Estas seguro que deseas inicial esta ronda",
          icon: "question",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Inicial",
        }).then((result) => {
          if (result.isConfirmed) {

            roundPlay();

          }
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "Inicial Ronda",
          text: "La ronda seleccionada, ya esta iniciada",
          showConfirmButton: true,
        });
      }
    }
  };

  return (
    <div>
      <div className="ps-4">
        <h1 className="title">{title}</h1>
      </div>

      <div className="pt-3 px-4 pb-4" style={{ display: "grid" }}>
        {rounds.length > 0 ? (
          <div className="container-events">
            {rounds.map((item, idx) => (
              <div
                key={idx}
                className="align-items-center rounded p-2"
                style={{ height: item.close_date !== "" ? "100px" : "80px", background: "#ebebeb" }}
              >
                <div
                  className="d-flex flex-row justify-content-between icons align-items-center"
                  style={{ width: "98%", cursor:"pointer"}}
                  onClick={(e) => {e.preventDefault(); handleClick(item);}}
                >

                  <h3 className="ms-2"><span className="badge bg-danger rounded-circle">{item.round_number}</span></h3>          

                  <div className="d-flex flex-column flex-fill ms-4">
                    <h6><b>{item.summary}</b></h6>
                    <small className="comment-text fs-12">
                        Fecha Inicio: <b>{item.start_date}</b>
                    </small>
                    {item.close_date !== "" &&
                        <small className="comment-text fs-12">
                            Fecha Final: <b>{item.close_date}</b>
                        </small>
                    }
                    <small className="comment-text fs-12">
                        Estado: <b>{item.status_description.toUpperCase()}</b>
                    </small>
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
                className="bi bi-people"
                viewBox="0 0 16 16"
              >
                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
              </svg>
              <div className="pt-4 fs-5">
                Las rondas del torneo aparecerán aquí.
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
    </div>
  );
}
