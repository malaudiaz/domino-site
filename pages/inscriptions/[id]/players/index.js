import Layout from "../../../../layouts/Layout";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import InscriptionsTable from "../../../../components/Inscriptions/Table";
import Search from "../../../../components/Search";
import Pagination from "../../../../components/Pagination/Pagination";
import { useAppContext } from "../../../../AppContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export default function InscriptionsPlayer() {
  const router = useRouter();
  const { lang, token } = useAppContext();
  const [inscriptions, setInscriptions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [mode, setMode] = useState("Table");
  const [searchField, setSearchField] = useState("");
  const [reload, setReload] = useState(true);
  const rowsPerPage = 12;

  const id = router.query.id;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "accept-Language": lang,
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}inscriptions/${id}?page=${page}&per_page=${rowsPerPage}`;

    if (searchField !== "") {
      url = url + `&search=${searchField}`;
    }

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setTotal(data.total);
        setTotalPages(data.total_pages);
        setInscriptions(data.data);
        setReload(false);
      }
    } catch ({ code, message, name, request }) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Cargando Inscripciones",
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
            title: "Cargando Inscripciones",
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
    if (reload && id) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchField, reload, id]);

  const onChangePage = (pageNumber) => {
    setPage(pageNumber);
    setReload(true);
  };

  const handleMode = () => {
    setMode(mode === "Table" ? "Grid" : "Table");
  };

  const handleSearch = (value) => {
    setSearchField(value);
    setReload(true);
  };

  const delItem = async (id) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}inscriptions/${id}`;

    try {
      const { data } = await axios.delete(url, config);

      if (data.success) {
        setReload(true);
      }
    } catch ({ code, message, name, request }) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Eliminado Inscripción",
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
            title: "Eliminado Inscripción",
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
      title: "¿ Eliminar Inscripción ?",
      text: "¿ Deseas eliminar ésta inscripción ?",
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

  return (
    <Layout title={"Inscripciones"}>
      <div
        className="card"
        style={{ border: "1px solid", borderColor: "#c7c7c7" }}
      >
        <div className="row pt-3 px-4">
          <div className="d-flex flex-row justify-content-between align-items-center py-3 px-4">
            <Breadcrumbs
              breadcrumbs={[
                { label: "Torneos", href: "/inscriptions" },
                {
                  label: "Inscripciones",
                  href: "/inscriptions/players",
                  active: true,
                },
              ]}
            />

            <div className="d-flex flex-row gap-3 mx-4">
              {mode === "Table" ? (
                <a
                  onClick={handleMode}
                  style={{ fontSize: "18px", cursor: "pointer" }}
                >
                  <i className="bi bi-grid"></i>
                </a>
              ) : (
                <a
                  onClick={handleMode}
                  style={{ fontSize: "18px", cursor: "pointer" }}
                >
                  <i className="bi bi-table"></i>
                </a>
              )}
            </div>
          </div>

          <div className="d-flex flex-row flex-wrap gap-2 justify-content-between align-center px-4 pb-2">
            <Search field={searchField} setField={handleSearch} />

            <Link href={`/inscriptions/${id}/players/create`}>
              <a className="btn btn-primary btn-sm">
                <i className="bi bi-plus-lg"></i> Inscribir
              </a>
            </Link>
          </div>

          {inscriptions.length > 0 ? (
            <InscriptionsTable inscriptions={inscriptions} onDelete={handleDelete} mode={mode} />
          ) : (
            <div className="d-flex flex-row justify-content-center p-4 fs-5">
              <strong>No existen jugadores Inscriptos en el torneo</strong>
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
    </Layout>
  );
}
