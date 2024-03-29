import PlayersTable from "../../components/Players/Table";
import Layout from "../../layouts/Layout";
import Link from "next/link";
import { useAppContext } from "../../AppContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Pagination from "../../components/Pagination/Pagination";
import Search from "../../components/Search";

export default function PlayersPage() {
  const {profile, lang, token} = useAppContext();
  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchField, setSearchField] = useState("");
  const [reload, setReload] = useState(true);
  const [mode, setMode] = useState("Table");
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
    const url = `${process.env.NEXT_PUBLIC_API_URL}profile/singleplayer/${profile.id}?page=${page}&per_page=${rowsPerPage}`;

    if (searchField!=="") {
      url = url + `&search=${searchField}`;
    }

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setTotal(data.total);
        setTotalPages(data.total_pages);
        setPlayers(data.data);
        setReload(false);
      }
    } catch ({code, message, name, request}) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Jugadores",
          text: "Error en su red, consulte a su proveedor de servicio",
          icon: "error",
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      } else {
        if (code === "ERR_BAD_REQUEST") {
          console.log(message);
          const {detail} = JSON.parse(request.response)
          Swal.fire({
            title: "Jugadores",
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
    if (reload && profile.id) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchField, reload, profile.id]);

  const onChangePage = (pageNumber) => {
    setPage(pageNumber);
    setReload(true);
  };

  const delItem = async (id) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}players/${id}`;

    try {
      const { data } = await axios.delete(url, config);

      if (data.success) {
        setReload(true);
      }
    } catch ({ code, message, name, request }) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Eliminado Jugadores",
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
            title: "Eliminado Jugadores",
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

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿ Eliminar Jugador ?",
      text: "¿ Deseas eliminar éste Jugador ?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      allowOutsideClick: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Sí",
    }).then((result) => {
      if (result.isConfirmed) {
        delItem(id);
      }
    });
  };

  const handleMode = () => {
    setMode(mode==="Table" ? "Grid" : "Table");
  }

  const handleSearch = (value) => {
    setSearchField(value);
    setReload(true);
  }

  return (
    <Layout title={"Jugadores"}>
      <div
        className="card"
        style={{ border: "1px solid", borderColor: "#c7c7c7" }}
      >
        <div className="d-flex flex-row justify-content-between align-items-center py-3 px-4">
          <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#012970" }}>
            Jugadores
          </h1>

          <div className="d-flex flex-row gap-3 mx-4">
            {mode==="Table" ? (
            <a onClick={handleMode} style={{fontSize: "18px", cursor: "pointer"}}>
              <i className="bi bi-grid"></i>
            </a>) : (
            <a onClick={handleMode} style={{fontSize: "18px", cursor: "pointer"}}>
              <i className="bi bi-table"></i>
            </a>)}
          </div>

        </div>

        <div
          className="d-flex flex-row flex-wrap gap-2 justify-content-between align-center pt-3 px-4 pb-4"
        >

          <Search field={searchField} setField={handleSearch} />

          <Link href="/players/create" >
            <a className="btn btn-primary btn-sm">
              <i className="bi bi-plus-lg"></i> Crear Jugador
            </a>
          </Link>

        </div>

        <PlayersTable players={players} onDelete={handleDelete} mode={mode}/>

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
    </Layout>
  );
}
