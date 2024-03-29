import { useState, useEffect } from "react";
import Pagination from "../../Pagination/Pagination";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../../AppContext";
import SetNumber from "../SetNumber";

export default function Players({ 
    id, 
    lotteryType, 
    selected, 
    setSelected, 
    filter, 
    number, 
    setNumber, 
    useSegmentation,
    reload 
  }) {
  const { token, lang } = useAppContext();
  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [record, setRecord] = useState(null);
  const [open, setOpen] = useState(false);
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
    let url = `${process.env.NEXT_PUBLIC_API_URL}tourney/setting`;

    if (useSegmentation) {
      url = url + `/categories/player/${id}?page=${page}&per_page=${rowsPerPage}&criteria_key=username&criteria_value=${filter}`
    } else {
      url = url + `/nocategories/player/${id}?page=${page}&per_page=${rowsPerPage}&criteria_key=username&criteria_value=${filter}`
    }

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
          title: "Cargando Jugadores del Sorteo",
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
            title: "Cargando Jugadores del Sorteo",
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
  }, [refresh, page, filter, reload]);

  const onChangePage = (pageNumber) => {
    setPage(pageNumber);
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
        return item.position_number;
      } else return false;
    }
    return false;
  };

  const handleSelect = (e, item) => {
    e.preventDefault();

    if (lotteryType === "MANUAL") {
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
    }
  };

  const setClose = () => {
    setOpen(false);
  };

  return (
    <div className="pt-3 px-4 pb-4" style={{ display: "grid" }}>
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
                  {item.profile_type}. {item.city_name + ", " + item.country}
                </small>
              </div>

              {item.position_number && item.position_number !== "" ? (
                <h6 className="d-inline">
                  <span className="badge text-bg-success">
                    {item.position_number}
                  </span>
                </h6>
              ) : (
                <h6 className={isNumberAsign(item.id) ? "d-inline" : "d-none"}>
                    <span className="badge text-bg-success">
                      <small>{getNumberAsign(item.id)}</small>
                    </span>
                </h6>
              )}
              

            </div>

            <div className="d-flex flex-row justify-content-between align-items-center px-2 py-2">
              <small>
                Club: <b>{item.club_siglas}</b>
              </small>
              <small className="comment-text fs-12">
                Nivel: <b>{item.level}</b>
              </small>
              <small className="comment-text fs-12">
                ELO: <b>{item.elo}</b>
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
            showInfo={true}
          />
        </div>
      )}

      <SetNumber
        open={open}
        setClose={setClose}
        record={record}
        selected={selected}
        setSelected={setSelected}
        number={number}
        setNumber={setNumber}
        lottery={lotteryType}
        category={id}
      />
    </div>
  );
}
