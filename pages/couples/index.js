import CouplesTable from "../../components/Couples/Table";
import Layout from "../../layouts/Layout";
import Link from "next/link";
import { useAppContext } from "../../AppContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Pagination from "../../components/Pagination/Pagination";
import Search from "../../components/Search";

export default function CouplesPage() {
  const {profile, lang, token} = useAppContext();
  const [couples, setCouples] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchField, setSearchField] = useState("");
  const [reload, setReload] = useState(true);
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
    const url = `${process.env.NEXT_PUBLIC_API_URL}federation/${profile.id}?page=${page}&per_page=${rowsPerPage}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setTotal(data.total);
        setTotalPages(data.total_pages);
        setCouples(data.data);
        setReload(false);
      }
    } catch ({code, message, name, request}) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Cargando Parejas",
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
            title: "Cargando Parejas",
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
    if (reload) {
      fetchData();
    }
  }, [searchField, reload]);

  const onChangePage = (pageNumber) => {
    setPage(pageNumber);
    setReload(true);
  };

  const delItem = async (id) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}couples/${id}`;

    try {
      const { data } = await axios.delete(url, config);

      if (data.success) {
        setReload(true);
      }
    } catch ({ code, message, name, request }) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Eliminado Parejas",
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
            title: "Eliminado Parejas",
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
      title: "¿ Eliminar Pareja ?",
      text: "¿ Deseas eliminar ésta Pareja ?",
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
    <Layout title={"Parejas"}>
      <div
        className="card"
        style={{ border: "1px solid", borderColor: "#c7c7c7" }}
      >
        <div className="row pt-3 px-4">
          <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#012970" }}>
            Parejas
          </h1>
        </div>

        <div
          className="d-flex flex-row flex-wrap gap-2 justify-content-between align-center pt-3 px-4 pb-4"
        >

          <Search field={searchField} setField={setSearchField} />

          <Link href="/couples/create" >
            <a className="btn btn-primary btn-sm">
              <i className="bi bi-plus-lg"></i> Crear Pareja
            </a>
          </Link>

        </div>

        <CouplesTable couples={couples} onDelete={handleDelete}/>

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
