import { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../AppContext";
import { Card, Label, Input, CardBody } from "reactstrap";

export default function Tables({ tourney }) {
  const { token, lang } = useAppContext();

  const [tables, setTables] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [reload, setReload] = useState(false);
  const rowsPerPage = 8;

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": lang,
      "Authorization": `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/tables/${tourney.id}?page=${page}&per_page=${rowsPerPage}`;

    try {
      const { data } = await axios.get(url, config);
      if (data.success) {
        setTotal(data.total);
        setTotalPages(data.total_pages);
        setTables(data.data);
        setReload(false);
      }
    } catch ({ code, message, name, request }) {
      if (code === "ERR_NETWORK") {
        Swal.fire({
          title: "Obteniendo Mesas del Torneo",
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
            title: "Obteniendo Mesas del Torneo",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, [tourney.id, page, reload]);

  const onChangePage = (pageNumber) => {
    setPage(pageNumber);
    fetchData();
  };

  const saveImage = async (id, img) => {
    const body = new FormData();
    body.append("image", img);

    const url = `${process.env.NEXT_PUBLIC_API_URL}tourney/setting/configure_tables/${id}`;

    try {
      const { data } = await axios.put(url, body, {
        headers: {
          "Accept-Language": lang,
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        }
      });
      if (data.success) {
        setReload(true);
        Swal.fire({
          icon: "success",
          title: "Publicidad en Mesas",
          text: data.detail,
          showConfirmButton: true
        });
      }
    } catch (errors) {
      console.log(errors);
      Swal.fire({
        icon: "error",
        title: "Publicidad en Mesas",
        text: "Ha ocurrido un error al consultar la API....",
        showConfirmButton: true
      });
    }  
  }

  return (
    <div className="d-grid pt-3 px-4 pb-4">
      {tables.length > 0 ? (
        <div className="container-events">
          {tables.map((item, idx) => (
            <Card
              key={idx}
              className="card-info" 
              style={{cursor: "default"}}
            >
              <div className="d-flex justify-content-between py-2 px-3">
                <span><b>Mesa {item.table_number}</b></span>
                <span><b>{item.is_smart ? "Inteligente" : "Tradicional"}</b></span>
              </div>
              <Image
                  alt="Foto de Publicidad para la Mesa"
                  title="Foto de Publicidad para la Mesa"
                  src={item.photo}
                  width={350}
                  height={150}
                  quality={50}
                  priority
                  layout="intrinsic"
              />
              <CardBody>
                <div className="row pt-2">
                  <div className="col-12 justify-content-center text-center">
                    <Label
                        href="#"
                        className="btn btn-primary btn-sm"
                        title="Cambiar foto de Publicidad de la Mesa"
                        style={{ color: "white" }}
                      >
                        <i className="bi bi-upload"></i>
                        <Input
                            type="file"
                            hidden
                            onChange={(event) => {
                                if (event.target.files && event.target.files[0]) {
                                    const i = event.target.files[0];
                                    if (i.type.includes("image")) {
                                        saveImage(item.id, i);
                                    } else {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Cargando Imagen",
                                            text: "Ha ocurrido un error al cargar la imagen",
                                            showConfirmButton: true,
                                        });
                                    }
                                }
                            }}
                        />
                    </Label>
                    <Label
                        href="#"
                        className="btn btn-danger btn-sm ms-2"
                        title="Eliminar foto de Publicidad"
                        style={{ color: "white" }}
                        onClick={(e) => {
                            Swal.fire({
                                title: "¿ Desea eliminar esta foto de publicidad ?",
                                text: "! Esta opción no podrá ser revertida !",
                                icon: "question",
                                showCancelButton: true,
                                confirmButtonText: "Sí",
                                cancelButtonText: "No",
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                reverseButtons: true,
                                allowOutsideClick: false,
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    saveImage(item.id, "");
                                }
                            });
                        }}
                      >
                        <i className="bi bi-trash"/>
                    </Label>
                  </div>                
                </div>
              </CardBody>
            </Card>
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
              <path d="M2 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM0 2a2 2 0 0 1 3.937-.5h8.126A2 2 0 1 1 14.5 3.937v8.126a2 2 0 1 1-2.437 2.437H3.937A2 2 0 1 1 1.5 12.063V3.937A2 2 0 0 1 0 2zm2.5 1.937v8.126c.703.18 1.256.734 1.437 1.437h8.126a2.004 2.004 0 0 1 1.437-1.437V3.937A2.004 2.004 0 0 1 12.063 2.5H3.937A2.004 2.004 0 0 1 2.5 3.937zM14 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM2 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            </svg>
            <div className="pt-4 fs-5">
              Las Mesas del torneo aparecerán aquí.
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
            showInfo={true}
          />
        </div>
      )}
    </div>
  );
}
